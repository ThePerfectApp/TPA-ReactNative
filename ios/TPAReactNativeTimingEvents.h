//
//  TPAReactNativeTimingEvents.h
//  TPAThePerfectApp
//
//  Created by Niels Chr. Friis Jakobsen on 25/01/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

@interface TPAReactNativeTimingEvents : NSObject
- (void)startTimingEvent:(NSString *)identifier startTimestamp:(NSUInteger)startTimestamp category:(NSString *)category name:(NSString *)name;
- (void)trackTimingEvent:(NSString *)identifier endTimestamp:(NSUInteger)endTimestamp tags:(NSDictionary *)tags;
@end
