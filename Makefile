.PHONY: check format-check typecheck lint test build

# The build takes the content published in the CMS, so it needs the CMS to answer.
check: format-check typecheck lint test build

format-check:
	npm run --silent format:check

typecheck:
	npm run --silent typecheck

lint:
	npm run --silent lint

test:
	npm run --silent test

build:
	npm run --silent build
