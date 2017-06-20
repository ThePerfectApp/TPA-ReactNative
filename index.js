/**
 * @providesModule TPA
 */
'use strict';

import { NativeModules } from 'react-native';

var TPAThePerfectApp = NativeModules.TPAThePerfectApp;

module.exports.TPA = {

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
		return {type: "timing", category: category, name: name, timestamp: Date.now()}
	},

	trackTimingEvent: function (event) {

		if (event.type = "timing") {

			var duration = Date.now() - event.timestamp
			if (duration > 0) {
				TPAThePerfectApp.trackTimingEvent(event.category, event.name, duration)
			}
		}
	},

	trackTimingEventWithTags: function (event, tags) {

		if (event.type = "timing") {

			var duration = Date.now() - event.timestamp
			if (duration > 0) {
				TPAThePerfectApp.trackTimingEventWithTags(event.category, event.name, duration, tags)
			}
		}
	},

	// Logging

	logDebug: function (message) {

		TPAThePerfectApp.logDebug(message)

	}

}