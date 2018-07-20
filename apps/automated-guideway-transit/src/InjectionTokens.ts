import {
	ILoggedPackage,
	LoggedPackage
}                                 from "@airport/approach-lighting-system";
import {
	IBlacklist,
	ISyncConnectionVerifier
}                                 from "@airport/arrivals-n-departures";
import {LogLevel}                 from "@airport/runway-edge-lighting";
import {Token}                    from "typedi/Token";
import {ITuningSettings}          from "./model/TuningSettings";
import {IErrorLogger}             from "./server/common/ErrorLogger";
import {ISyncConnectionProcessor} from "./server/sync/SyncConnectionProcessor";

export const TunningSettingsToken         = new Token<ITuningSettings>();
export const ErrorLoggerToken             = new Token<IErrorLogger>();
export const SyncConnectionProcessorToken = new Token<ISyncConnectionProcessor>();
export const SyncConnectionVerifierToken  = new Token<ISyncConnectionVerifier>();
export const BlacklistToken               = new Token<IBlacklist<any>>();

export const AGTLogger: ILoggedPackage
	             = new LoggedPackage("automated-guideway-transit", LogLevel.TRACE);

// TODO: move this to the "main" file for when AGT runs as a sand-alone app
// export const AGTAppLogger: ILoggedApplication
// 	             = new LoggedApplication('SyncServer');
// AGTAppLogger.addPackage(AGTLogger);