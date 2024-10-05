package main

import (
	"log"
	// "lesiw.io/cmdio"
	"lesiw.io/cmdio/sys"
)

var rnr = sys.Runner().WithEnv(map[string]string{
	"PKGNAME": "cmdio",
})

func main() {
	defer rnr.Close()

	err := rnr.Run("echo", "hello from", rnr.Env("PKGNAME"))
	if err != nil {
		log.Fatal(err)
	}

	err = rnr.Run("which", "aws")
	if err != nil {
		installAwsCli(rnr)
	}

	// TODO: download node_module cache from S3 bucket

	err = rnr.Run(useNpmOrPnpm(rnr), "install")
	if err != nil {
		log.Fatal(err)
	}

	err = rnr.Run("npx", "prisma", "generate")
	if err != nil {
		log.Fatal(err)
	}

	err = rnr.Run(useNpmOrPnpm(rnr), "run", "build")
	if err != nil {
		log.Fatal(err)
	}

	err = WriteBuildInfo("./.output")
	if err != nil {
		log.Fatal(err)
	}

	// print output folder size
	err = rnr.Run("du", "-sh", "./.output")
	if err != nil {
		log.Fatal(err)
	}

	// TODO: update node_module cache in S3 bucket

	err = rnr.Run("echo", "goodbye from", rnr.Env("PKGNAME"))
	if err != nil {
		log.Fatal(err)
	}

}
