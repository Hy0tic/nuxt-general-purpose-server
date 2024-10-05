package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	"lesiw.io/cmdio"
)

// BuildInfo represents the build information structure
type BuildInfo struct {
    BuildName string `json:"buildName"`
    Hash      string `json:"hash"`
    Branch    string `json:"branch"`
    BuildDate string `json:"buildDate"`
}


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

// WriteBuildInfo writes build information to a JSON file
func WriteBuildInfo(outputPath string) error {
    // Get the current branch
    currentBranch, err := getCurrentBranch()
    if err != nil {
        return err
    }

    // Get the last commit SHA
    gitHash, err := getLastCommitSHA()
    if err != nil {
        return err
    }

    // Get the current time in local timezone
    buildDate := time.Now().Format("2006-01-02 15:04") + " " + time.Local.String()

    // Prepare the build info
    buildInfo := BuildInfo{
        BuildName: fmt.Sprintf("%s:%s", currentBranch, gitHash),
        Hash:      gitHash,
        Branch:    currentBranch,
        BuildDate: buildDate,
    }

    // Create output directory if it doesn't exist
    if err := os.MkdirAll(outputPath, os.ModePerm); err != nil {
        return err
    }

    // Serialize to JSON
    jsonData, err := json.MarshalIndent(buildInfo, "", "  ")
    if err != nil {
        return err
    }

    // Write to file
    filePath := outputPath + "/buildinfo.json"
    return os.WriteFile(filePath, jsonData, 0644)
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
