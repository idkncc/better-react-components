#!/bin/bash

set -o pipefail
set -e

git clean -Xf build/roblox
mkdir -p build/wally

cp README.md .darklua-wally.json wally.toml wally.lock build/wally/
cp -r src build/wally/
rm -r build/wally/src/Stories

cd build/wally

wally install
rojo sourcemap sourcemap.project.json --output sourcemap.json
darklua process -c .darklua-wally.json src out 

rm -rf src
mv out src
