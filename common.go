package main

import (
	"log"

	"lesiw.io/cmdio"
)

func installAwsCli(rnr *cmdio.Runner) error {
	err := rnr.Run("uname", "-m")
	if err != nil {
		log.Fatal(err)
	}

	// TODO: check CPU architecture

	err = rnr.Run("curl", "\"https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip\"", "-o", "\"awscliv2.zip\"")
	if err != nil {
		log.Fatal(err)
	}

	err = rnr.Run("unzip", "awscliv2.zip")
	if err != nil {
		log.Fatal(err)
	}

	err = rnr.Run("sudo", "./aws/install")
	if err != nil {
		log.Fatal(err)
	}

	return nil
}

func useNpmOrPnpm(rnr *cmdio.Runner) string {
	// GH actions runner come with npm pre installed, but pnpm is used for local development
	if err := rnr.Run("which", "pnpm"); err == nil {
		return "pnpm"
	} else {
		return "npm"
	}
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
