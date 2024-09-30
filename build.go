package main

import (
	"log"
	"strings"

	"lesiw.io/cmdio"
	"lesiw.io/cmdio/sys"
)

func main() {
	rnr := sys.Runner().WithEnv(map[string]string{
		"PKGNAME": "cmdio",
	})
	defer rnr.Close();
	
	err := rnr.Run("echo", "hello from", rnr.Env("PKGNAME"))
	if err != nil {
		log.Fatal(err)
	}
    
	err = rnr.Run("npm", "install")
	if err != nil {
		log.Fatal(err)
	}

    err = rnr.Run("npx", "prisma", "generate")
    if err != nil {
		log.Fatal(err)
	}

    err = rnr.Run("npm", "run", "build")
	if err != nil {
		log.Fatal(err)
	}

    // pipe example
    err = cmdio.Pipe(
		rnr.Command("echo", "pIpEs wOrK tOo"),
		rnr.Command("tr", "A-Z", "a-z"),
	)
	if err != nil {
		log.Fatal(err)
	}

	err = cmdio.Pipe(
		strings.NewReader("Even When Mixed With Other IO"),
		rnr.Command("tr", "A-Z", "a-z"),
	)
	if err != nil {
		log.Fatal(err)
	}

	err = rnr.Run("echo", "goodbye from", rnr.Env("PKGNAME"))
	if err != nil {
		log.Fatal(err)
	}


}
