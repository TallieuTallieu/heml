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
	yarn build
	@echo "$(Green)Building done$(NC)"
.PHONY: build

publish: build publish-heml-render
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
