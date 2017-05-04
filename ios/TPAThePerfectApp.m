
#import "TPAThePerfectApp.h"

@implementation TPAThePerfectApp

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE(TPA)


RCT_EXPORT_METHOD(tpaTestMethod:(NSString *)name)
{
    NSLog(@"Testing TPA %@", name);
}


@end
  
