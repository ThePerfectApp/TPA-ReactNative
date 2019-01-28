package com.reactlibrary.configuration;

import com.facebook.react.bridge.ReadableMap;

import io.tpa.tpalib.TpaConfiguration;
import io.tpa.tpalib.ext.CrashHandling;
import io.tpa.tpalib.ext.TpaLog;

// This class is used to bridge the gap between iOS and Android configuration until a more permanent alignment is done between the two platforms.
public class TPAReactNativeConfiguration {
    //region Singleton
    private static TPAReactNativeConfiguration instance;

    private TPAReactNativeConfiguration() {}

    public static TPAReactNativeConfiguration getInstance() {
        if (instance == null) {
            instance = new TPAReactNativeConfiguration();
        }
        return instance;
    }
    //endregion

    //region Required Configuration Values
    private String url;
    private String projectUuid;
    //endregion
    //region Optional Configuration Values
    private CrashHandling crashHandling = CrashHandling.DISABLED;
    private TpaLog.Type logType = TpaLog.Type.NONE;
    private FeedbackInvocation feedbackInvocation = FeedbackInvocation.Disabled;
    private boolean isAnalyticsEnabled = true;
    private boolean tpaDebugLog = false;
    //endregion

    public void configure(String url, String projectUuid, ReadableMap rawConfiguration) {
        this.url = url;
        this.projectUuid = projectUuid;
        parseConfiguration(rawConfiguration);
    }

    //region Enums
    private enum ConfigurationKeys {
        CrashHandling("crashHandling"),
        LogType("logType"),
        FeedbackInvocation("feedbackInvocation"),
        IsAnalyticsEnabled("isAnalyticsEnabled"),
        TpaDebugLog("tpaDebugLog");

        private final String jsKey;

        ConfigurationKeys(final String jsKey) {
            this.jsKey = jsKey;
        }
    }

    public enum FeedbackInvocation {
        Disabled("disabled"),
        Enabled("enabled"),
        Shake("shake");

        private final String jsName;

        FeedbackInvocation(final String jsName) {
            this.jsName = jsName;
        }

        static FeedbackInvocation getByJSName(String jsName) {
            if (jsName == null) {
                return Disabled;
            }

            for (FeedbackInvocation feedbackInvocation: values()) {
                if (feedbackInvocation.jsName.equals(jsName)) {
                    return feedbackInvocation;
                }
            }

            return Disabled;
        }
    }
    //endregion

    //region Parsing Methods
    private void parseConfiguration(ReadableMap configuration) {
        if (configuration == null) {
            return;
        }

        if (configuration.hasKey(ConfigurationKeys.CrashHandling.jsKey)) {
            crashHandling = getCrashHandling(configuration.getString(ConfigurationKeys.CrashHandling.jsKey));
        }

        if (configuration.hasKey(ConfigurationKeys.LogType.jsKey)) {
            logType = getLogType(configuration.getString(ConfigurationKeys.LogType.jsKey));
        }

        if (configuration.hasKey(ConfigurationKeys.FeedbackInvocation.jsKey)) {
            feedbackInvocation = FeedbackInvocation.getByJSName(configuration.getString(ConfigurationKeys.FeedbackInvocation.jsKey));
        }

        if (configuration.hasKey(ConfigurationKeys.IsAnalyticsEnabled.jsKey)) {
            isAnalyticsEnabled = configuration.getBoolean(ConfigurationKeys.IsAnalyticsEnabled.jsKey);
        }

        if (configuration.hasKey(ConfigurationKeys.TpaDebugLog.jsKey)) {
            tpaDebugLog = configuration.getBoolean(ConfigurationKeys.TpaDebugLog.jsKey);
        }
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
                return CrashHandling.DISABLED;
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
                return TpaLog.Type.NONE;
        }
    }
    //endregion

    //region Getters
    public TpaConfiguration getTpaConfiguration() {
        if (this.url == null || this.projectUuid == null) {
            return null; // Cannot generate TpaConfiguration without url and project UUID
        }

        TpaConfiguration.Builder configBuilder = new TpaConfiguration.Builder(this.projectUuid, this.url);

        configBuilder.setCrashHandling(crashHandling);
        configBuilder.setLogType(logType);
        configBuilder.useShakeFeedback(feedbackInvocation == FeedbackInvocation.Shake);
        configBuilder.enableDebug(tpaDebugLog);

        return configBuilder.build();
    }

    public String getUrl() {
        return url;
    }

    public String getProjectUuid() {
        return projectUuid;
    }

    public CrashHandling getCrashHandling() {
        return crashHandling;
    }

    public TpaLog.Type getLogType() {
        return logType;
    }

    public FeedbackInvocation getFeedbackInvocation() {
        return feedbackInvocation;
    }

    public boolean isAnalyticsEnabled() {
        return isAnalyticsEnabled;
    }

    public boolean isTpaDebugLog() {
        return tpaDebugLog;
    }
    //endregion
}
