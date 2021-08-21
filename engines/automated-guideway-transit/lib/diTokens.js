"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const approach_lighting_system_1 = require("@airport/approach-lighting-system");
const di_1 = require("@airport/di");
const runway_edge_lighting_1 = require("@airport/runway-edge-lighting");
exports.TUNNING_SETTINGS = di_1.diToken();
exports.ERROR_LOGGER = di_1.diToken();
exports.SYNC_CONNECTION_PROCESSOR = di_1.diToken();
exports.SYNC_CONNECTION_VERIFIER = di_1.diToken();
exports.BLACKLIST = di_1.diToken();
exports.AGTLogger = new approach_lighting_system_1.LoggedPackage('automated-guideway-transit', runway_edge_lighting_1.LogLevel.TRACE);
// TODO: move this to the "main" file for when AGT runs as a sand-alone app
// export const AGTAppLogger: ILoggedApplication
// 	             = diLoggedApplication('SyncServer');
// AGTAppLogger.addPackage(AGTLogger);
//# sourceMappingURL=diTokens.js.map