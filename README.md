
# react-native-the-perfect-app

## Getting started

`$ npm install react-native-the-perfect-app --save`

### Mostly automatic installation

`$ react-native link react-native-the-perfect-app`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-the-perfect-app` and add `TPAThePerfectApp.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libTPAThePerfectApp.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.TPAThePerfectAppPackage;` to the imports at the top of the file
  - Add `new TPAThePerfectAppPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-the-perfect-app'
  	project(':react-native-the-perfect-app').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-the-perfect-app/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-the-perfect-app')
  	```

## Usage
```javascript
import TPAThePerfectApp from 'react-native-the-perfect-app';

// TODO: What to do with the module?
TPAThePerfectApp;
```
  