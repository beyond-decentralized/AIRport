"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const approach_lighting_system_1 = require("@airport/approach-lighting-system");
const runway_edge_lighting_1 = require("@airport/runway-edge-lighting");
exports.TerminalLogger = new approach_lighting_system_1.LoggedPackage('terminal', runway_edge_lighting_1.LogLevel.TRACE);
exports.TerminalAppLogger = new approach_lighting_system_1.LoggedApplication('Airport');
exports.TerminalAppLogger.addPackage(exports.TerminalLogger);
//# sourceMappingURL=Constants.js.map