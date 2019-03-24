import {
	ILoggedPackage,
	LoggedPackage
}                                 from '@airport/approach-lighting-system'
import {
	IBlacklist,
	ISyncConnectionVerifier
}                                 from '@airport/arrivals-n-departures'
import {diToken}                  from '@airport/di'
import {LogLevel}                 from '@airport/runway-edge-lighting'
import {ITuningSettings}          from './model/TuningSettings'
import {IErrorLogger}             from './server/common/ErrorLogger'
import {ISyncConnectionProcessor} from './server/sync/SyncConnectionProcessor'

export const TUNNING_SETTINGS          = diToken<ITuningSettings>()
export const ERROR_LOGGER              = diToken<IErrorLogger>()
export const SYNC_CONNECTION_PROCESSOR = diToken<ISyncConnectionProcessor>()
export const SYNC_CONNECTION_VERIFIER  = diToken<ISyncConnectionVerifier>()
export const BLACKLIST                 = diToken<IBlacklist<any>>()

export const AGTLogger: ILoggedPackage
	             = new LoggedPackage('automated-guideway-transit', LogLevel.TRACE)

// TODO: move this to the "main" file for when AGT runs as a sand-alone app
// export const AGTAppLogger: ILoggedApplication
// 	             = diLoggedApplication('SyncServer');
// AGTAppLogger.addPackage(AGTLogger);