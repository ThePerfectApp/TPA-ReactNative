//
//  TPA+NonFatal.h
//  ThePerfectApp
//
//  Created by Peder Toftegaard Olsen on 04/02/2019.
//  Copyright © 2019 The Perfect App Ltd. All rights reserved.
//

@protocol TPANonFatal

/**
 * Enable non-fatal error reporting by uploading reports to the TPA server.
 *
 * TPACrashReportingDisabled by default.
 */
@property (nonatomic, assign, getter=isNonFatalEnabled) BOOL nonFatalEnabled;

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
