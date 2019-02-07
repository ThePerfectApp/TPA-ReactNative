//
//  TPA+Logging.h
//  ThePerfectApp
//
//  Created by Peder Toftegaard Olsen on 31/01/2019.
//  Copyright © 2019 The Perfect App Ltd. All rights reserved.
//


typedef NS_OPTIONS(NSUInteger, TPALoggingDestination)
{
    TPALoggingDestinationNone = 0x00,
    TPALoggingDestinationConsole = 1 << 0,
    TPALoggingDestinationRemote = 1 << 1,
};


typedef NS_ENUM(NSUInteger, TPALogLevel)
{
    TPALogLevelDebug = 0,
    TPALogLevelInfo = 1,
    TPALogLevelWarning = 2,
    TPALogLevelError = 3
};


@protocol TPALogging

/**
 * Logging destinations.
 *
 * Value cannot be changed for apps distrbuted via the App Store.
 * Only TPALoggingDestinationNone and TPALoggingDestinationConsole are valid for extensions.
 *
 * Defaults to TPALoggingDestinationConsole, except for apps distributed via the App Store where it is TPALoggingDestinationNone.
 */
@property (nonatomic) TPALoggingDestination loggingDestinations;

/**
 * Lowest level to log to console.
 *
 * Defaults to TPALogLevelDebug, except for apps distributes via the App Store where it is TPALogLevelWarning.
 */
@property (nonatomic) TPALogLevel consoleLogLevel;

/**
 * Lowest level to log to remotely.
 *
 * Defaults to TPALogLevelDebug, except for apps distributes via the App Store where it is TPALogLevelWarning.
 */
@property (nonatomic) TPALogLevel remoteLogLevel;

/**
 * Log message to loggingDestinations.
 */
- (void)log:(TPALogLevel)logLevel message:(NSString *_Nonnull)message;

/**
 * Log message to loggingDestinations.
 */
- (void)log:(TPALogLevel)logLevel format:(NSString *_Nonnull)format, ... NS_FORMAT_FUNCTION(2,3);

/**
 * Log message to loggingDestinations.
 */
- (void)log:(TPALogLevel)logLevel format:(NSString *_Nonnull)format args:(va_list _Nonnull)args;

@end


/**
 * Logs message to the destinations specified by [TPA loggingDestinations].
 */
extern void TPALog(TPALogLevel logLevel, NSString * _Nonnull format, ...) NS_FORMAT_FUNCTION(2,3);

/**
 * Logs message to the destinations specified by [TPA loggingDestinations].
 */
extern void TPALogv(TPALogLevel logLevel, NSString * _Nonnull format, va_list _Nonnull args);
