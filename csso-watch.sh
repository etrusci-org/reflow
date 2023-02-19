#!/usr/bin/env bash

input="./src/style-compiled.css"
output="./app/style.min.css"

csso \
    --watch \
    --stat \
    --comments none \
    --input-source-map none \
    --source-map none \
    --input $input \
    --output $output
