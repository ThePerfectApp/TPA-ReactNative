
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

@interface TPAThePerfectApp : NSObject <RCTBridgeModule>

//
//// Screen tracking
//- (void)trackScreenAppearing:(NSString *)title;
//- (void)trackScreenAppearingWithTags:(NSString *)screenTitle tags:(NSDictionary *)tags;
//
//- (void)trackScreenDisappearing:(NSString *)title;
//- (void)trackScreenDisappearingWithTags:(NSString *)screenTitle tags:(NSDictionary *)tags;
//
//// Event tracking
//- (void)trackEvent:(NSString *)category name:(NSString *)name;
//- (void)trackEventWithTags:(NSString *)category name:(NSString *)name tags:(NSDictionary *)tags;
//


@end
  
