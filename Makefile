install: install-toolchain
cleanup: cleanup-build

roblox-package: cleanup-build
	./scripts/roblox.sh

wally-package: cleanup-build
	./scripts/wally.sh

# development
serve:
	rojo serve out.project.json

watch: Packages/ DevPackages/ sourcemap.json .darklua-dev.json
	darklua process -w -c .darklua-dev.json src out 

Packages DevPackages: wally.toml wally.lock
	wally install
	wally-package-types --sourcemap sourcemap.json Packages/
	wally-package-types --sourcemap sourcemap.json DevPackages/

sourcemap.json: src/* default.project.json
	rojo sourcemap default.project.json --output sourcemap.json

# intermediate steps

install-toolchain:
	aftman install

cleanup-build:
	git clean -Xf build # remove ignored files in build/
