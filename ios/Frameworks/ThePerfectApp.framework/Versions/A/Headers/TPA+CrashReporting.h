//
//  TPA+CrashReporting.h
//  ThePerfectApp
//
//  Created by Peder Toftegaard Olsen on 31/01/2019.
//  Copyright © 2019 The Perfect App Ltd. All rights reserved.
//


/**
 * How to handle crash reporting within the app.
 */
typedef NS_ENUM(NSUInteger, TPACrashReporting)
{
    /** Crash reporting is disabled. */
    TPACrashReportingDisabled,
    /** User is asked before sending a crash report. */
    TPACrashReportingAlwaysAsk,
    /** Crash reports will be sent without asking the user. */
    TPACrashReportingAlwaysSend,
};


/**
 * Reporting crashes.
 */
@protocol TPACrashReporting

/**
 * Enable crash reporting by uploading crash reports to the TPAW server on next restart of the app after a crash.
 *
 * Only TPACrashReportingDisabled and TPACrashReportingAlwaysSend are valid for extensions.
 *
 * @note `TPACrashReportingDisabled` by default.
 */
@property (nonatomic, assign) TPACrashReporting crashReporting;

/**
 * Trap fatal signals via a Mach exception server.
 *
 * @note Disabled by default.
 */
@property (nonatomic, assign, getter=isMachExceptionHandlerEnabled) BOOL enableMachExceptionHandler;

@end
