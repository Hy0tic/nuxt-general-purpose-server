package main

import "log"

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

func useNpmOrPnpm() string {
	// GH actions runner do not have pnpm pre installed
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