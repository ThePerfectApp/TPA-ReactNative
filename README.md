
# @the-perfect-app/react-native-the-perfect-app

## Getting started

Install the component using `npm`:

`$ npm install @the-perfect-app/react-native-the-perfect-app --save`

Configure the iOS and Android projects using the `link` command:

`$ react-native link @the-perfect-app/react-native-the-perfect-app`

### iOS

1. Open the Xcode project and add `ThePerfectApp.Framework` to "Link Binary With Libraries" build phase. Tap `+` then `Add other...` and locate the framework in `../node_modules/@the-perfect-app/react-native-the-perfect-app/ios/Frameworks`
2. add the following path to `Framework Search Path` for your build target: `$(SRCROOT)/../node_modules/@the-perfect-app/react-native-the-perfect-app/ios/Frameworks`

Configure TPA with Project UUID and upload URL in the native AppDelegate and enable/disable features as needed. Refer to the documentation on your tpa.io domain for more information about configuring TPA.

### Android

1. Add the following line to `android/build.gradle` under `repositories`, which is under `allprojects`:
    `maven { url "http://nexus.trifork.com/content/repositories/releases" }`

2. Change the following lines in `android/settings.gradle`:
  	Before:
  	`include ':@the-perfect-app/react-native-the-perfect-app'`
  	`project(':@the-perfect-app/react-native-the-perfect-app').projectDir = new File(rootProject.projectDir, '../node_modules/@the-perfect-app/react-native-the-perfect-app/android')`

    After:
    `include ':react-native-the-perfect-app'`
  	`project(':react-native-the-perfect-app').projectDir = new File(rootProject.projectDir, '../node_modules/@the-perfect-app/react-native-the-perfect-app/android')`

3. Change the following line inside the dependencies block in `android/app/build.gradle`:
    Before:
  	`compile project(':@the-perfect-app/react-native-the-perfect-app')`

    After:
    `compile project(':react-native-the-perfect-app')`

Configure TPA with Project UUID and upload URL in the native MainApplication class and enable/disable features as needed. Refer to the documentation on your tpa.io domain for more information about configuring TPA.

## Usage

Refer to the documentation on your tpa.io domain for more information. When tracking an event, you shall provide a category and a name. All tracking methods can be called with tags, that can be used for segmentation on your perfect dashboards.

```javascript
import { TPA } from '@the-perfect-app/react-native-the-perfect-app';

// Track events
TPA.trackEvent('Action', 'ShowProfile')
TPA.trackEventWithTags('Action', 'ShowProfile', { 'Gender':'F'}')

// Track screens
TPA.trackScreenAppearing('Screen Title')
TPA.trackScreenDisappearing('Screen Title')

// Track timing
timing = TPA.startTimingEvent('Timing', 'Level 1')
...
TPA.trackTimingEvent(timing)


// Debug logs
TPA.logDebug('Error during activation')

```
