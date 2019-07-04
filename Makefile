dev.install-dependencies:
	npm install react-native --no-save

dev.ios.copy-dev-headers:
	rm -fr ios/DevHeaders
	mkdir ios/DevHeaders
	find node_modules/react-native/ReactCommon/* -type d -maxdepth 0 -print | xargs basename | xargs -I DIR mkdir ios/DevHeaders/DIR
	find ios/DevHeaders/* -type d -maxdepth 0 -print | xargs basename | xargs -I DIR find 'node_modules/react-native/ReactCommon/DIR' -regex '.*\.h' -exec cp '{}' ios/DevHeaders/DIR/. ';'
	mkdir -p ios/DevHeaders/React
	find node_modules/react-native/React/**/*.h -exec cp '{}' ios/DevHeaders/React/. ';'

lib.release:
	mkdir -p Release
	npm pack
	mv react-native-the-perfect-app-*.tgz Release/
