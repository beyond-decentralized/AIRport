import {
	ILoggedPackage,
	LoggedPackage
}                                 from '@airport/approach-lighting-system'
import {
	IBlacklist,
	ISyncConnectionVerifier
}                                 from '@airport/arrivals-n-departures'
import {system}                  from '@airport/di'
import {LogLevel}                 from '@airport/runway-edge-lighting'
import {ITuningSettings}          from './model/TuningSettings'
import {IErrorLogger}             from './server/common/ErrorLogger'
import {ISyncConnectionProcessor} from './server/sync/SyncConnectionProcessor'

const automatedGuidewayTransit = system('airport').lib('automated-guideway-transit')

export const TUNNING_SETTINGS          = automatedGuidewayTransit.token<ITuningSettings>()
export const ERROR_LOGGER              = automatedGuidewayTransit.token<IErrorLogger>()
export const SYNC_CONNECTION_PROCESSOR = automatedGuidewayTransit.token<ISyncConnectionProcessor>()
export const SYNC_CONNECTION_VERIFIER  = automatedGuidewayTransit.token<ISyncConnectionVerifier>()
export const BLACKLIST                 = automatedGuidewayTransit.token<IBlacklist<any>>()

export const AGTLogger: ILoggedPackage
	             = new LoggedPackage('automated-guideway-transit', LogLevel.TRACE)

// TODO: move this to the "main" file for when AGT runs as a sand-alone app
// export const AGTAppLogger: ILoggedApplication
// 	             = diLoggedApplication('SyncServer');
// AGTAppLogger.addPackage(AGTLogger);
