#!/usr/bin/env bash

cat "./src/alert.mp3" | base64 -w 0 > "./src/alert.bin"
