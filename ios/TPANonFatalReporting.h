//
//  TPANonFatalReporting.h
//  TPAThePerfectApp
//
//  Created by Niels Chr. Friis Jakobsen on 23/01/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

@interface TPANonFatalReporting : NSObject
+ (void)reportNonFatalIssueWithReason:(NSString *)reason stacktrace:(NSString *)stacktrace userInfo:(NSDictionary *)userInfo;
@end
