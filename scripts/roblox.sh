#!/bin/bash

set -o pipefail
set -e

mkdir -p build/roblox
cp README.md .darklua-roblox.json wally.toml wally.lock build/roblox/
cp -r src build/roblox/
rm -rf build/roblox/src/Stories
cd build/roblox

wally install

rojo sourcemap default.project.json --output sourcemap.json
wally-package-types --sourcemap sourcemap.json Packages/
darklua process -c .darklua-roblox.json src out 

rm -rf src
mv out src

# Build model
rojo build default.project.json --output better-react-components.rbxmx
