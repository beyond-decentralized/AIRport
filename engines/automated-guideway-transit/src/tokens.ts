import {
	ILoggedPackage,
	LoggedPackage
}                                 from '@airport/approach-lighting-system'
import {
	IBlacklist,
	ISyncConnectionVerifier
}                                 from '@airport/arrivals-n-departures'
import {lib}                  from '@airport/di'
import {LogLevel}                 from '@airport/runway-edge-lighting'
import {ITuningSettings}          from './model/TuningSettings'
import {IErrorLogger}             from './server/common/ErrorLogger'
import {ISyncConnectionProcessor} from './server/sync/SyncConnectionProcessor'

const automatedGuidewayTransit = lib('automated-guideway-transit')

export const TUNNING_SETTINGS          = automatedGuidewayTransit.token<ITuningSettings>('TUNNING_SETTINGS')
export const ERROR_LOGGER              = automatedGuidewayTransit.token<IErrorLogger>('ERROR_LOGGER')
export const SYNC_CONNECTION_PROCESSOR = automatedGuidewayTransit.token<ISyncConnectionProcessor>('SYNC_CONNECTION_PROCESSOR')
export const SYNC_CONNECTION_VERIFIER  = automatedGuidewayTransit.token<ISyncConnectionVerifier>('SYNC_CONNECTION_VERIFIER')
export const BLACKLIST                 = automatedGuidewayTransit.token<IBlacklist<any>>('BLACKLIST')

export const AGTLogger: ILoggedPackage
	             = new LoggedPackage('automated-guideway-transit', LogLevel.TRACE)

// TODO: move this to the "main" file for when AGT runs as a sand-alone app
// export const AGTAppLogger: ILoggedApplication
// 	             = diLoggedApplication('SyncServer');
// AGTAppLogger.addPackage(AGTLogger);
