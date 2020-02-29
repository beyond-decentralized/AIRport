import { LoggedPackage } from '@airport/approach-lighting-system';
import { system } from '@airport/di';
import { LogLevel } from '@airport/runway-edge-lighting';
const automatedGuidewayTransit = system('airport').lib('automated-guideway-transit');
export const TUNNING_SETTINGS = automatedGuidewayTransit.token();
export const ERROR_LOGGER = automatedGuidewayTransit.token();
export const SYNC_CONNECTION_PROCESSOR = automatedGuidewayTransit.token();
export const SYNC_CONNECTION_VERIFIER = automatedGuidewayTransit.token();
export const BLACKLIST = automatedGuidewayTransit.token();
export const AGTLogger = new LoggedPackage('automated-guideway-transit', LogLevel.TRACE);
// TODO: move this to the "main" file for when AGT runs as a sand-alone app
// export const AGTAppLogger: ILoggedApplication
// 	             = diLoggedApplication('SyncServer');
// AGTAppLogger.addPackage(AGTLogger);
//# sourceMappingURL=tokens.js.map