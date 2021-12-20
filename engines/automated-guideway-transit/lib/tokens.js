import { LoggedPackage } from '@airport/approach-lighting-system';
import { lib } from '@airport/di';
import { LogLevel } from '@airport/runway-edge-lighting';
const automatedGuidewayTransit = lib('automated-guideway-transit');
export const TUNNING_SETTINGS = automatedGuidewayTransit.token('TUNNING_SETTINGS');
export const ERROR_LOGGER = automatedGuidewayTransit.token('ERROR_LOGGER');
export const SYNC_CONNECTION_PROCESSOR = automatedGuidewayTransit.token('SYNC_CONNECTION_PROCESSOR');
export const SYNC_CONNECTION_VERIFIER = automatedGuidewayTransit.token('SYNC_CONNECTION_VERIFIER');
export const BLACKLIST = automatedGuidewayTransit.token('BLACKLIST');
export const AGTLogger = new LoggedPackage('automated-guideway-transit', LogLevel.TRACE);
// TODO: move this to the "main" file for when AGT runs as a sand-alone app
// export const AGTAppLogger: ILoggedApplication
// 	             = diLoggedApplication('SyncServer');
// AGTAppLogger.addPackage(AGTLogger);
//# sourceMappingURL=tokens.js.map