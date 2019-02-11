//
//  ThePerfectApp.h
//  ThePerfectApp
//
//  Created by Julian Król on 07/10/15.
//  Copyright © 2015 The Perfect App Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "TPA+Analytics.h"
#import "TPA+Configure.h"
#import "TPA+CrashReporting.h"
#import "TPA+Debugging.h"
#import "TPA+Feedback.h"
#import "TPA+Logging.h"
#import "TPA+NonFatal.h"
#import "TPA+UpdateNotification.h"


/**
 * :nodoc:
 *
 * Project version number for ThePerfectApp.
 */
FOUNDATION_EXPORT double ThePerfectAppVersionNumber;

/**
 * :nodoc:
 *
 * Project version string for ThePerfectApp.
 */
FOUNDATION_EXPORT const unsigned char ThePerfectAppVersionString[];

/**
 * The TPA singleton is responsible for handling update notifications and crash reporting to a TPA server.
 */
@interface TPA : NSObject<TPAConfigure, TPAAnalytics, TPACrashReporting, TPADebugging, TPAFeedback, TPALogging, TPANonFatal, TPAUpdateNotification>

@end
