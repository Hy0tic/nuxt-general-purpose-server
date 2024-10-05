package main

import (
    "os/exec"
)


// Function to get the current branch name
func getCurrentBranch() (string, error) {
    out, err := exec.Command("git", "rev-parse", "--abbrev-ref", "HEAD").Output()
    if err != nil {
        return "", err
    }
    return string(out), nil
}

// Function to get the last commit SHA
func getLastCommitSHA() (string, error) {
    out, err := exec.Command("git", "rev-parse", "--short=7", "HEAD").Output()
    if err != nil {
        return "", err
    }
    return string(out), nil
}

