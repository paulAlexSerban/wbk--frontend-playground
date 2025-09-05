#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

function package() {
    ## for each library inside ./libraries run inside it yarn build:prod && yarn package
    local start_dir
    start_dir="$(pwd)"
    for dir in ./libraries/*/; do
        if [ -d "$dir" ]; then
            echo "📦  Packaging $(basename "$dir")"
            cd "$dir" || exit
            yarn package
            cd "$start_dir" || exit
        fi
    done
}

function install() {
    ## for each library inside ./libraries run inside it yarn install
    for dir in ./libraries/*/; do
        if [ -d "$dir" ]; then
            echo "📦  Installing $(basename "$dir")"
            cd "$dir" || exit
            yarn install
            cd - || exit
        fi
    done
}

function build() {
    ## for each library inside ./libraries run inside it yarn build
    for dir in ./libraries/*/; do
        if [ -d "$dir" ]; then
            echo "📦  Building $(basename "$dir")"
            cd "$dir" || exit
            yarn build:prod
            cd - || exit
        fi
    done
}

$1 && echo "[ ✅ ] --- done" || echo "[ 🚫 ]Failed"