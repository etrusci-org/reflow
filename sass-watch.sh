#!/usr/bin/env bash

input="./src/style.scss"
output="./src/style-compiled.css"

sass \
    --watch \
    --update \
    --style expanded \
    --charset \
    --no-source-map \
    $input:$output
