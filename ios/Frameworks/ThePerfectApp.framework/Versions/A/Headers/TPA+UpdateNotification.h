//
//  TPA+UpdateNotification.h
//  ThePerfectApp
//
//  Created by Peder Toftegaard Olsen on 31/01/2019.
//  Copyright © 2019 The Perfect App Ltd. All rights reserved.
//


/**
 * How to handle update notifications.
 */
typedef NS_ENUM(NSUInteger, TPAUpdateNotification)
{
    /** Update Notifications are disabled. */
    TPAUpdateNotificationDisabled = 0,
    /** Check is made when app enters foreground. Also enabled -[TPA checkForUpdate]. */
    TPAUpdateNotificationAutomatic = 1 << 0,
    /** Check is made by calling -[TPA checkForUpdate]. */
    TPAUpdateNotificationManually = 1 << 1,
};


/**
 * Notify users about new app release.
 */
@protocol TPAUpdateNotification

/**
 * Enable update notifications by polling the TPA backend.
 *
 * Cannot be enabled for apps distributed via the App Store.
 * Cannot be enabled for extensions.
 *
 * @note `TPAUpdateNotificationDisabled` by default.
 */
@property (nonatomic, readwrite) TPAUpdateNotification updateNotification;

/**
 * Manually check for update. Requires update notifications to not be disabled.
 */
- (void)checkForUpdate;

@end
