.PHONY: install cleanup install-toolchain cleanup-build serve watch build/*

install:
	aftman install

cleanup:
	git clean -Xf build # remove ignored files in build/

serve:
	rojo serve out.project.json

watch: Packages/ DevPackages/ sourcemap.json .darklua-dev.json
	darklua process -w -c .darklua-dev.json src out 

# files/folders

build/roblox:
	./scripts/roblox.sh

build/wally:
	./scripts/wally.sh

Packages DevPackages: wally.toml wally.lock
	wally install
	wally-package-types --sourcemap sourcemap.json Packages/
	wally-package-types --sourcemap sourcemap.json DevPackages/

sourcemap.json: src/* default.project.json
	rojo sourcemap default.project.json --output sourcemap.json
