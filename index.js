/**
 * @providesModule TPA
 */
'use strict';

import {
	NativeModules
} from 'react-native';

let TPAThePerfectApp = NativeModules.TPAThePerfectApp;

module.exports.TPA = {

	// Configuration

	initialize: function(url, projectUuid, configuration) {
		TPAThePerfectApp.initialize(url, projectUuid, configuration);
	},

	// Screen tracking

	trackScreenAppearing: function (title) {
		TPAThePerfectApp.trackScreenAppearing(title)
	},

	trackScreenAppearingWithTags: function (title, tags) {
		TPAThePerfectApp.trackScreenAppearingWithTags(title, tags)
	},

	trackScreenDisappearing: function (title) {
		TPAThePerfectApp.trackScreenDisappearing(title)
	},

	trackScreenDisappearingWithTags: function (title, tags) {
		TPAThePerfectApp.trackScreenDisappearingWithTags(title, tags)
	},

	// Event tracking

	trackEvent: function (category, name) {
		TPAThePerfectApp.trackEvent(category, name)
	},

	trackEventWithTags: function (category, name, tags) {
		TPAThePerfectApp.trackEventWithTags(category, name, tags)
	},

	// Duration tracking

	startTimingEvent: function (category, name) {
		return {
			type: "timing",
			category: category,
			name: name,
			timestamp: Date.now()
		}
	},

	trackTimingEvent: function (event) {
		if (event.type === "timing")  {

			let duration = Date.now() - event.timestamp;
			if (duration > 0) {
				TPAThePerfectApp.trackTimingEvent(event.category, event.name, duration)
			}
		}
	},

	trackTimingEventWithTags: function (event, tags) {
		if (event.type === "timing")  {

			let duration = Date.now() - event.timestamp;
			if (duration > 0) {
				TPAThePerfectApp.trackTimingEventWithTags(event.category, event.name, duration, tags)
			}
		}
	},

	// Non Fatal Issues

	reportNonFatalIssue: function (reason = null, userInfoMap = null) {
		let trace = new Error('').stack || '';
		let traceLines = trace.split('\n');
		traceLines.shift();
		TPAThePerfectApp.reportNonFatalIssue(traceLines.join('\n'), reason, userInfoMap);
	},

	reportNonFatalIssueWithError: function (error, reason = null, userInfoMap = null) {
		if (reason == null) {
			reason = `${error.name}: ${error.message}`;
		}
		TPAThePerfectApp.reportNonFatalIssue(error.stack, reason, userInfoMap);
	},

	// Feedback

	startFeedback() {
		TPAThePerfectApp.startFeedback();
	},

	// Logging

	logDebug: function (message) {

		TPAThePerfectApp.logDebug(message)

	}

};