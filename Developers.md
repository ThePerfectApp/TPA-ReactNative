# Structure

The TPA React Native library is set up primarily as a wrapper around the existing native libraries.
As such most of the development will likely take place in the native code and not in the javascript code.
A couple of helper scripts have been created to make developing the native code as smooth as possible.

## Setting up the dev environment

To set up the dev environment simply run the following make commands:

- `make dev.install-dependencies`
- `make dev.ios.copy-dev-headers`

Both iOS and Android code should now properly autocomplete code in Xcode and Android Studio.

