import { TimeSpan } from "oslo";
import { decodeHex } from "oslo/encoding";
import { TOTPController } from "oslo/otp";


export default eventHandler(async (event) => { 
    // const user = event.context.user;
    // if (!user) {
    //     return new Response(null, {
    //         status: 401
    //     });
    // }
	const formData = await readFormData(event);
    const otp = formData.get("TOTP")?.toString().replace(/\s+/g, '') ?? "";

    console.log(otp)

    const temptToken = getCookie(event, "tempToken");

    if(!temptToken){
        return {
            statusCode: 400
        }
    }

    const tempToken = await prisma.tempToken.findFirst({
        where: {
            token: temptToken
        }
    });

    // todo: check if temp token expires
    
    const userRecord = await prisma.user.findUnique({
        where: {
            id: tempToken?.userId,
        },
        select: {
            two_factor_secret: true,
        },
    });


    
    const twoFactorSecret = decodeHex(userRecord?.two_factor_secret ?? ""); 
    console.log(twoFactorSecret ?? "")

    if(twoFactorSecret)
    {
        const oneHour = new TimeSpan(30, "s");
        const validOTP = await new TOTPController({
            digits: 6,
            period: oneHour
        }).verify(otp, twoFactorSecret);

        console.log("valid OTP: ", validOTP);
        if(validOTP && tempToken?.userId)
        {
            // create session 
            const session = await lucia.createSession(tempToken?.userId, {});
            appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());

            // remove token from table
            await prisma.tempToken.delete({
                where: {
                    token: tempToken.token
                }
            })

            // TODO: remove temp token from cookie

            return {
                statusCode: 200,
                message: "TOTP verified"
            }
        }

        return {
            statusCode: 400,
            message: "invalid"
        }
    }
    else {
        return {
            statusCode: 400
        }
    }

})