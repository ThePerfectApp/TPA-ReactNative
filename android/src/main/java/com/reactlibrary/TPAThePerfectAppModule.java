
package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;

import java.util.HashMap;
import java.util.Map;

import io.tpa.tpalib.analytics.TpaTimingEvent;
import io.tpa.tpalib.analytics.TpaTracker;

public class TPAThePerfectAppModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public TPAThePerfectAppModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "TPAThePerfectApp";
    }

    @ReactMethod
    public void trackScreenAppearing(String title) {
        TpaTracker.trackScreenAppearing(title);
    }

    @ReactMethod
    public void trackScreenAppearingWithTags(String title, ReadableMap tags) {
        TpaTracker.trackScreenAppearing(title, recursivelyDeconstructReadableMap(tags));
    }

    @ReactMethod
    public void trackScreenDisappearing(String title) {
        TpaTracker.trackScreenDisappearing(title);
    }

    @ReactMethod
    public void trackScreenDisappearingWithTags(String title, ReadableMap tags) {
        TpaTracker.trackScreenDisappearing(title, recursivelyDeconstructReadableMap(tags));
    }

    @ReactMethod
    public void trackEvent(String category, String name) {
        TpaTracker.trackEvent(category, name);
    }

    @ReactMethod
    public void trackEventWithTags(String category, String name, ReadableMap tags) {
        TpaTracker.trackEvent(category, name, recursivelyDeconstructReadableMap(tags));
    }

    @ReactMethod
    public void trackTimingEvent(String category, String name, Integer duration) {
        TpaTimingEvent tpaTimingEvent = TpaTracker.startTimingEvent(category, name);
        TpaTracker.trackTimingEvent(tpaTimingEvent, duration);
    }

    @ReactMethod
    public void trackTimingEventWithTags(String category, String name, Integer duration, ReadableMap tags) {
        TpaTimingEvent tpaTimingEvent = TpaTracker.startTimingEvent(category, name, recursivelyDeconstructReadableMap(tags));
        TpaTracker.trackTimingEvent(tpaTimingEvent, duration);
    }

    //https://github.com/facebook/react-native/issues/4655
    private Map<String, String> recursivelyDeconstructReadableMap(ReadableMap readableMap) {
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        Map<String, String> deconstructedMap = new HashMap<>();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = readableMap.getType(key);
            switch (type) {
                case Null:
                    deconstructedMap.put(key, null);
                    break;
                /*case Boolean:
                    deconstructedMap.put(key, readableMap.getBoolean(key));
                    break;
                case Number:
                    deconstructedMap.put(key, readableMap.getDouble(key));
                    break;*/
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