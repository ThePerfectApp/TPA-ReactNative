
#import "TPAThePerfectApp.h"
#import <ThePerfectApp/ThePerfectApp.h>
#import "TPANonFatalReporting.h"
#import "TPAReactNativeTimingEvents.h"
#import "TPAStartupNotifier.h"
//#if __has_include(<React/RCTConvert.h>)
#import <React/RCTConvert.h>
//#else
//#import "RCTConvert.h"
//#endif

@implementation TPAThePerfectApp
{
    TPAReactNativeTimingEvents *_timingEventHandler;
}

NSString * const kCrashHandlingJSKey = @"crashHandling";
NSString * const kLoggingDestinationJSKey = @"loggingDestination";
NSString * const kMinimumLogLevelConsoleJSKey = @"minimumLogLevelConsole";
NSString * const kMinimumLogLevelRemoteJSKey = @"minimumLogLevelRemote";
NSString * const kAnalyticsEnabledJSKey = @"isAnalyticsEnabled";
NSString * const kSessionRecordingJSKey = @"isSessionRecordingEnabled";
NSString * const kFeedbackInvocationJSKey = @"feedbackInvocation";
NSString * const kTpaDebugLoggingJSKey = @"tpaDebugLog";
NSString * const kIsNonFatalIssuesEnabledJSKey = @"isNonFatalIssuesEnabled";
NSString * const kUpdateNotificationJSKey = @"updateNotification";

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE(TPAThePerfectApp)

#pragma mark - Configuration

RCT_EXPORT_METHOD(initialize:(NSString *)url projectUuid:(NSString *)projectUuid configuration:(NSDictionary *)configuration)
{
    _timingEventHandler = [[TPAReactNativeTimingEvents alloc] init];
    
    id crashHandlingJS = [configuration objectForKey:kCrashHandlingJSKey];
    if (crashHandlingJS != nil) {
        [TPA shared].crashReporting = [self getCrashHandling:crashHandlingJS];
    }
    
    id loggingDestinationJS = [configuration objectForKey:kLoggingDestinationJSKey];
    if (loggingDestinationJS != nil) {
        [TPA shared].loggingDestinations = [self getLoggingDestination:loggingDestinationJS];
    }
    
    id minimumLogLevelConsoleJS = [configuration objectForKey:kMinimumLogLevelConsoleJSKey];
    if (minimumLogLevelConsoleJS != nil) {
        [TPA shared].consoleLogLevel = [self getLogLevel:minimumLogLevelConsoleJS];
    }
    
    id minimumLogLevelRemoteJS = [configuration objectForKey:kMinimumLogLevelRemoteJSKey];
    if (minimumLogLevelRemoteJS != nil) {
        [TPA shared].remoteLogLevel = [self getLogLevel:minimumLogLevelRemoteJS];
    }
    
    id feedbackInvocationJS = [configuration objectForKey:kFeedbackInvocationJSKey];
    if (feedbackInvocationJS != nil) {
        [TPA shared].feedbackInvocation = [self getFeedbackInvocation:feedbackInvocationJS];
    }
    
    id analyticsEnabledJS = [configuration objectForKey:kAnalyticsEnabledJSKey];
    if (analyticsEnabledJS != nil) {
        [TPA shared].analyticsEnabled = [RCTConvert BOOL:analyticsEnabledJS];
    }
    
    id debugLoggingEnabled = [configuration objectForKey:kTpaDebugLoggingJSKey];
    if (debugLoggingEnabled != nil) {
        [TPA shared].tpaDebugLoggingEnabled = [RCTConvert BOOL:debugLoggingEnabled];
    }
    
    id isNonFatalIssuesEnabledJS = [configuration objectForKey:kIsNonFatalIssuesEnabledJSKey];
    if (isNonFatalIssuesEnabledJS != nil) {
        [TPA shared].nonFatalEnabled = [RCTConvert BOOL:isNonFatalIssuesEnabledJS];
    }
    
    id updateNotificationJS = [configuration objectForKey:kUpdateNotificationJSKey];
    if (updateNotificationJS != nil) {
        [[TPA shared] setUpdateNotification:[self getUpdateNotification:updateNotificationJS]];
    }
    
    [[TPA shared] startWithBaseUrl:url projectUuid:projectUuid];
    
    [TPAStartupNotifier ensureStartup]; // Make sure applicationDidBecomeActive is called
}

- (TPACrashReporting)getCrashHandling:(id)crashHandlingJS
{
    if ([crashHandlingJS respondsToSelector:@selector(isEqualToString:)]) {
        if ([crashHandlingJS isEqualToString:@"disabled"]) {
            return TPACrashReportingDisabled;
        } else if ([crashHandlingJS isEqualToString:@"alwaysAsk"]) {
            return TPACrashReportingAlwaysAsk;
        } else if ([crashHandlingJS isEqualToString:@"alwaysSend"]) {
            return TPACrashReportingAlwaysSend;
        }
    }
    return TPACrashReportingDisabled;
}

- (TPALoggingDestination)getLoggingDestination:(id)logginDestinationJS
{
    if ([logginDestinationJS respondsToSelector:@selector(isEqualToString:)]) {
        if ([logginDestinationJS isEqualToString:@"none"]) {
            return TPALoggingDestinationNone;
        } else if ([logginDestinationJS isEqualToString:@"console"]) {
            return TPALoggingDestinationConsole;
        } else if ([logginDestinationJS isEqualToString:@"remote"]) {
            return TPALoggingDestinationRemote;
        } else if ([logginDestinationJS isEqualToString:@"both"]) {
            return TPALoggingDestinationConsole|TPALoggingDestinationRemote;
        }
    }
    return TPALoggingDestinationConsole;
}

- (TPALogLevel)getLogLevel:(id)logLevelJS
{
    if ([logLevelJS respondsToSelector:@selector(isEqualToString:)]) {
        if ([logLevelJS isEqualToString:@"debug"]) {
            return TPALogLevelDebug;
        } else if ([logLevelJS isEqualToString:@"info"]) {
            return TPALogLevelInfo;
        } else if ([logLevelJS isEqualToString:@"warning"]) {
            return TPALogLevelWarning;
        } else if ([logLevelJS isEqualToString:@"error"]) {
            return TPALogLevelError;
        }
    }
    return TPALogLevelDebug;
}

- (TPAFeedbackInvocation)getFeedbackInvocation:(id)feedbackInvocationJS
{
    if ([feedbackInvocationJS respondsToSelector:@selector(isEqualToString:)]) {
        if ([feedbackInvocationJS isEqualToString:@"disabled"]) {
            return TPAFeedbackInvocationDisabled;
        } else if ([feedbackInvocationJS isEqualToString:@"enabled"]) {
            return TPAFeedbackInvocationEnabled;
        } else if ([feedbackInvocationJS isEqualToString:@"shake"]) {
            return TPAFeedbackInvocationEventShake;
        }
    }
    return TPAFeedbackInvocationDisabled;
}

- (TPAUpdateNotification)getUpdateNotification:(id)updateNotificationJS
{
    if ([updateNotificationJS respondsToSelector:@selector(isEqualToString:)]) {
        if ([updateNotificationJS isEqualToString:@"disabled"]) {
            return TPAUpdateNotificationDisabled;
        } else if ([updateNotificationJS isEqualToString:@"manually"]) {
            return TPAUpdateNotificationManually;
        } else if ([updateNotificationJS isEqualToString:@"automatic"]) {
            return TPAUpdateNotificationAutomatic;
        }
    }
    return TPAUpdateNotificationDisabled;
}

#pragma mark - Screen tracking

RCT_EXPORT_METHOD(trackScreenAppearing:(NSString *)title)
{
    [[TPA shared] trackScreenAppearing:title];
}

RCT_EXPORT_METHOD(trackScreenAppearingWithTags:(NSString *)title tags:(NSDictionary *)tags)
{
    [[TPA shared] trackScreenAppearing:title tags:tags];
}

RCT_EXPORT_METHOD(trackScreenDisappearing:(NSString *)title)
{
    [[TPA shared] trackScreenDisappearing:title];
}

RCT_EXPORT_METHOD(trackScreenDisappearingWithTags:(NSString *)title tags:(NSDictionary *)tags)
{
    [[TPA shared] trackScreenDisappearing:title tags:tags];
}

#pragma mark - Event tracking

RCT_EXPORT_METHOD(trackEvent:(NSString *)category name:(NSString *)name)
{
    [[TPA shared] trackEventWithCategory:category name:name];
}

RCT_EXPORT_METHOD(trackEventWithTags:(NSString *)category name:(NSString *)name tags:(NSDictionary *)tags)
{
    [[TPA shared] trackEventWithCategory:category name:name tags:tags];
}

#pragma mark - Duration tracking

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getNewTimingEventIdentifier)
{
    return [NSUUID UUID].UUIDString;
}

RCT_EXPORT_METHOD(startTimingEvent:(NSString *)identifier startTimestamp:(NSUInteger)startTimestamp category:(NSString *)category name:(NSString *)name)
{
    [_timingEventHandler startTimingEvent:identifier startTimestamp:startTimestamp category:category name:name];
}

RCT_EXPORT_METHOD(trackTimingEvent:(NSString *)identifier endTimestamp:(NSUInteger)endTimestamp)
{
    [_timingEventHandler trackTimingEvent:identifier endTimestamp:endTimestamp tags:nil];
}

RCT_EXPORT_METHOD(trackTimingEventWithTags:(NSString *)identifier endTimestamp:(NSUInteger)endTimestamp tags:(NSDictionary *)tags)
{
    [_timingEventHandler trackTimingEvent:identifier endTimestamp:endTimestamp tags:tags];
}

#pragma mark - Non Fatal Issues

RCT_EXPORT_METHOD(reportNonFatalIssue:(NSString *)stackTrace reason:(NSString *)reason userInfo:(NSDictionary *)userInfo)
{
    [TPANonFatalReporting reportNonFatalIssueWithReason:reason stacktrace:stackTrace userInfo:userInfo];
}

#pragma mark - Feedback

RCT_EXPORT_METHOD(startFeedback)
{
    [[TPA shared] invokeFeedback];
}

#pragma mark - Logging

RCT_EXPORT_METHOD(log:(NSString *)logLevel message:(NSString *)message)
{
    if ([logLevel isEqualToString:@"debug"]) {
        [[TPA shared] log:TPALogLevelDebug message:message];
    } else if ([logLevel isEqualToString:@"info"]) {
        [[TPA shared] log:TPALogLevelInfo message:message];
    } else if ([logLevel isEqualToString:@"warning"]) {
        [[TPA shared] log:TPALogLevelWarning message:message];
    } else if ([logLevel isEqualToString:@"error"]) {
        [[TPA shared] log:TPALogLevelError message:message];
    }
}

#pragma mark - Updates

RCT_EXPORT_METHOD(checkForUpdate)
{
    [[TPA shared] checkForUpdate];
}

@end
