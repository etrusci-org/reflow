#!/usr/bin/env bash

# --- SASS ---

# light
input="./src/color-light.scss"
output="./src/color-light-compiled.css"

sass \
    --style expanded \
    --charset \
    --no-source-map \
    $input:$output


# dark
input="./src/color-dark.scss"
output="./src/color-dark-compiled.css"

sass \
    --style expanded \
    --charset \
    --no-source-map \
    $input:$output




# --- CSSO ---

# light
input="./src/color-light-compiled.css"
output="./app/color-light.min.css"

csso \
    --stat \
    --comments none \
    --input-source-map none \
    --source-map none \
    --input $input \
    --output $output


# dark
input="./src/color-dark-compiled.css"
output="./app/color-dark.min.css"

csso \
    --stat \
    --comments none \
    --input-source-map none \
    --source-map none \
    --input $input \
    --output $output
