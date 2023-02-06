#!/usr/bin/env bash

input="./src/style.scss"
output="./app/style.css"

sass \
    --watch \
    --update \
    --style expanded \
    --charset \
    --no-source-map \
    $input:$output
