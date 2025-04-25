install: install-toolchain
cleanup: cleanup-build

wally-package: cleanup-build
	./scripts/wally.sh

# development
serve:
	rojo serve dev.project.json

watch: Packages/ DevPackages/ sourcemap.json .darklua-dev.json
	darklua process -w -c .darklua-dev.json src out 

Packages DevPackages: wally.toml wally.lock
	wally install
	wally-package-types --sourcemap sourcemap.json Packages/
	wally-package-types --sourcemap sourcemap.json DevPackages/

sourcemap.json: src/* dev.project.json
	rojo sourcemap dev-sourcemap.project.json --output sourcemap.json

# intermediate steps

install-toolchain:
	aftman install

cleanup-build:
	git clean -Xf build # remove ignored files in build/
