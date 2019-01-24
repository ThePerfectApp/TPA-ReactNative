//
//  TPANonFatalReporting.m
//  TPAThePerfectApp
//
//  Created by Niels Chr. Friis Jakobsen on 23/01/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "TPANonFatalReporting.h"
#import <ThePerfectApp/ThePerfectApp.h>

@implementation TPANonFatalReporting

int const NON_FATAL_REASON_INDEX = 2;
int const NON_FATAL_ERROR_INDEX = 3;
int const NON_FATAL_STACKTRACE_INDEX = 4;

+(void)reportNonFatalIssueWithReason:(NSString *)reason stacktrace:(NSString *)stacktrace userInfo:(NSDictionary *)userInfo
{
    SEL reportNonFatalIssue = NSSelectorFromString(@"reportNonFatalIssueWithReason:error:reactNativeStacktrace:");
    if ([[TPAManager sharedManager] respondsToSelector:reportNonFatalIssue]) {
        NSInvocation *reportNonFatalInvocation = [NSInvocation invocationWithMethodSignature:[[TPAManager sharedManager] methodSignatureForSelector:reportNonFatalIssue]];
        [reportNonFatalInvocation setSelector:reportNonFatalIssue];
        [reportNonFatalInvocation setTarget:[TPAManager sharedManager]];
        
        NSError * nonFatalError = [NSError errorWithDomain:@"React-Native Non-Fatal Issue" code:0 userInfo:userInfo];
        
        [reportNonFatalInvocation setArgument:&(reason) atIndex:NON_FATAL_REASON_INDEX];
        [reportNonFatalInvocation setArgument:&(nonFatalError) atIndex:NON_FATAL_ERROR_INDEX];
        [reportNonFatalInvocation setArgument:&(stacktrace) atIndex:NON_FATAL_STACKTRACE_INDEX];
        
        [reportNonFatalInvocation invoke];
    } else {
        NSLog(@"MISSING SELECTOR: reportNonFatalIssueWithReason:error:reactNativeStacktrace:");
    }
}

@end
