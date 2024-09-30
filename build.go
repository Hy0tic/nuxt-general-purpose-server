package main

import (
	"fmt"
	"log"
	"strings"

	"lesiw.io/cmdio"
	"lesiw.io/cmdio/sys"
)

func main() {
	rnr := sys.Runner().WithEnv(map[string]string{
		"PKGNAME": "cmdio",
	})
	
	err := rnr.Run("echo", "hello from", rnr.Env("PKGNAME"))
	if err != nil {
		log.Fatal(err)
	}

	if _, err := rnr.Get("true"); err == nil {
		fmt.Println("true always succeeds")
	}

	if _, err := rnr.Get("false"); err != nil {
		fmt.Println("false always fails")
	}
	
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
}