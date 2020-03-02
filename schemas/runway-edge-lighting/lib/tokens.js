"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const runwayEdgeLighting = di_1.system('airport').lib('runway-edge-lighting');
exports.LOG_ENTRY_DAO = runwayEdgeLighting.token();
exports.LOG_ENTRY_TYPE_DAO = runwayEdgeLighting.token();
exports.LOG_ENTRY_VALUE_DAO = runwayEdgeLighting.token();
//# sourceMappingURL=tokens.js.map