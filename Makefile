dev.install-dependencies:
	npm install react-native --no-save

lib.release:
	mkdir -p Release
	npm pack
	mv react-native-the-perfect-app-*.tgz Release/