PATH := $(PATH):$(HOME)/.local/bin:$(HOME)/bin:/bin:/usr/local/bin
SHELL := /usr/bin/env bash

.DEFAULT_GOAL := help

help: ## Display this help
	@grep -E '^[a-zA-Z1-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN { FS = ":.*?## " }; { printf "\033[36m%-30s\033[0m %s\n", $$1, $$2 }'

install: ## Install project dependencies
	make install-dependencies
	@echo --------------------------------------------------------------------------------
	@echo Service running at: http://my-node-project.local

install-dependencies: ## Install project dependencies
	make install-npm
install-npm: ## Install javascript dependencies
	npm install
install-yarn: ## Install javascript dependencies
	yarn install
update-outdated-npm:
	npm run updtr

lint: ## Lint src files
	make lint-js
lint-js: ## Lint JavaScript files
	npm run lint

start: ## Start app server **(Node project only)**
	node server/index.js

release: ## do a release make release version=x.x.x|major|minor|patch
	npm run release -- -V -i $(version)

test: ## Run complete test suite
	make lint
	make test-js
test-js: ## RunJavaScript tests
	npm run test

uninstall: ## Uninstall project
	make uninstall-dependencies
uninstall-dependencies: ## Uninstall project dependency files
	rm -rf node_modules
