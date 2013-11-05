VERSION_NUMBER := $(shell cat VERSION)
BUNDLE_NAME='build/ai-box-browser-$(VERSION_NUMBER).js'

build:
	@echo 'Browserifing...'
	@mkdir -p build
	browserify src/index.js -s AIBox -o $(BUNDLE_NAME)
	@echo 'Done'

docs:
	@yuidoc -o docs ./src

test:
	jasmine-node spec/

autotest:
	jasmine-node spec/ --autotest --watch src/ spec/

clean:
	@echo rm -rf docs
	@echo rm -rf build

.PHONY: clean docs build
