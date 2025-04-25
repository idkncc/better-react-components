#!/bin/bash

set -o pipefail
set -e

mkdir -p build/wally
cp README.md default.project.json .darklua-wally.json wally.toml wally.lock build/wally/
cp -r src build/wally/
rm -rf build/wally/src/Stories
cd build/wally

wally install

rojo sourcemap wally.project.json --output sourcemap.json
darklua process -c .darklua-wally.json src out 

rm -rf src
mv out src

