//
//  TPAReactNativeTimingEvents.m
//  TPAThePerfectApp
//
//  Created by Niels Chr. Friis Jakobsen on 25/01/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "TPAReactNativeTimingEvents.h"
#import <ThePerfectApp/ThePerfectApp.h>

@interface TPATimingEventWrapper : NSObject
@property (nonatomic) id timingEvent;
@property (nonatomic) NSUInteger startTimestamp;
@end

@implementation TPATimingEventWrapper

- (instancetype)init:(id)timingEvent startTimestamp:(NSUInteger)startTimestamp
{
    self = [super init];
    if (self) {
        self.timingEvent = timingEvent;
        self.startTimestamp = startTimestamp;
    }
    return self;
}

@end

@implementation TPAReactNativeTimingEvents
{
    NSMutableDictionary<NSString *, TPATimingEventWrapper *> *_timingEvents;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        _timingEvents = [[NSMutableDictionary alloc] init];
    }
    return self;
}

- (void)startTimingEvent:(NSString *)identifier startTimestamp:(NSUInteger)startTimestamp category:(NSString *)category name:(NSString *)name
{
    id timingEvent = [[TPA shared] startTimingEventWithCategory:category name:name];
    [_timingEvents setObject:[[TPATimingEventWrapper alloc] init:timingEvent startTimestamp:startTimestamp] forKey:identifier];
}

- (void)trackTimingEvent:(NSString *)identifier endTimestamp:(NSUInteger)endTimestamp tags:(NSDictionary *)tags
{
    TPATimingEventWrapper *timingEventWrapper = [_timingEvents valueForKey:identifier];
    if (timingEventWrapper != nil) {
        [[TPA shared] trackTimingEvent:timingEventWrapper.timingEvent
                                            duration:[self getDurationFromStartTimestamp:timingEventWrapper.startTimestamp toEndTimestamp:endTimestamp] tags:tags];
    }
    [_timingEvents removeObjectForKey:identifier];
}

- (NSUInteger)getDurationFromStartTimestamp:(NSUInteger)startTimestamp toEndTimestamp:(NSUInteger)endTimestamp
{
    return startTimestamp > endTimestamp ? startTimestamp - endTimestamp : endTimestamp - startTimestamp;
}

@end
