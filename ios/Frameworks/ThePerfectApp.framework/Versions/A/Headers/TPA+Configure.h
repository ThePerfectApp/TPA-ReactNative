//
//  TPA+Main.h
//  ThePerfectApp
//
//  Created by Peder Toftegaard Olsen on 31/01/2019.
//  Copyright © 2019 The Perfect App Ltd. All rights reserved.
//

@class TPA;


/**
 * Configuring and starting TPA.
 */
@protocol TPAConfigure

/**
 * Get the one and only TPA instance.
 *
 * @return The one and only TPA.
 */
+(TPA * _Nonnull)shared;

/**
 * Starts TPA. No properties of the manager can be modified after calling this method.
 *
 * If a debugger is attached to the app, or the app is executing in the iOS simulator,
 * TPA will not start.
 *
 * @param baseUrl The base URL of the TPA server. Usually of the form https://server/.
 * @param projectUuid Project UUID as it is known to the TPA server.
 */
- (void)startWithBaseUrl:(NSString * _Nonnull)baseUrl projectUuid:(NSString * _Nonnull)projectUuid NS_SWIFT_NAME(start(baseUrl:projectUuid:));

@end
