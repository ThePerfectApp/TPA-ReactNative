package com.reactlibrary.configuration;

import com.facebook.react.bridge.ReadableMap;

import io.tpa.tpalib.CrashHandling;
import io.tpa.tpalib.LogLevel;
import io.tpa.tpalib.LoggingDestination;
import io.tpa.tpalib.TpaConfiguration;
import io.tpa.tpalib.feedback.FeedbackInvocation;

// This class is used to bridge the gap between iOS and Android configuration until a more permanent alignment is done between the two platforms.
public class TPAReactNativeConfiguration {

    //region Constants
    private final static String AutomaticUpdateCheckEnabled = "automatic";
    //endregion

    //region Required Configuration Values
    private String url;
    private String projectUuid;
    //endregion

    public TPAReactNativeConfiguration(String url, String projectUuid) {
        this.url = url;
        this.projectUuid = projectUuid;
    }

    //region Enums
    private enum ConfigurationKeys {
        CrashHandling("crashHandling"),
        LoggingDestination("loggingDestination"),
        MinimumLogLevelConsole("minimumLogLevelConsole"),
        MinimumLogLevelRemote("minimumLogLevelRemote"),
        FeedbackInvocation("feedbackInvocation"),
        IsAnalyticsEnabled("isAnalyticsEnabled"),
        TpaDebugLog("tpaDebugLog"),
        IsNonFatalIssuesEnabled("isNonFatalIssuesEnabled"),
        UpdateNotification("updateNotification");

        private final String jsKey;

        ConfigurationKeys(final String jsKey) {
            this.jsKey = jsKey;
        }
    }
    //endregion

    //region Parsing Methods
    public TpaConfiguration parseConfiguration(ReadableMap configuration) {
        TpaConfiguration.Builder builder = new TpaConfiguration.Builder(projectUuid, url);

        if (configuration == null) {
            return builder.build();
        }

        if (configuration.hasKey(ConfigurationKeys.CrashHandling.jsKey)) {
            builder.setCrashHandling(getCrashHandling(configuration.getString(ConfigurationKeys.CrashHandling.jsKey)));
        }

        if (configuration.hasKey(ConfigurationKeys.LoggingDestination.jsKey)) {
            builder.setLoggingDestination(getLoggingDestination(configuration.getString(ConfigurationKeys.LoggingDestination.jsKey)));
        }

        if (configuration.hasKey(ConfigurationKeys.MinimumLogLevelConsole.jsKey)) {
            builder.setMinimumLogLevelConsole(getLogLevel(configuration.getString(ConfigurationKeys.MinimumLogLevelConsole.jsKey)));
        }

        if (configuration.hasKey(ConfigurationKeys.MinimumLogLevelRemote.jsKey)) {
            builder.setMinimumLogLevelRemote(getLogLevel(configuration.getString(ConfigurationKeys.MinimumLogLevelRemote.jsKey)));
        }

        if (configuration.hasKey(ConfigurationKeys.FeedbackInvocation.jsKey)) {
            builder.setFeedbackInvocation(getFeedbackInvocation(configuration.getString(ConfigurationKeys.FeedbackInvocation.jsKey)));
        }

        if (configuration.hasKey(ConfigurationKeys.IsAnalyticsEnabled.jsKey)) {
            builder.enableAnalytics(configuration.getBoolean(ConfigurationKeys.IsAnalyticsEnabled.jsKey));
        }

        if (configuration.hasKey(ConfigurationKeys.TpaDebugLog.jsKey)) {
            builder.enableDebug(configuration.getBoolean(ConfigurationKeys.TpaDebugLog.jsKey));
        }

        if (configuration.hasKey(ConfigurationKeys.IsNonFatalIssuesEnabled.jsKey)) {
            builder.setNonFatalIssuesEnabled(configuration.getBoolean(ConfigurationKeys.IsNonFatalIssuesEnabled.jsKey));
        }

        if (configuration.hasKey(ConfigurationKeys.UpdateNotification.jsKey)) {
            builder.setAutomaticUpdateCheckEnabled(configuration.getString(ConfigurationKeys.UpdateNotification.jsKey).equals(AutomaticUpdateCheckEnabled));
        }

        return builder.build();
    }

    private CrashHandling getCrashHandling(String jsCrashHandling) {
        if (jsCrashHandling == null) {
            return CrashHandling.DISABLED;
        }

        switch (jsCrashHandling) {
            case "disabled":
                return CrashHandling.DISABLED;
            case "alwaysAsk":
                return CrashHandling.ALWAYS_ASK;
            case "alwaysSend":
                return CrashHandling.ALWAYS_SEND;
            default:
                return CrashHandling.DISABLED;
        }
    }

    private LoggingDestination getLoggingDestination(String jsLoggingDestination) {
        if (jsLoggingDestination == null) {
            return LoggingDestination.CONSOLE;
        }

        switch (jsLoggingDestination) {
            case "none":
                return LoggingDestination.NONE;
            case "console":
                return LoggingDestination.CONSOLE;
            case "remote":
                return LoggingDestination.REMOTE;
            case "both":
                return LoggingDestination.BOTH;
            default:
                return LoggingDestination.CONSOLE;
        }
    }

    private LogLevel getLogLevel(String jsLogLevel) {
        if (jsLogLevel == null) {
            return LogLevel.DEBUG;
        }

        switch (jsLogLevel) {
            case "debug":
                return LogLevel.DEBUG;
            case "info":
                return LogLevel.INFO;
            case "warning":
                return LogLevel.WARNING;
            case "error":
                return LogLevel.ERROR;
            default:
                return LogLevel.DEBUG;
        }
    }

    private FeedbackInvocation getFeedbackInvocation(String jsFeedbackInvocation) {
        if (jsFeedbackInvocation == null) {
            return FeedbackInvocation.DISABLED;
        }

        switch (jsFeedbackInvocation) {
            case "disabled":
                return FeedbackInvocation.DISABLED;
            case "enabled":
                return FeedbackInvocation.ENABLED;
            case "shake":
                return FeedbackInvocation.EVENT_SHAKE;
            default:
                return FeedbackInvocation.DISABLED;
        }
    }
    //endregion
}
