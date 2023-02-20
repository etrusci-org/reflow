#!/usr/bin/env bash

if [ $# -ne 2 ]; then
    echo "Usage: audio-to-bin.sh <INPUT_FILE> <OUTPUT_FILE>"
    echo "Example: audio-to-bin.sh src/audio/alert.mp3 src/audio/alert.bin"
    exit 1
fi

if [ ! -f $1 ]; then
    echo "Input file does not exist: $1"
    exit 2
fi

echo -n "Converting $1 to $2 ... "
cat $1 | base64 -w 0 > $2

if [ $? -eq 0 ]; then
    echo "OK"
else
    echo "BOO"
fi
