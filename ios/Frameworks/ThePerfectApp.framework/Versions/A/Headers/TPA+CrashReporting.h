//
//  TPA+CrashReporting.h
//  ThePerfectApp
//
//  Created by Peder Toftegaard Olsen on 31/01/2019.
//  Copyright © 2019 The Perfect App Ltd. All rights reserved.
//

typedef NS_ENUM(NSUInteger, TPACrashReporting)
{
    /** Crash reporting is disabled. */
    TPACrashReportingDisabled,
    /** User is asked before sending a crash report. */
    TPACrashReportingAlwaysAsk,
    /** Crash reports will be sent without asking the user. */
    TPACrashReportingAlwaysSend,
};

@protocol TPACrashReporting

/**
 * Enable crash reporting by uploading crash reports to the TPAW server on next restart of the app after a crash.
 *
 * Only TPACrashReportingDisabled and TPACrashReportingAlwaysSend are valid for extensions.
 *
 * TPACrashReportingDisabled by default.
 */
@property (nonatomic, assign) TPACrashReporting crashReporting;

/**
 * Trap fatal signals via a Mach exception server.
 *
 * Disabled by default.
 */
@property (nonatomic, assign, getter=isMachExceptionHandlerEnabled) BOOL enableMachExceptionHandler;

/**
 * Report a non-fatal issue.
 *
 * Stacktrace will be generated automatically.
 *
 * This feature requires that analytics is enabled (and therefore does not work in iOS extensions).
 */
- (void)reportNonFatalIssueWithReason:(NSString * _Nullable)reason error:(NSError *_Nullable)error;
- (void)reportNonFatalIssueWithReason:(NSString * _Nullable)reason;
- (void)reportNonFatalIssueWithError:(NSError *_Nullable)error NS_SWIFT_NAME(reportNonFatalIssue(withError:));
- (void)reportNonFatalIssue;

@end
