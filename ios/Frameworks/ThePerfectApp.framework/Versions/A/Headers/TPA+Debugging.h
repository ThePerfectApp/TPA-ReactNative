//
//  TPA+Debugging.h
//  ThePerfectApp
//
//  Created by Peder Toftegaard Olsen on 31/01/2019.
//  Copyright © 2019 The Perfect App Ltd. All rights reserved.
//

/**
 * Debugging TPA SDK.
 */
@protocol TPADebugging

/**
 * Enable TPA debug logging. Will output extra information about the TPA library to the destinations specified in loggingDestinations.
 * Cannot be enabled for apps distributed via the App Store.
 *
 * @note Disabled by default.
 */
@property (nonatomic, readwrite, getter = isTpaDebugLoggingEnabled, setter=setTpaDebugLoggingEnabled:) BOOL tpaDebugLoggingEnabled;

@end
