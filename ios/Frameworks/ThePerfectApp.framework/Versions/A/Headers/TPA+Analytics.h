//
//  TPA+Analytics.h
//  ThePerfectApp
//
//  Created by Peder Toftegaard Olsen on 31/01/2019.
//  Copyright © 2019 The Perfect App Ltd. All rights reserved.
//


/// :nodoc:
@interface TPATimingEvent : NSObject
@end


/**
 * Analytics-related features.
 */
@protocol TPAAnalytics

#pragma mark - Feature Flags

/**
 * If enabled, analytics data will be sent to the server.
 *
 * Analytics data include
 * - session start/end events containing basic information about the device.
 * - app events
 * - timing events
 * - tracking events
 *
 * <p></p>
 *
 * @note Disabled by default.
 */
@property (nonatomic, assign, getter=isAnalyticsEnabled) BOOL analyticsEnabled;


#pragma mark - App Events

/**
 * Tracks an app event with a category. All app events with the same
 * category will be grouped on TPA.
 *
 * @param category  The category of the event
 * @param name     The event name to track
 */
- (void)trackEventWithCategory:(NSString * _Nonnull)category name:(NSString * _Nonnull)name
NS_SWIFT_NAME(trackEvent(category:name:));

/**
 * Tracks an app event with a category and tags. All app events with the same
 * category will be grouped on TPA. Tags can be used to filter events on TPA.
 *
 * @param name      The event name to track
 * @param category  The category of the event
 * @param tags      Tags that can be used to filter events on TPA.
 */
- (void)trackEventWithCategory:(NSString * _Nonnull)category name:(NSString * _Nonnull)name tags:(NSDictionary * _Nullable)tags
NS_SWIFT_NAME(trackEvent(category:name:tags:));


#pragma mark - Timed Events

/**
 * Start a timed event registration.
 *
 * @param category   The category of the event
 * @param name       The name of the timing event
 * @return Event used in trackTimingEvent
 */
- (TPATimingEvent * _Nonnull)startTimingEventWithCategory:(NSString * _Nonnull)category
                                                     name:(NSString * _Nonnull)name
NS_SWIFT_NAME(startTimingEvent(category:name:));


/**
 * Track a previously started timing.
 * The event will be registered as having a time stamp equal to the time at which
 * startTimingEvent was called.
 * Duration is calculated as the time interval between calling startTimingEventWithCategory
 * and calling this method.
 *
 * @param event     Event from startTimingEventWithCategory
 */
- (void)trackTimingEvent:(TPATimingEvent * _Nonnull)event;

/**
 * Track a previously started timing.
 * The event will be registered as having a time stamp equal to the time at which
 * startTimingEvent was called.
 * Duration is calculated as the time interval between calling startTimingEventWithCategory
 * and calling this method.
 *
 * @param event     Event from startTimingEventWithCategory
 * @param tags      Tags that can be used to filter events on TPA.
 */
- (void)trackTimingEvent:(TPATimingEvent * _Nonnull)event
                    tags:(NSDictionary * _Nullable)tags
NS_SWIFT_NAME(trackTimingEvent(_:tags:));

/**
 * Track a previously started timing.
 * The event will be registered as having a time stamp equal to the time at which
 * startTimingEvent was called.
 *
 * @param event     Event from startTimingEventWithCategory
 * @param duration  Duration in milliseconds
 */
- (void)trackTimingEvent:(TPATimingEvent * _Nonnull)event
                duration:(NSUInteger)duration
NS_SWIFT_NAME(trackTimingEvent(_:duration:));

/**
 * Track a previously started timing.
 * The event will be registered as having a time stamp equal to the time at which
 * startTimingEventWithCategory was called.
 *
 * @param event     Event from startTimingEventWithCategory
 * @param duration  Duration in milliseconds
 * @param tags      Tags that can be used to filter events on TPA.
 */
- (void)trackTimingEvent:(TPATimingEvent * _Nonnull)event
                duration:(NSUInteger)duration
                    tags:(NSDictionary * _Nullable)tags
NS_SWIFT_NAME(trackTimingEvent(_:duration:tags:));


#pragma mark - Numerical Events

/**
 * Tracks a numerical event with a category.
 *
 * @param category  The category of the event
 * @param name      The event name to track
 * @param value     The numerical value
 */
- (void)trackEventWithCategory:(NSString * _Nonnull)category name:(NSString * _Nonnull)name doubleValue:(double)doubleValue
NS_SWIFT_NAME(trackEvent(category:name:doubleValue:));

/**
 * Tracks a numerical event with a category and tags.
 *
 * @param name      The event name to track
 * @param category  The category of the event
 * @param tags      Tags that can be used to filter events on TPA.
 */
- (void)trackEventWithCategory:(NSString * _Nonnull)category name:(NSString * _Nonnull)name doubleValue:(double)doubleValue tags:(NSDictionary * _Nullable)tags
NS_SWIFT_NAME(trackEvent(category:name:doubleValue:tags:));


#pragma mark - Screen Tracking

/**
 * Tracks a screen appearing event. It is recommended to track screen
 * appearing events in viewDidAppear.
 *
 * @param screenTitle  The title of the screen that is appearing.
 */
- (void)trackScreenAppearing:(NSString * _Nonnull)screenTitle;

/**
 * Tracks a screen appearing event with tags. It is recommended to track screen
 * appearing events in viewDidAppear. Tags can be used to filter events on TPA.
 *
 * @param screenTitle  The title of the screen that is appearing.
 * @param tags         Tags that can be used to filter events on TPA.
 */
- (void)trackScreenAppearing:(NSString * _Nonnull)screenTitle tags:(NSDictionary * _Nullable)tags;

/**
 * Tracks a screen disappearing event. It is recommended to track screen
 * appearing events in viewDidDisappear.
 *
 * @param screenTitle  The title of the screen that is disappearing.
 */
- (void)trackScreenDisappearing:(NSString * _Nonnull)screenTitle;

/**
 * Tracks a screen disappearing event with tags. It is recommended to track screen
 * disappearing events in viewDidDisappear. Tags can be used to filter events on TPA.
 *
 * @param screenTitle  The title of the screen that is disappearing.
 * @param tags         Tags that can be used to filter events on TPA.
 */
- (void)trackScreenDisappearing:(NSString * _Nonnull)screenTitle tags:(NSDictionary * _Nullable)tags;

@end
