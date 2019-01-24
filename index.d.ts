export type CrashHandling = 'disabled'|'alwaysAsk'|'alwaysSend';
export type LogType = 'none'|'console'|'remote'|'both';
export type FeedbackInvocation = 'disabled'|'enabled'|'shake';

export interface Configuration {
    crashHandling?: CrashHandling;
    logType?: LogType;
    feedbackInvocation?: FeedbackInvocation;
    isAnalyticsEnabled?: boolean;
    isSessionRecordingEnabled?: boolean;
    tpaDebugLog?: boolean;
}

export type TimingEvent = {
    type: "timing";
    category: string;
    name: string;
    timestamp: number;
};

export class TPA {
    // Configuration

    static initialize(url: string, projectUuid: string, configuration?: Configuration): void;

    // Screen Tracking

    static trackScreenAppearing(title: string): void;

    static trackScreenAppearingWithTags(title: string, tags: { [key: string]: string }): void;

    static trackScreenDisappearing(title: string): void;

    static trackScreenDisappearingWithTags(title: string, tags: { [key: string]: string }): void;

    // Event tracking

    static trackEvent(category: string, name: string): void;

    static trackEventWithTags(category: string, name: string, tags: { [key: string]: string }): void;

    // Duration tracking

    static startTimingEvent(category: string, name: string): TimingEvent;

    static trackTimingEvent(event: TimingEvent): void;

    static trackTimingEventWithTags(event: TimingEvent, tags: { [key: string]: string }): void;

    // Non fatal issues

    static reportNonFatalIssue(reason?: string, userInfoMap?: { [key: string]: any }): void;

    static reportNonFatalIssueWithError(error: Error, reason?: string, userInfoMap?: { [key: string]: any }): void;

    // Feedback

    static startFeedback(): void;

    // Logging

    static logDebug(message: string): void;
}