install: install-dependencies patch-sourcemap
serve:
	rojo serve story.project.json

#build: install-dependencies
#	rojo build

# intermediate scripts

install-dependencies: aftman.toml wally.toml wally.lock
	aftman install
	wally install

patch-sourcemap: sourcemap.json Packages/* DevPackages/
	wally-package-types --sourcemap dev-sourcemap.json Packages/
	wally-package-types --sourcemap dev-sourcemap.json DevPackages/

# target files/dirs:

Packages: install-dependencies

sourcemap.json: src/* story.project.json
	rojo sourcemap story.project.json --output sourcemap.json

