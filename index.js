/**
 * @providesModule TPA
 */
'use strict';

import {
	NativeModules
} from 'react-native';

let TPAThePerfectApp = NativeModules.TPAThePerfectApp;

/**
 * Generate timing event identifier. The identifier consists of the category, name and timestamp appended with 10 pseudo random digits.
 * Preferably this would have been an UUID but they are not supported out of the box in javascript.
 * @param category {string}
 * @param name {string}
 * @param startTimestamp {number}
 * @returns {string}
 */
function generateTimingEventIdentifier(category, name, startTimestamp) {
	let identifier = `${category}-${name}-${startTimestamp}-`;
	for (let i = 0; i < 10; i++) {
		identifier += Math.random() * 10;
	}
	return identifier;
}

let logDebug = false;

module.exports.TPA = {

	// Configuration
	/**
	 * Determines how crashes are handled.
	 * Possible values are:
	 *  'disabled'      - crashes will be discarded
	 *  'alwaysAsk'     - after a crash TPA will ask the user if they wish to report the crash
	 *  'alwaysSend'    - crashes will always be send to TPA. User is not prompted
	 * @typedef {('disabled'|'alwaysAsk'|'alwaysSend')} CrashHandling
	 * @default 'disabled'
	 */

	/**
	 * Determines where log messages are sent.
	 * Possible values are:
	 *  'none'      - logs are discarded
	 *  'console'   - logs are logged in the console
	 *  'remote'    - logs are sent to TPA
	 *  'both'      - combines 'console' and 'remote' logging
	 * @typedef {('none'|'console'|'remote'|'both')} LoggingDestination
	 * @default 'none'
	 */

	/**
	 * @typedef {('debug'|'info'|'warning'|'error')} LogLevel
	 */

	/**
	 * Determines how feedback invocations are handled.
	 * Possible values are:
	 *  'disabled'  - feedback invocations are disabled. Calls to startFeedback will be ignored
	 *  'enabled'   - feedback invocations are enabled
	 *  'shake'     - feedback invocations are enabled and the user can shake to trigger a feedback invocation
	 *  @typedef {('disabled'|'enabled'|'shake')} FeedbackInvocation
	 *  @default 'disabled'
	 */

	/**
	 * Determines how update notifications are handled.
	 * Possible values are:
	 * 	'disabled'  - Update notification are disabled. Calls to checkForUpdate are ignored.
	 *  'enabled'   - Update notification are enabled. Call checkForUpdate to receive a notification if there is an update available.
	 *  'automatic' - Update notification are enabled. User will automatically be notified when an update is available.
	 * Note: On Android update notifications are dependent on the TPALib Distribution library, thus this will function differently.
	 * An app WITHOUT the TPALib Distribution library will always behave as if this flag is set to 'disabled'.
	 * An app WITH the TPALib Distribution library will behave as if this flag is 'enabled' and automatic update notification will appear if it is set to 'automatic'.
	 * @typedef {('disabled'|'manually'|'automatic')} UpdateNotification
	 * @default 'disabled
	 */

	/**
	 * @interface Configuration
	 * @property {CrashHandling} [crashHandling] - Determines how crashes are handled.
	 * @property {LoggingDestination} [loggingDestination] - Determines where log messages are sent.
	 * @property {LogLevel} [minimumLogLevelConsole] - Sets the minimum log level that will be output to the console.
	 * @property {LogLevel} [minimumLogLevelRemote] - Set the minimum log level that will be sent to TPA.
	 * @property {FeedbackInvocation} [feedbackInvocation] - Determines how feedback invocations are handled.
	 * @property {boolean} [isAnalyticsEnabled] - Determines if analytics data is sent to TPA.
	 * @property {boolean} [tpaDebugLog] - When true the TPA library will output additional debug logging. This can be helpful for debugging issues with your TPA configuration.
	 * @property {boolean} [isNonFatalIssuesEnabled] - Determines if non-fatal issues are sent to TPA.
	 * @property {UpdateNotification} [updateNotification] - Determines how to check for update notifications.
	 */

	/**
	 * Initialize the TPA library. This is best called in your index.js file before registering your App with the AppRegistry.
	 * @example Configuration shown with default values
	 * TPA.initialize('https://mytpainstance.tpa.io/', Platform.select({ios:'iOSProjectUUID', android:'AndroidProjectUUID'}), {
	 *      crashHandling: 'disabled',
	 *      loggingDestination: 'console',
	 *      minimumLogLevelConsole: 'debug',
	 *      minimumLogLevelRemote: 'debug',
	 *      feedbackInvocation: 'disabled',
	 *      isAnalyticsEnabled: false,
	 *      tpaDebugLog: false,
	 *      isNonFatalIssuesEnabled: false,
	 *      updateNotification: 'disabled'
	 * });
	 * @param {string} url - the base url to your TPA server. Can be found on the main page of your project.
	 * @param {string} projectUuid - The project UUID for your TPA project. Keep in mind that this will differ based on the platform. Use Platform.select(...) to easily configure your app based on the platform.
	 * @param {Configuration} configuration - The configurations for your app, if set to nil all defaults will be used.
	 */
	initialize: function(url, projectUuid, configuration) {
		if (configuration !== null && configuration !== undefined && configuration.tpaDebugLog !== undefined) {
			logDebug = configuration.tpaDebugLog;
		}

		TPAThePerfectApp.initialize(url, projectUuid, configuration);
	},

	// Screen tracking

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
	 * @param {string} title - the title of the screen, typically the name of a component.
	 */
	trackScreenAppearing: function (title) {
		TPAThePerfectApp.trackScreenAppearing(title)
	},

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
	 * @param {string} title - the title of the screen, typically the name of a component.
	 * @param {Object<string, string>} tags - an object containing tags, only string values are supported. Important: Do NOT include personal data in your tags.
	 */
	trackScreenAppearingWithTags: function (title, tags) {
		TPAThePerfectApp.trackScreenAppearingWithTags(title, tags)
	},

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
	 * @param {string} title - the title of the screen, typically the name of a component.
	 */
	trackScreenDisappearing: function (title) {
		TPAThePerfectApp.trackScreenDisappearing(title)
	},

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
	 * @param {string} title - the title of the screen, typically the name of a component.
	 * @param {Object<string, string>} tags - an object containing tags, only string values are supported. Important: Do NOT include personal data in your tags.
	 */
	trackScreenDisappearingWithTags: function (title, tags) {
		TPAThePerfectApp.trackScreenDisappearingWithTags(title, tags)
	},

	// Event tracking

	/**
	 * Track an event with a category. All events with the same category will be grouped on TPA.
	 * @example
	 * TPA.trackEvent('My Category', 'Custom Event');
	 * @param {string} category - the category of the event.
	 * @param {string} name - the name of the event.
	 */
	trackEvent: function (category, name) {
		TPAThePerfectApp.trackEvent(category, name)
	},

	/**
	 * Track an event with a category and tags. All events with the same category will be grouped on TPA. Tags can be useful for filtering your events.
	 * @example
	 * TPA.trackEventWithTags('My Category', 'Custom Event', {'My Tag':'Value'});
	 * @param {string} category - the category of the event.
	 * @param {string} name - the name of the event.
	 * @param {Object<string, string>} tags - an object containing tags, only string values are supported. Important: Do NOT include personal data in your tags.
	 */
	trackEventWithTags: function (category, name, tags) {
		TPAThePerfectApp.trackEventWithTags(category, name, tags)
	},

	// Duration tracking

	/**
	 * Start a timing event that can later be tracked to TPA.
	 * @param {string} category - the category of the event.
	 * @param {string} name - the name of the event.
	 * @returns {string} the identifier of the event, this is later used to complete the tracking with {@link trackTimingEvent} or {@link trackTimingEventWithTags}.
	 */
	startTimingEvent: function (category, name) {
		let startTimestamp = Date.now();
		let identifier = generateTimingEventIdentifier(category, name, startTimestamp);
		TPAThePerfectApp.startTimingEvent(identifier, startTimestamp, category, name);
		return identifier;
	},

	/**
	 * Track a timing event with an identifier. The identifier is acquired from {@link startTimingEvent}.
	 * @example
	 * const identifier = TPA.startTimingEvent('My Category', 'Custom Event');
	 * // Your code
	 * TPA.trackTimingEvent(identifier);
	 * @param {string} identifier - the identifier previously acquired from {@link startTimingEvent}.
	 */
	trackTimingEvent: function (identifier) {
		TPAThePerfectApp.trackTimingEvent(identifier, Date.now());
	},

	/**
	 * Track a timing with an identifier and additional tags. The identifier is acquired from {@link startTimingEvent}. Tags can be useful for filtering your events.
	 * @example
	 * const identifier = TPA.startTimingEvent('My Category', 'Custom Event');
	 * // Your code
	 * TPA.trackTimingEventWithTags(identifier, {'My Tag':'Value'});
	 * @param {string} identifier - the identifier previously acquired fro {@link startTimingEvent}.
	 * @param {string} tags - an object containing tags, only string values are supported. Important: Do NOT include personal data in your tags.
	 */
	trackTimingEventWithTags: function (identifier, tags) {
		TPAThePerfectApp.trackTimingEventWithTags(identifier, Date.now(), tags);
	},

	// Non Fatal Issues

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
	 * @param {(string|null)=} reason - reason for the issue. TPA will group non-fatal issues based on this regardless of the underlying stacktrace.
	 * @param {(Object|null)=} userInfoMap - json object with additional information. Will be included in the issue log on TPA.
	 */
	reportNonFatalIssue: function (reason = null, userInfoMap = null) {
		let trace = new Error('').stack || '';
		let traceLines = trace.split('\n');
		traceLines.shift();
		TPAThePerfectApp.reportNonFatalIssue(traceLines.join('\n'), reason, userInfoMap);
	},

	/**
	 * Log a non-fatal issue with an error and an optional reason and userInfoMap. This is helpful for logging caught errors that still cause the app to end up in a broken state.
	 * For more info on non-fatal issues check out {@link https://blog.tpa.io/developers/2018/07/19/non-fatal-issues/ this blog post}.
	 * @example
	 * try {
	 *     writeFile(file);
	 * } catch(error) {
	 *     TPA.reportNonFatalIssueWithError(error, 'File Error', {'File Size': file.size});
	 * }
	 * @param {Error} error - the caught error.
	 * @param {(string|null)=} reason - reason for the issue. TPA will group non-fatal issues based on this regardless of the underlying stacktrace.
	 * @param {(Object|null)=} userInfoMap - json object with additional information. Will be included in the issue log on TPA.
	 */
	reportNonFatalIssueWithError: function (error, reason = null, userInfoMap = null) {
		if (reason == null) {
			reason = `${error.name}: ${error.message}`;
		}
		TPAThePerfectApp.reportNonFatalIssue(error.stack, reason, userInfoMap);
	},

	// Fatal Issues

	/**
	 * Throws a javascript error as a fatal exception, this can be useful for forcing the app to crash even in the case of soft javascript exceptions or error in the component tree.
	 * WARNING: This will crash your app, only call this if you are absolutely certain that is the behavior you want.
	 * @param error - the javascript error to throw
	 */
	exitWithFatalError(error) {
		if (error === undefined && logDebug) {
			console.warn('TPA.reportFatalError called with undefined error, app will not crash as this is unexpected behaviour.');
			return;
		}
		const parseErrorStack = require('react-native/Libraries/Core/Devtools/parseErrorStack');
		TPAThePerfectApp.exitWithFatalError(`${error.name}: ${error.message}`, parseErrorStack(error));
	},

	// Feedback

	/**
	 * Capture a screenshot of the current screen and allow the user to draw on it as well as include a message before sending it to TPA.
	 * Does nothing if {@link Configuration#feedbackInvocation} is 'disabled'.
	 */
	startFeedback() {
		TPAThePerfectApp.startFeedback();
	},

	// Logging

	log: {
		/**
		 * Write a debug log line to your chosen {@link Configuration#loggingDestination logging destinations}.
		 * @param {string} message - the log line to write.
		 */
		debug: function (message) {
			TPAThePerfectApp.log('debug', message);
		},

		/**
		 * Write an info log line to your chosen {@link Configuration#loggingDestination logging destinations}.
		 * @param {string} message - the log line to write.
		 */
		info: function (message) {
			TPAThePerfectApp.log('info', message);
		},

		/**
		 * Write a warning log line to your chosen {@link Configuration#loggingDestination logging destinations}.
		 * @param {string} message - the log line to write.
		 */
		warning: function (message) {
			TPAThePerfectApp.log('warning', message);
		},

		/**
		 * Write an error log line to your chosen {@link Configuration#loggingDestination logging destinations}.
		 * @param {string} message - the log line to write.
		 */
		error: function (message) {
			TPAThePerfectApp.log('error', message);
		}
	},

	// Update

	/**
	 * Manually check if an update is available. If an update is available, the user have the option to install it from a dialog.
	 * Does nothing if {@link Configuration#updateNotification} is 'disabled'.
	 */
	checkForUpdate: function() {
		TPAThePerfectApp.checkForUpdate();
	}

};