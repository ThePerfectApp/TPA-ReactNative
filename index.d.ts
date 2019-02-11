type CrashHandling = 'disabled'|'alwaysAsk'|'alwaysSend';
type LoggingDestination = 'none'|'console'|'remote'|'both';
type LogLevel = 'debug'|'info'|'warning'|'error';
type FeedbackInvocation = 'disabled'|'enabled'|'shake';
type UpdateNotification = 'disabled'|'manually'|'automatic';

/**
 * Configuration interface. Used for configuring TPA in {@link TPA#initialize}.
 * Options are:
 *  - {@link crashHandling crashHandling}
 *  - {@link loggingDestination loggingDestination}
 *  - {@link minimumLogLevelConsole minimumLogLevelConsole}
 *  - {@link minimumLogLevelRemote minimumLogLevelRemote}
 *  - {@link feedbackInvocation feedbackInvocation}
 *  - {@link isAnalyticsEnabled isAnalyticsEnabled}
 *  - {@link tpaDebugLog tpaDebugLog}
 *  - {@link isNonFatalIssuesEnabled isNonFatalIssuesEnabled}
 */
interface Configuration {
    /**
     * Determines how crashes are handled.
     * Possible values are:
     *  'disabled'      - crashes will be discarded
     *  'alwaysAsk'     - after a crash TPA will ask the user if they wish to report the crash
     *  'alwaysSend'    - crashes will always be send to TPA. User is not prompted
     * @default 'disabled'
     */
    crashHandling?: CrashHandling;
    /**
     * Determines where log messages are sent.
     * Possible values are:
     *  'none'      - logs are discarded
     *  'console'   - logs are logged in the console
     *  'remote'    - logs are sent to TPA
     *  'both'      - combines 'console' and 'remote' logging
     * @default 'none'
     */
    loggingDestination?: LoggingDestination;
    /**
     * The minimum log level that will be output to the console.
     * Has no effect if {@link loggingDestination} is set to 'none'.
     * @default 'debug'
     */
    minimumLogLevelConsole?: LogLevel;
    /**
     * The minimum log level that will be sent to TPA.
     * Has no effect if {@link loggingDestination} is to 'none' or 'console'.
     * @default 'debug'
     */
    minimumLogLevelRemote?: LogLevel;
    /**
     * Determines how feedback invocations are handled.
     * Possible values are:
     *  'disabled'  - feedback invocations are disabled. Calls to startFeedback will be ignored
     *  'enabled'   - feedback invocations are enabled
     *  'shake'     - feedback invocations are enabled and the user can shake to trigger a feedback invocation
     *  @default 'disabled'
     */
    feedbackInvocation?: FeedbackInvocation;
    /**
     *  Enable analytics for TPA. Enabling this will enable:
     *  - Session recording. These are start and end events for your user.
     *  - Tracking events. Events sent using {@link TPA#trackEvent trackEvent} and overloads.
     *  - Timing events. Timing events sent using {@link TPA#trackTimingEvent trackTimingEvent} and overloads.
     *  - App events. App events such as {@link TPA#trackScreenAppearing trackScreenAppearing} and {@link TPA#trackScreenDisappearing trackScreenDisappearing}.
     * @default false
     */
    isAnalyticsEnabled?: boolean;
    /**
     * When true the TPA library will output additional debug logging. This can be helpful for debugging issues with your TPA configuration.
     * @default false
     */
    tpaDebugLog?: boolean;
    /**
     * Determines if non-fatal issues are sent to TPA.
     * @default false
     */
    isNonFatalIssuesEnabled?: boolean;
    /**
     * Determines how update notifications are handled.
     * Possible values are:
     *  'disabled'  - Update notification are disabled. Calls to checkForUpdate are ignored.
     *  'enabled'   - Update notification are enabled. Call checkForUpdate to receive a notification if there is an update available.
     *  'automatic' - Update notification are enabled. User will automatically be notified when an update is available.
     * Note: On Android update notifications are dependent on the TPALib Distribution library, thus this will function differently.
     * An app WITHOUT the TPALib Distribution library will always behave as if this flag is set to 'disabled'.
     * An app WITH the TPALib Distribution library will behave as if this flag is 'enabled' and automatic update notification will appear if it is set to 'automatic'.
     * @default 'disabled'
     */
    updateNotification?: UpdateNotification;
}

interface TPALog {
    /**
     * Write a debug log line to your chosen {@link Configuration#loggingDestination logging destinations}.
     * @param message - the log line to write.
     */
    debug(message: string);

    /**
     * Write an info log line to your chosen {@link Configuration#loggingDestination logging destinations}.
     * @param message - the log line to write.
     */
    info(message: string);

    /**
     * Write a warning log line to your chosen {@link Configuration#loggingDestination logging destinations}.
     * @param message - the log line to write.
     */
    warning(message: string);

    /**
     * Write an error log line to your chosen {@link Configuration#loggingDestination logging destinations}.
     * @param message - the log line to write.
     */
    error(message: string);
}

interface TPAInterface {
    // Configuration

    /**
     * Initialize the TPA library. This is best called in your index.js file before registering your App with the AppRegistry.
     * @example Configuration shown with default values
     * TPA.initialize('https://mytpainstance.tpa.io/', Platform.select({ios:'iOSProjectUUID', android:'AndroidProjectUUID'}), {
     *      crashHandling: 'disabled',
     *      logType: 'none',
     *      feedbackInvocation: 'disabled',
     *      isAnalyticsEnabled: true,
     *      isSessionRecordingEnabled: false,
     *      tpaDebugLog: false
     * });
     * @param url - the base url to your TPA server. Can be found on the main page of your project.
     * @param projectUuid - The project UUID for your TPA project. Keep in mind that this will differ based on the platform. Use Platform.select(...) to easily configure your app based on the platform.
     * @param configuration - The configurations for your app, if set to nil all defaults will be used.
     */
    initialize(url: string, projectUuid: string, configuration?: Configuration): void;

    // Screen Tracking

    /**
     * Track a screen appearing. This will typically be called from your component's componentDidMount function.
     * @example
     * class MyComponent extends React.Component {
     *     ...
     *     componentDidMount() {
     *         TPA.trackScreenAppearing('MyComponent');
     *     }
     *     ...
     * }
     * @param title - the title of the screen, typically the name of a component.
     */
    trackScreenAppearing(title: string): void;

    /**
     * Track a screen appearing with additional tags. Tags can be useful for filtering your events. This will typically be called from your component's componentDidMount function.
     * @example
     * class MyComponent extends React.Component {
     *     ...
     *     componentDidMount() {
     *         TPA.trackScreenAppearingWithTags('MyComponent', {'MyTag':'Value'});
     *     }
     *     ...
     * }
     * @param title - the title of the screen, typically the name of a component.
     * @param tags - an object containing tags, only string values are supported. Important: Do NOT include personal data in your tags.
     */
    trackScreenAppearingWithTags(title: string, tags: { [key: string]: string }): void;

    /**
     * Track a screen disappearing. This will typically be called from your component's componentWillUnmount function.
     * @example
     * class MyComponent extends React.Component {
     *     ...
     *     componentWillUnmount() {
     *         TPA.trackScreenDisappearing('MyComponent');
     *     }
     *     ...
     * }
     * @param title - the title of the screen, typically the name of a component.
     */
    trackScreenDisappearing(title: string): void;

    /**
     * Track a screen disappearing with additional tags. Tags can be useful for filtering your events. This will typically be called from your component's componentWillUnmount function.
     * @example
     * class MyComponent extends React.Component {
     *     ...
     *     componentWillUnmount() {
     *         TPA.trackScreenDisappearingWithTags('MyComponent', {'My Tag':'Value'});
     *     }
     *     ...
     * }
     * @param title - the title of the screen, typically the name of a component.
     * @param tags - an object containing tags, only string values are supported. Important: Do NOT include personal data in your tags.
     */
    trackScreenDisappearingWithTags(title: string, tags: { [key: string]: string }): void;

    // Event tracking

    /**
     * Track an event with a category. All events with the same category will be grouped on TPA.
     * @example
     * TPA.trackEvent('My Category', 'Custom Event');
     * @param category - the category of the event.
     * @param name - the name of the event.
     */
    trackEvent(category: string, name: string): void;

    /**
     * Track an event with a category and tags. All events with the same category will be grouped on TPA. Tags can be useful for filtering your events.
     * @example
     * TPA.trackEventWithTags('My Category', 'Custom Event', {'My Tag':'Value'});
     * @param category - the category of the event.
     * @param name - the name of the event.
     * @param tags - an object containing tags, only string values are supported. Important: Do NOT include personal data in your tags.
     */
    trackEventWithTags(category: string, name: string, tags: { [key: string]: string }): void;

    // Duration tracking

    /**
     * Start a timing event that can later be tracked to TPA.
     * @param category - the category of the event.
     * @param name - the name of the event.
     * @returns the identifier of the event, this is later used to complete the tracking with {@link trackTimingEvent} or {@link trackTimingEventWithTags}.
     */
    startTimingEvent(category: string, name: string): string;

    /**
     * Track a timing event with an identifier. The identifier is acquired from {@link startTimingEvent}.
     * @example
     * const identifier = TPA.startTimingEvent('My Category', 'Custom Event');
     * // Your code
     * TPA.trackTimingEvent(identifier);
     * @param identifier - the identifier previously acquired from {@link startTimingEvent}.
     */
    trackTimingEvent(identifier: string): void;

    /**
     * Track a timing with an identifier and additional tags. The identifier is acquired from {@link startTimingEvent}. Tags can be useful for filtering your events.
     * @example
     * const identifier = TPA.startTimingEvent('My Category', 'Custom Event');
     * // Your code
     * TPA.trackTimingEventWithTags(identifier, {'My Tag':'Value'});
     * @param identifier - the identifier previously acquired fro {@link startTimingEvent}.
     * @param tags - an object containing tags, only string values are supported. Important: Do NOT include personal data in your tags.
     */
    trackTimingEventWithTags(identifier: string, tags: { [key: string]: string }): void;

    // Non fatal issues
    /**
     * Log a non-fatal issue with an optional reason and userInfoMap. This is helpful for logging a state that should normally be unreachable.
     * For more info on non-fatal issues check out {@link https://blog.tpa.io/developers/2018/07/19/non-fatal-issues/ this blog post}.
     * @example
     * if (state == ExpectedState) {
     *     // Expected path
     * } else {
     *     // Should never happen
     *     TPA.reportNonFatalIssue(`Invalid state: ${state}`, {'Other Variable': otherVariable});
     * }
     * @param reason - reason for the issue. TPA will group non-fatal issues based on this regardless of the underlying stacktrace.
     * @param userInfoMap - json object with additional information. Will be included in the issue log on TPA.
     */
    reportNonFatalIssue(reason?: string, userInfoMap?: { [key: string]: any }): void;

    /**
     * Log a non-fatal issue with an error and an optional reason and userInfoMap. This is helpful for logging caught errors that still cause the app to end up in a broken state.
     * For more info on non-fatal issues check out {@link https://blog.tpa.io/developers/2018/07/19/non-fatal-issues/ this blog post}.
     * @example
     * try {
     *     writeFile(file);
     * } catch(error) {
     *     TPA.reportNonFatalIssueWithError(error, 'File Error', {'File Size': file.size});
     * }
     * @param error - the caught error.
     * @param reason - reason for the issue. TPA will group non-fatal issues based on this regardless of the underlying stacktrace.
     * @param userInfoMap - json object with additional information. Will be included in the issue log on TPA.
     */
    reportNonFatalIssueWithError(error: Error, reason?: string, userInfoMap?: { [key: string]: any }): void;

    // Feedback

    /**
     * Capture a screenshot of the current screen and allow the user to draw on it as well as include a message before sending it to TPA.
     * Does nothing if {@link Configuration#feedbackInvocation} is 'disabled'.
     */
    startFeedback(): void;

    // Logging

    log: TPALog;

    // Updates

    /**
     * Manually check if an update is available. If an update is available, the user have the option to install it from a dialog.
     * Does nothing if {@link Configuration#updateNotification} is 'disabled'.
     */
    checkForUpdate(): void;
}

export const TPA: TPAInterface;