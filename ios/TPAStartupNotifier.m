//
//  TPAStartupNotifier.m
//  TPAThePerfectApp
//
//  Created by Niels Chr. Friis Jakobsen on 11/02/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "TPAStartupNotifier.h"
#import <ThePerfectApp/ThePerfectApp.h>

@implementation TPAStartupNotifier

int const NOTIFICATION_INDEX = 2;

+ (void)ensureStartup
{
    if ([UIApplication sharedApplication].applicationState != UIApplicationStateActive) {
        return; // Only perform this if application is actually active
    }
    
    SEL applicationDidBecomeActive = NSSelectorFromString(@"applicationDidBecomeActive:");
    if ([[TPA shared] respondsToSelector:applicationDidBecomeActive]) {
        NSInvocation *applicationDidBecomeActiveInvocation = [NSInvocation invocationWithMethodSignature:[[TPA shared] methodSignatureForSelector:applicationDidBecomeActive]];
        [applicationDidBecomeActiveInvocation setSelector:applicationDidBecomeActive];
        [applicationDidBecomeActiveInvocation setTarget:[TPA shared]];
        
        NSNotification *emptyNotification = [[NSNotification alloc] initWithName:UIApplicationDidBecomeActiveNotification object:nil userInfo:nil];
        
        [applicationDidBecomeActiveInvocation setArgument:&(emptyNotification) atIndex:NOTIFICATION_INDEX];
        
        [applicationDidBecomeActiveInvocation invoke];
    }
}

@end
