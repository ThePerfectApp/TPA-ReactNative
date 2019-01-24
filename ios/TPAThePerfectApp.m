
#import "TPAThePerfectApp.h"
#import <ThePerfectApp/ThePerfectApp.h>
#import "TPANonFatalReporting.h"

@implementation TPAThePerfectApp

NSString * const kCrashHandlingJSKey = @"crashHandling";
NSString * const kLogTypeJSKey = @"logType";
NSString * const kAnalyticsEnabledJSKey = @"isAnalyticsEnabled";
NSString * const kSessionRecordingJSKey = @"isSessionRecordingEnabled";
NSString * const kFeedbackInvocationJSKey = @"feedbackInvocation";
NSString * const kTpaDebugLoggingJSKey = @"tpaDebugLog";

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE(TPAThePerfectApp)

// Configuration

RCT_EXPORT_METHOD(initialize:(NSString *)url projectUuid:(NSString *)projectUuid configuration:(NSDictionary *)configuration)
{
    id crashHandlingJS = [configuration objectForKey:kCrashHandlingJSKey];
    if (crashHandlingJS != nil) {
        [TPAManager sharedManager].crashReporting = [self getCrashHandling:crashHandlingJS];
    }
    
    id loggingDestinationJS = [configuration objectForKey:kLogTypeJSKey];
    if (loggingDestinationJS != nil) {
        [TPAManager sharedManager].loggingDestinations = [self getLoggingDestination:loggingDestinationJS];
    }
    
    id analyticsEnabledJS = [configuration objectForKey:kAnalyticsEnabledJSKey];
    if (analyticsEnabledJS != nil) {
        [TPAManager sharedManager].analyticsEnabled = (BOOL)analyticsEnabledJS;
    }
    
    id sessionRecordingEnabledJS = [configuration objectForKey:kSessionRecordingJSKey];
    if (sessionRecordingEnabledJS != nil) {
        [TPAManager sharedManager].sessionRecordingEnabled = (BOOL)sessionRecordingEnabledJS;
    }
    
    id feedbackInvocationJS = [configuration objectForKey:kFeedbackInvocationJSKey];
    if (feedbackInvocationJS != nil) {
        [TPAManager sharedManager].feedbackInvocation = [self getFeedbackInvocation:feedbackInvocationJS];
    }
    
    id debugLoggingEnabled = [configuration objectForKey:kTpaDebugLoggingJSKey];
    if (debugLoggingEnabled != nil) {
        [TPAManager sharedManager].debugLoggingEnabled = (BOOL)debugLoggingEnabled;
    }
    
    [[TPAManager sharedManager] startManagerWithBaseUrl:url projectUuid:projectUuid];
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
    return TPALoggingDestinationNone;
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

// Screen tracking

RCT_EXPORT_METHOD(trackScreenAppearing:(NSString *)title)
{
    [[TPAManager sharedManager] trackScreenAppearing:title];
}

RCT_EXPORT_METHOD(trackScreenAppearingWithTags:(NSString *)title tags:(NSDictionary *)tags)
{
    [[TPAManager sharedManager] trackScreenAppearing:title tags:tags];
}

RCT_EXPORT_METHOD(trackScreenDisappearing:(NSString *)title)
{
    [[TPAManager sharedManager] trackScreenDisappearing:title];
}

RCT_EXPORT_METHOD(trackScreenDisappearingWithTags:(NSString *)title tags:(NSDictionary *)tags)
{
    [[TPAManager sharedManager] trackScreenDisappearing:title tags:tags];
}

// Event tracking

RCT_EXPORT_METHOD(trackEvent:(NSString *)category name:(NSString *)name)
{
    [[TPAManager sharedManager] trackEventWithCategory:category name:name];
}

RCT_EXPORT_METHOD(trackEventWithTags:(NSString *)category name:(NSString *)name tags:(NSDictionary *)tags)
{
    [[TPAManager sharedManager] trackEventWithCategory:category name:name tags:tags];
}

// Duration tracking

RCT_EXPORT_METHOD(trackTimingEvent:(NSString *)category name:(NSString *)name duration:(NSUInteger)duration)
{
    [self trackTimingEventWithTags:category name:name duration:duration tags:nil];
}

RCT_EXPORT_METHOD(trackTimingEventWithTags:(NSString *)category name:(NSString *)name duration:(NSUInteger)duration tags:(NSDictionary *)tags)
{
    id timingEvent = [[TPAManager sharedManager] startTimingEventWithCategory:category name:name];
    [[TPAManager sharedManager] trackTimingEvent:timingEvent duration:duration tags:tags];
}

// Non Fatal Issues

RCT_EXPORT_METHOD(reportNonFatalIssue:(NSString *)stackTrace reason:(NSString *)reason userInfo:(NSDictionary *)userInfo)
{
    [TPANonFatalReporting reportNonFatalIssueWithReason:reason stacktrace:stackTrace userInfo:userInfo];
}

// Logging

RCT_EXPORT_METHOD(logDebug:(NSString *)message)
{
    [[TPAManager sharedManager] logMessage:message];
}


@end
