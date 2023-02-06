#!/usr/bin/env bash

input="./app/style.css"
output="./app/style.min.css"

csso \
    --watch \
    --stat \
    --comments none \
    --input-source-map none \
    --source-map none \
    --input $input \
    --output $output
