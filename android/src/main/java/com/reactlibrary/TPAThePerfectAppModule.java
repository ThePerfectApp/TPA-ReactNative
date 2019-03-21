
package com.reactlibrary;


import android.app.Activity;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.reactlibrary.configuration.TPAReactNativeConfiguration;
import com.reactlibrary.timingevents.ReactNativeTimingEvents;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import io.tpa.tpalib.TPA;
import io.tpa.tpalib.TPACrossPlatformIssueReporting;
import io.tpa.tpalib.TPACrossPlatformLifeCycle;
import io.tpa.tpalib.TPASupportedPlatforms;

@SuppressWarnings({"FieldCanBeLocal", "unused"})
public class TPAThePerfectAppModule extends ReactContextBaseJavaModule {

    private static final String TAG = "TPA";

    private static final String REACT_NATIVE_KIND = "ReactNative";

    private final ReactApplicationContext reactContext;

    private ReactNativeTimingEvents reactNativeTimingEvents;

    public TPAThePerfectAppModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "TPAThePerfectApp";
    }

    //region Configuration
    @ReactMethod
    public void initialize(String url, String projectUuid, ReadableMap configuration) {
        TPA.initialize(getReactApplicationContext(), new TPAReactNativeConfiguration(url, projectUuid).parseConfiguration(configuration));
        reactNativeTimingEvents = new ReactNativeTimingEvents();
        // The timing of TPA initialization can cause the AppLifeCycle to miss the initial onResume
        // In these cases getCurrentActivity of AppLifeCycle will be null, thus we can detect it and manually call onResume
        if (getCurrentActivity() != null) {
            TPACrossPlatformLifeCycle.initLifecycle(getCurrentActivity());
        }
    }
    //endregion

    //region Tracking
    private interface TrackingAction {
        void track();
    }

    //region Appearing
    @ReactMethod
    public void trackScreenAppearing(final String title) {
        TPA.trackScreenAppearing(title);
    }

    @ReactMethod
    public void trackScreenAppearingWithTags(final String title, final ReadableMap tags) {
        TPA.trackScreenAppearing(title, recursivelyDeconstructReadableMapString(tags));
    }
    //endregion

    //region Disappearing
    @ReactMethod
    public void trackScreenDisappearing(final String title) {
        TPA.trackScreenDisappearing(title);
    }

    @ReactMethod
    public void trackScreenDisappearingWithTags(final String title, final ReadableMap tags) {
        TPA.trackScreenDisappearing(title, recursivelyDeconstructReadableMapString(tags));
    }
    //endregion

    //region Event
    @ReactMethod
    public void trackEvent(final String category, final String name) {
        TPA.trackEvent(category, name);
    }

    @ReactMethod
    public void trackEventWithTags(final String category, final String name, final ReadableMap tags) {
        TPA.trackEvent(category, name, recursivelyDeconstructReadableMapString(tags));
    }
    //endregion

    //region Timing Event
    @ReactMethod(isBlockingSynchronousMethod=true)
    public String getNewTimingEventIdentifier() {
        return UUID.randomUUID().toString();
    }

    @ReactMethod
    public void startTimingEvent(final String identifier, final Double startTimestamp, final String category, final String name) {
        reactNativeTimingEvents.startTimingEvent(identifier, startTimestamp.longValue(), category, name);
    }

    @ReactMethod
    public void trackTimingEvent(final String identifier, final Double endTimestamp) {
        reactNativeTimingEvents.trackTimingEvent(identifier, endTimestamp.longValue(), null);
    }

    @ReactMethod
    public void trackTimingEventWithTags(final String identifier, final Double endTimestamp, final ReadableMap tags) {
        reactNativeTimingEvents.trackTimingEvent(identifier, endTimestamp.longValue(), recursivelyDeconstructReadableMapString(tags));
    }
    //endregion
    //endregion

    //region NonFatalIssue
    @ReactMethod
    public void reportNonFatalIssue(String stackTrace, String reason, ReadableMap userInfo) {
        TPACrossPlatformIssueReporting.reportNonFatalIssue(stackTrace, reason, recursivelyDeconstructReadableMap(userInfo), TPASupportedPlatforms.ReactNative);
    }
    //endregion

    //region Feedback
    @ReactMethod
    public void startFeedback() {
        TPA.startFeedback();
    }
    //endregion

    //region Log
    @ReactMethod
    public void log(String logLevel, String message) {
        if (logLevel == null) {
            return;
        }

        switch (logLevel) {
            case "debug":
                TPA.log.d("", message);
                break;
            case "info":
                TPA.log.i("", message);
                break;
            case "warning":
                TPA.log.w("", message);
                break;
            case "error":
                TPA.log.e("", message);
                break;
        }
    }
    //endregion

    //region Updates
    @ReactMethod
    public void checkForUpdate() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null) {
            TPA.checkForUpdates(currentActivity);
        }
    }
    //endregion

    //region Utils
    //https://github.com/facebook/react-native/issues/4655
    private Map<String, Object> recursivelyDeconstructReadableMap(ReadableMap readableMap) {
        Map<String, Object> deconstructedMap = new HashMap<>();
        if (readableMap == null) {
            return deconstructedMap;
        }

        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = readableMap.getType(key);
            switch (type) {
                case Null:
                    deconstructedMap.put(key, null);
                    break;
                case Boolean:
                    deconstructedMap.put(key, readableMap.getBoolean(key));
                    break;
                case Number:
                    deconstructedMap.put(key, readableMap.getDouble(key));
                    break;
                case String:
                    deconstructedMap.put(key, readableMap.getString(key));
                    break;
                case Map:
                    deconstructedMap.put(key, recursivelyDeconstructReadableMap(readableMap.getMap(key)));
                    break;
                case Array:
                    deconstructedMap.put(key, recursivelyDeconstructReadableArray(readableMap.getArray(key)));
                    break;
                default:
                    //throw new IllegalArgumentException("Could not convert object with key: " + key + ".");
                    //Do nothing
            }
        }

        return deconstructedMap;
    }

    private List<Object> recursivelyDeconstructReadableArray(ReadableArray readableArray) {
        List<Object> deconstructedList = new ArrayList<>(readableArray.size());
        for (int i = 0; i < readableArray.size(); i++) {
            ReadableType indexType = readableArray.getType(i);
            switch (indexType) {
                case Null:
                    deconstructedList.add(i, null);
                    break;
                case Boolean:
                    deconstructedList.add(i, readableArray.getBoolean(i));
                    break;
                case Number:
                    deconstructedList.add(i, readableArray.getDouble(i));
                    break;
                case String:
                    deconstructedList.add(i, readableArray.getString(i));
                    break;
                case Map:
                    deconstructedList.add(i, recursivelyDeconstructReadableMap(readableArray.getMap(i)));
                    break;
                case Array:
                    deconstructedList.add(i, recursivelyDeconstructReadableArray(readableArray.getArray(i)));
                    break;
                default:
                    //throw new IllegalArgumentException("Could not convert object at index " + i + ".");
                    //Do nothing
            }
        }
        return deconstructedList;
    }

    private Map<String, String> recursivelyDeconstructReadableMapString(ReadableMap readableMap) {
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        Map<String, String> deconstructedMap = new HashMap<>();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = readableMap.getType(key);
            switch (type) {
                case Null:
                    deconstructedMap.put(key, null);
                    break;
                case Boolean:
                    deconstructedMap.put(key, String.valueOf(readableMap.getBoolean(key)));
                    break;
                case Number:
                    deconstructedMap.put(key, String.valueOf(readableMap.getDouble(key)));
                    break;
                case String:
                    deconstructedMap.put(key, readableMap.getString(key));
                    break;
                /*case Map:
                    deconstructedMap.put(key, recursivelyDeconstructReadableMap(readableMap.getMap(key)));
                    break;
                case Array:
                    deconstructedMap.put(key, recursivelyDeconstructReadableArray(readableMap.getArray(key)));
                    break;*/
                default:
                    //throw new IllegalArgumentException("Could not convert object with key: " + key + ".");
                    //Do nothing
            }
        }

        return deconstructedMap;
    }
    //endregion
}
