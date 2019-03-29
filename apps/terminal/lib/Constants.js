"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const approach_lighting_system_1 = require("@airport/approach-lighting-system");
const runway_edge_lighting_1 = require("@airport/runway-edge-lighting");
exports.TERMINAL_LOG = new approach_lighting_system_1.LoggedPackage('terminal', runway_edge_lighting_1.LogLevel.TRACE);
exports.TERMINAL_APP_LOG = new approach_lighting_system_1.LoggedApplication('Airport');
exports.TERMINAL_APP_LOG.addPackage(exports.TERMINAL_LOG);
//# sourceMappingURL=Constants.js.map