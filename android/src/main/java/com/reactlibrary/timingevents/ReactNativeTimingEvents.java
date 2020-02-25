package com.reactlibrary.timingevents;

import java.util.HashMap;
import java.util.Map;

import io.tpa.tpalib.TPA;
import io.tpa.tpalib.TpaTimingEvent;

public class ReactNativeTimingEvents {

    private Map<String, TimingEventWrapper> timingEvents;

    private static class TimingEventWrapper {

        final TpaTimingEvent timingEvent;
        final long startTimestamp;

        TimingEventWrapper(TpaTimingEvent timingEvent, long startTimestamp) {
            this.timingEvent = timingEvent;
            this.startTimestamp = startTimestamp;
        }
    }

    public ReactNativeTimingEvents() {
        timingEvents = new HashMap<>();
    }

    public void startTimingEvent(String identifier, long startTimestamp, String category, String name) {
        timingEvents.put(identifier, new TimingEventWrapper(TPA.startTimingEvent(category, name), startTimestamp));
    }

    public void trackTimingEvent(String identifier, long endTimestamp, Map<String, String> tags) {
        TimingEventWrapper timingEvent = timingEvents.remove(identifier);
        if (timingEvent != null) {
            if (tags != null) {
                TPA.trackTimingEvent(timingEvent.timingEvent, getDuration(timingEvent.startTimestamp, endTimestamp), tags);
            } else {
                TPA.trackTimingEvent(timingEvent.timingEvent, getDuration(timingEvent.startTimestamp, endTimestamp));
            }
        }
    }

    private long getDuration(long start, long end) {
        return start > end ? start - end : end - start;
    }
}
