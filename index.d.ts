type CrashHandling = 'disabled'|'alwaysAsk'|'alwaysSend';
type LogType = 'none'|'console'|'remote'|'both';
type FeedbackInvocation = 'disabled'|'enabled'|'shake';

/**
 * Configuration interface. Used for configuring TPA in {@link TPA#initialize}.
 * Options are:
 *  - {@link crashHandling crashHandling}
 *  - {@link logType logType}
 *  - {@link feedbackInvocation feedbackInvocation}
 *  - {@link isAnalyticsEnabled isAnalyticsEnabled}
 *  - {@link isSessionRecordingEnabled isSessionRecordingEnabled}
 *  - {@link tpaDebugLog tpaDebugLog}
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
    logType?: LogType;
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
     * Determines if tracking events are sent to TPA.
     * @default true
     */
    isAnalyticsEnabled?: boolean;
    /**
     * Determines if start and end session events are send to TPA. These include basic device information.
     * If disabled logging events are not reported to TPA even if {@link logType} is set to 'remote'.
     * Important: This flag does nothing on Android.
     * @default false
     */
    isSessionRecordingEnabled?: boolean;
    /**
     * When true the TPA library will output additional debug logging. This can be helpful for debugging issues with your TPA configuration.
     * @default false
     */
    tpaDebugLog?: boolean;
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

    //TODO Fix logging and add docs
    logDebug(message: string): void;
}

export const TPA: TPAInterface;