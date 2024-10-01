package main

import (
	"log"
	// "lesiw.io/cmdio"
	"lesiw.io/cmdio/sys"
)

var rnr = sys.Runner().WithEnv(map[string]string{
	"PKGNAME": "cmdio",
})

// const cacheBucket = "awkspace-cmdio-cache-test"

func main() {
	defer rnr.Close();
	
	err := rnr.Run("echo", "hello from", rnr.Env("PKGNAME"))
	if err != nil { log.Fatal(err) }

	err = rnr.Run("which", "aws")
	if err != nil { 
		installAws()
	}

	// TODO: download node_module cache from S3 bucket

	err = rnr.Run(useNpmOrPnpm(), "install")
	if err != nil { log.Fatal(err) }

    err = rnr.Run("npx", "prisma", "generate")
    if err != nil { log.Fatal(err) }

    err = rnr.Run(useNpmOrPnpm(), "run", "build")
	if err != nil { log.Fatal(err) }

	// TODO: update node_module cache in S3 bucket

	err = rnr.Run("echo", "goodbye from", rnr.Env("PKGNAME"))
	if err != nil { log.Fatal(err) }

}


func useNpmOrPnpm() string {
	// GH actions runner do not have pnpm pre installed
    if err := rnr.Run("which", "pnpm"); err == nil {
        return "pnpm"
    } else {
		return "npm"
	}
}

func installAws() error {
	err := rnr.Run("curl", "\"https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip\"", "-o", "\"awscliv2.zip\"")
	if err != nil {
		log.Fatal(err)
	}

	err = rnr.Run("unzip", "awscliv2.zip")
	if err != nil {
		log.Fatal(err)
	}

	err = rnr.Run("sudo","./aws/install")
	if err != nil {
		log.Fatal(err)
	}

	return nil;
}

// func writeCache(dst, src string) {
//     cmdio.MustPipe(
//         rnr.Command("tar", "-czf", "-", src+"/"),
//         rnr.Command(aws(), "s3", "cp", "-",
//             "s3://"+cacheBucket+"/"+dst+".tar.gz"),
//     )
// }

// func readCache(key string) {
//     cmdio.MustPipe(
//         rnr.Command(aws(), "s3", "cp",
//             "s3://"+cacheBucket+"/"+key+".tar.gz", "-"),
//         rnr.Command("tar", "-xzf", "-"),
//     )
// }

// func aws() string {
//     // TODO: wrap all this in sync.OnceValue
//     if r, err := rnr.Get("which", "aws"); err == nil {
//         return r.Out
//     }
//     // TODO: install AWS cli
//     return "/usr/local/bin/aws"
// }


