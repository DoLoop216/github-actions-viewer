#!/bin/bash

# Go to extension folder
cd src/code/github-workflows-explorer || exit

# Package with vsce
vsce package

# Return to root
cd -
