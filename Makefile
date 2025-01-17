-include .env
export

Red=\033[0;31m
Green=\033[0;32m
Yellow=\033[0;33m
Blue=\033[0;34m
Purple=\033[0;35m
Cyan=\033[0;36m
NC=\033[0m

build:
	@echo "$(Green)Building$(NC)"
	yarn clean && yarn build
	@echo "$(Green)Building done$(NC)"
.PHONY: build

publish: build publish-heml-render publish-heml-styles publish-heml-utils publish-heml-validate publish-heml-parse publish-heml-inline publish-heml-elements publish-heml
	@echo "$(Green)Publishing$(NC)"
.PHONY: publish

publish-heml-styles:
	@echo "$(Green)Publishing heml-styles$(NC)"
	cd packages/heml-styles && yarn npm publish --access=public
	@echo "$(Green)Publishing heml-styles done$(NC)"
.PHONY: publish-heml-styles

publish-heml-render:
	@echo "$(Green)Publishing heml-render$(NC)"
	cd packages/heml-render && yarn npm publish --access=public
	@echo "$(Green)Publishing heml-render done$(NC)"
.PHONY: publish-heml-render

publish-heml-utils:
	@echo "$(Green)Publishing heml-utils$(NC)"
	cd packages/heml-utils && yarn npm publish --access=public
	@echo "$(Green)Publishing heml-utils done$(NC)"
.PHONY: publish-heml-utils

publish-heml-validate:
	@echo "$(Green)Publishing heml-validate$(NC)"
	cd packages/heml-validate && yarn npm publish --access=public
	@echo "$(Green)Publishing heml-validate done$(NC)"
.PHONY: publish-heml-validate

publish-heml-parse:
	@echo "$(Green)Publishing heml-parse$(NC)"
	cd packages/heml-parse && yarn npm publish --access=public
	@echo "$(Green)Publishing heml-parse done$(NC)"
.PHONY: publish-heml-parse

publish-heml-inline:
	@echo "$(Green)Publishing heml-inline$(NC)"
	cd packages/heml-inline && yarn npm publish --access=public
	@echo "$(Green)Publishing heml-inline done$(NC)"
.PHONY: publish-heml-inline

publish-heml-elements:
	@echo "$(Green)Publishing heml-elements$(NC)"
	cd packages/heml-elements && yarn npm publish --access=public
	@echo "$(Green)Publishing heml-elements done$(NC)"
.PHONY: publish-heml-elements

publish-heml:
	@echo "$(Green)Publishing hems$(NC)"
	cd packages/heml && yarn npm publish --access=public
	@echo "$(Green)Publishing heml done$(NC)"
.PHONY: publish-heml

bump-patch:
	@find ./packages -name "package.json" -not -path "*/node_modules/*" -type f -execdir npm version patch --no-git-tag-version \;
.PHONY: bump-patch

bump-minor:
	@find ./packages -name "package.json" -not -path "*/node_modules/*" -type f -execdir npm version minor --no-git-tag-version \;
.PHONY: bump-minor

bump-major:
	@find ./packages -name "package.json" -not -path "*/node_modules/*" -type f -execdir npm version major --no-git-tag-version \;
.PHONY: bump-major

upgrade-packages:
	@find ./packages -name "package.json" -not -path "*/node_modules/*" -type f -execdir yarn upgrade-interactive \;
.PHONY: upgrade-packages

yarn-packages:
	@find ./packages -name "package.json" -not -path "*/node_modules/*" -type f -execdir yarn \;
.PHONY: yarn-packages
