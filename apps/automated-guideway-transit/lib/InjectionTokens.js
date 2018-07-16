"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const approach_lighting_system_1 = require("@airport/approach-lighting-system");
const runway_edge_lighting_1 = require("@airport/runway-edge-lighting");
const Token_1 = require("typedi/Token");
exports.TunningSettingsToken = new Token_1.Token();
exports.ErrorLoggerToken = new Token_1.Token();
exports.SyncConnectionProcessorToken = new Token_1.Token();
exports.SyncConnectionVerifierToken = new Token_1.Token();
exports.BlacklistToken = new Token_1.Token();
exports.AGTLogger = new approach_lighting_system_1.LoggedPackage("automated-guideway-transit", runway_edge_lighting_1.LogLevel.TRACE);
// TODO: move this to the "main" file for when AGT runs as a sand-alone app
// export const AGTAppLogger: ILoggedApplication
// 	             = new LoggedApplication('SyncServer');
// AGTAppLogger.addPackage(AGTLogger);
//# sourceMappingURL=InjectionTokens.js.map