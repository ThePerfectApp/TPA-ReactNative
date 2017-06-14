
#import "TPAThePerfectApp.h"
#import <ThePerfectApp/ThePerfectApp.h>

@implementation TPAThePerfectApp

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE(TPAThePerfectApp)

// Screen tracking

RCT_EXPORT_METHOD(trackScreenAppearing:(NSString *)title)
{
    [[TPAManager sharedManager] trackScreenAppearing:title];
}

RCT_EXPORT_METHOD(trackScreenAppearingWithTags:(NSString *)title tags:(NSDictionary *)tags)
{
    [[TPAManager sharedManager] trackScreenAppearing:title tags:tags];
}

RCT_EXPORT_METHOD(trackScreenDisappearing:(NSString *)title)
{
    [[TPAManager sharedManager] trackScreenDisappearing:title];
}

RCT_EXPORT_METHOD(trackScreenDisappearingWithTags:(NSString *)title tags:(NSDictionary *)tags)
{
    [[TPAManager sharedManager] trackScreenDisappearing:title tags:tags];
}

// Event tracking

RCT_EXPORT_METHOD(trackEvent:(NSString *)category name:(NSString *)name)
{
    [[TPAManager sharedManager] trackEventWithCategory:category name:name];
}

RCT_EXPORT_METHOD(trackEventWithTags:(NSString *)category name:(NSString *)name tags:(NSDictionary *)tags)
{
    [[TPAManager sharedManager] trackEventWithCategory:category name:name tags:tags];
}

// Duration tracking

RCT_EXPORT_METHOD(trackTimingEvent:(NSString *)category name:(NSString *)name duration:(NSUInteger)duration) {
    
    [self trackTimingEventWithTags:category name:name duration:duration tags:nil];
}

RCT_EXPORT_METHOD(trackTimingEventWithTags:(NSString *)category name:(NSString *)name duration:(NSUInteger)duration tags:(NSDictionary *)tags) {
    
    id timingEvent = [[TPAManager sharedManager] startTimingEventWithCategory:category name:name];
    [[TPAManager sharedManager] trackTimingEvent:timingEvent duration:duration tags:tags];
}

@end
  
