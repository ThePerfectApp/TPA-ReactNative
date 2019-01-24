
package com.reactlibrary;


import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import io.tpa.tpalib.TPA;
import io.tpa.tpalib.TpaConfiguration;
import io.tpa.tpalib.analytics.TpaTimingEvent;
import io.tpa.tpalib.analytics.TpaTracker;
import io.tpa.tpalib.ext.CrashHandling;
import io.tpa.tpalib.ext.TpaLog;
import io.tpa.tpalib.TPACrossPlatformIssueReporting;
import io.tpa.tpalib.TPASupportedPlatforms;
import io.tpa.tpalib.lifecycle.AppLifeCycle;

@SuppressWarnings({"FieldCanBeLocal", "unused"})
public class TPAThePerfectAppModule extends ReactContextBaseJavaModule {

    private static final String TAG = "TPA";

    private static final String REACT_NATIVE_KIND = "ReactNative";

    private final ReactApplicationContext reactContext;

    public TPAThePerfectAppModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "TPAThePerfectApp";
    }

    // Configuration
    @ReactMethod
    public void initialize(String url, String projectUuid, ReadableMap configuration) {
        TpaConfiguration tpaConfiguration = parseConfiguration(new TpaConfiguration.Builder(projectUuid, url), configuration);
        TPA.initialize(getReactApplicationContext(), tpaConfiguration);
        // The timing of TPA initialization can cause the AppLifeCycle to miss the initial onResume
        // In these cases getCurrentActivity of AppLifeCycle will be null, thus we can detect it and manually call onResume
        if (AppLifeCycle.getInstance().getCurrentActivity() == null && getCurrentActivity() != null) {
            AppLifeCycle.getInstance().resumed(getCurrentActivity());
        }
    }

    private enum ConfigurationKeys {
        CrashHandling("crashHandling"),
        LogType("logType"),
        FeedbackInvocation("feedbackInvocation"),
        EnableAutoTrackScreen("enableAutoTrackScreen"),
        TpaDebugLog("tpaDebugLog");

        private final String jsKey;

        ConfigurationKeys(final String jsKey) {
            this.jsKey = jsKey;
        }
    }

    private TpaConfiguration parseConfiguration(TpaConfiguration.Builder builder, ReadableMap configuration) {
        if (configuration == null) {
            return builder.build();
        }

        if (configuration.hasKey(ConfigurationKeys.CrashHandling.jsKey)) {
            builder.setCrashHandling(getCrashHandling(configuration.getString(ConfigurationKeys.CrashHandling.jsKey)));
        }

        if (configuration.hasKey(ConfigurationKeys.LogType.jsKey)) {
            builder.setLogType(getLogType(configuration.getString(ConfigurationKeys.LogType.jsKey)));
        }

        if (configuration.hasKey(ConfigurationKeys.FeedbackInvocation.jsKey)) {
            String jsFeedbackInvocation = configuration.getString(ConfigurationKeys.FeedbackInvocation.jsKey);
            builder.useShakeFeedback(jsFeedbackInvocation != null && jsFeedbackInvocation.equals("shake"));
        }

        if (configuration.hasKey(ConfigurationKeys.EnableAutoTrackScreen.jsKey)) {
            builder.enableAutoTrackScreen(configuration.getBoolean(ConfigurationKeys.EnableAutoTrackScreen.jsKey));
        }

        if (configuration.hasKey(ConfigurationKeys.TpaDebugLog.jsKey)) {
            builder.enableDebug(configuration.getBoolean(ConfigurationKeys.TpaDebugLog.jsKey));
        }

        return builder.build();
    }

    private CrashHandling getCrashHandling(String jsCrashHandling) {
        if (jsCrashHandling == null) {
            return null;
        }

        switch (jsCrashHandling) {
            case "disabled":
                return CrashHandling.DISABLED;
            case "alwaysAsk":
                return CrashHandling.ALWAYS_ASK;
            case "alwaysSend":
                return CrashHandling.SILENT;
            default:
                return null;
        }
    }

    private TpaLog.Type getLogType(String jsLogType) {
        if (jsLogType == null) {
            return null;
        }

        switch (jsLogType) {
            case "none":
                return TpaLog.Type.NONE;
            case "console":
                return TpaLog.Type.LOGCAT;
            case "remote":
                return TpaLog.Type.REMOTE;
            case "both":
                return TpaLog.Type.BOTH;
            default:
                return null;
        }
    }

    //Appearing
    @ReactMethod
    public void trackScreenAppearing(String title) {
        TpaTracker.trackScreenAppearing(title);
    }

    @ReactMethod
    public void trackScreenAppearingWithTags(String title, ReadableMap tags) {
        TpaTracker.trackScreenAppearing(title, recursivelyDeconstructReadableMapString(tags));
    }

    //Disappearing
    @ReactMethod
    public void trackScreenDisappearing(String title) {
        TpaTracker.trackScreenDisappearing(title);
    }

    @ReactMethod
    public void trackScreenDisappearingWithTags(String title, ReadableMap tags) {
        TpaTracker.trackScreenDisappearing(title, recursivelyDeconstructReadableMapString(tags));
    }

    //Event
    @ReactMethod
    public void trackEvent(String category, String name) {
        TpaTracker.trackEvent(category, name);
    }

    @ReactMethod
    public void trackEventWithTags(String category, String name, ReadableMap tags) {
        TpaTracker.trackEvent(category, name, recursivelyDeconstructReadableMapString(tags));
    }

    //Timing Event
    @ReactMethod
    public void trackTimingEvent(String category, String name, Integer duration) {
        TpaTimingEvent tpaTimingEvent = TpaTracker.startTimingEvent(category, name);
        TpaTracker.trackTimingEvent(tpaTimingEvent, duration);
    }

    @ReactMethod
    public void trackTimingEventWithTags(String category, String name, Integer duration, ReadableMap tags) {
        TpaTimingEvent tpaTimingEvent = TpaTracker.startTimingEvent(category, name, recursivelyDeconstructReadableMapString(tags));
        TpaTracker.trackTimingEvent(tpaTimingEvent, duration);
    }

    //NonFatalIssue
    @ReactMethod
    public void reportNonFatalIssue(String stackTrace, String reason, ReadableMap userInfo) {
        TPACrossPlatformIssueReporting.reportNonFatalIssue(stackTrace, reason, recursivelyDeconstructReadableMap(userInfo), TPASupportedPlatforms.ReactNative);
    }

    //Log
    @ReactMethod
    public void logDebug(String message) {
        TpaLog.d(TAG, message);
    }

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
}
