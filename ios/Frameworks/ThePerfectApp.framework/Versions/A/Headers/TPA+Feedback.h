//
//  TPA+Feedback.h
//  ThePerfectApp
//
//  Created by Peder Toftegaard Olsen on 31/01/2019.
//  Copyright © 2019 The Perfect App Ltd. All rights reserved.
//


/**
 * Which feedback options to enable.
 */
typedef NS_ENUM(NSUInteger, TPAFeedbackInvocation)
{
    TPAFeedbackInvocationDisabled = 0,
    TPAFeedbackInvocationEnabled = 1 << 0,
    TPAFeedbackInvocationEventShake = TPAFeedbackInvocationEnabled | 1 << 1,
};


/**
 * User feedback.
 */
@protocol TPAFeedback

/**
 *
 * @note `TPAFeedbackInvocationDisabled` by default.
 */
@property (nonatomic, assign) TPAFeedbackInvocation feedbackInvocation;

/**
 * Programmatically invoke the feedback UI.
 */
- (void)invokeFeedback;

@end
