//
//  TPA+Logging.h
//  ThePerfectApp
//
//  Created by Peder Toftegaard Olsen on 31/01/2019.
//  Copyright © 2019 The Perfect App Ltd. All rights reserved.
//


/**
 * Where logs should be sent.
 */
typedef NS_OPTIONS(NSUInteger, TPALoggingDestination)
{
    /// Disable logging
    TPALoggingDestinationNone = 0x00,
    /// Log to the console
    TPALoggingDestinationConsole = 1 << 0,
    /// Log to TPA
    TPALoggingDestinationRemote = 1 << 1,
};


/**
 * The log level.
 */
typedef NS_ENUM(NSUInteger, TPALogLevel)
{
    /// Debug log level
    TPALogLevelDebug = 0,
    /// Info log level
    TPALogLevelInfo = 1,
    /// Warning log level
    TPALogLevelWarning = 2,
    /// Error log level
    TPALogLevelError = 3
};


/**
 * Logging.
 */
@protocol TPALogging

/**
 * Logging destinations.
 *
 * @note Defaults to `TPALoggingDestinationConsole`, except for apps distributed via the App Store where it is `TPALoggingDestinationNone`.
 *
 * @note Only `TPALoggingDestinationNone` and `TPALoggingDestinationConsole` are valid for extensions.
 */
@property (nonatomic) TPALoggingDestination loggingDestinations;

/**
 * Lowest level to log to console.
 *
 * @note Defaults to `TPALogLevelDebug`, except for apps distributes via the App Store where it is `TPALogLevelWarning`.
 */
@property (nonatomic) TPALogLevel consoleLogLevel;

/**
 * Lowest level to log to remotely.
 *
 * @note Defaults to `TPALogLevelDebug`, except for apps distributes via the App Store where it is `TPALogLevelWarning`.
 */
@property (nonatomic) TPALogLevel remoteLogLevel;

/**
 * Log message to `loggingDestinations`.
 */
- (void)log:(TPALogLevel)logLevel message:(NSString *_Nonnull)message;

/**
 * Log message to `loggingDestinations`.
 */
- (void)log:(TPALogLevel)logLevel format:(NSString *_Nonnull)format, ... NS_FORMAT_FUNCTION(2,3);

/**
 * Log message to `loggingDestinations`.
 */
- (void)log:(TPALogLevel)logLevel format:(NSString *_Nonnull)format args:(va_list _Nonnull)args;

@end


/**
 * Logs a message to the destinations specified by `TPALogging.loggingDestinations`.
 */
extern void TPALog(TPALogLevel logLevel, NSString * _Nonnull format, ...) NS_FORMAT_FUNCTION(2,3);

/**
 * Logs a message to the destinations specified by `TPALogging.loggingDestinations`.
 */
extern void TPALogv(TPALogLevel logLevel, NSString * _Nonnull format, va_list _Nonnull args);
