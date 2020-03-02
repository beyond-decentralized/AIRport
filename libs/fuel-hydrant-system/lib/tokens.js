"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const fuelHydrantSystem = di_1.system('airport').lib('fuel-hydrant-system');
exports.ACTIVE_QUERIES = fuelHydrantSystem.token();
exports.ID_GENERATOR = fuelHydrantSystem.token();
//# sourceMappingURL=tokens.js.map