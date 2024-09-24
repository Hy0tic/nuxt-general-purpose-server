<template>
    <div class="flex justify-center items-center">
        <!-- do I need action? -->
        <form 
            type="submit"
            method="post"
            action="/api/auth/validateTOTP" 
            @submit.prevent="verifyTOTP"
            class="rounded-lg w-[25rem] h-auto bg-[rgb(24,24,27)] flex flex-col justify-center items-center mt-48"
        > 
            <h1 class="my-5 mb-2 mt-5  font-bold">
                OTP Verification
            </h1>

            <p class="mt-0 text-center">
                Enter the code from Google Authenticator app
            </p>

            <InputText
                name="TOTP"
                class="m-5"
            />
            <!-- <InputOtp v-model="value" integerOnly/> -->

        </form>
    </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';

const router = useRouter();

async function verifyTOTP(e: Event) {
    const response = await $fetch("/api/auth/validateTOTP", {
      method: "POST",
      body: new FormData(e.target as HTMLFormElement)
    });


    if(response && response.statusCode === 200){
        await router.push("/");
    }
}
</script>