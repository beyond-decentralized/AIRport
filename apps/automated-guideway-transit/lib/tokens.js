"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const approach_lighting_system_1 = require("@airport/approach-lighting-system");
const di_1 = require("@airport/di");
const runway_edge_lighting_1 = require("@airport/runway-edge-lighting");
const automatedGuidewayTransit = di_1.system('airport').lib('automated-guideway-transit');
exports.TUNNING_SETTINGS = automatedGuidewayTransit.token();
exports.ERROR_LOGGER = automatedGuidewayTransit.token();
exports.SYNC_CONNECTION_PROCESSOR = automatedGuidewayTransit.token();
exports.SYNC_CONNECTION_VERIFIER = automatedGuidewayTransit.token();
exports.BLACKLIST = automatedGuidewayTransit.token();
exports.AGTLogger = new approach_lighting_system_1.LoggedPackage('automated-guideway-transit', runway_edge_lighting_1.LogLevel.TRACE);
// TODO: move this to the "main" file for when AGT runs as a sand-alone app
// export const AGTAppLogger: ILoggedApplication
// 	             = diLoggedApplication('SyncServer');
// AGTAppLogger.addPackage(AGTLogger);
//# sourceMappingURL=tokens.js.map