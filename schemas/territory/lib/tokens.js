"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const territory = di_1.system('airport').lib('territory');
exports.APPLICATION_DAO = territory.token();
exports.APPLICATION_PACKAGE_DAO = territory.token();
exports.DOMAIN_DAO = territory.token();
exports.PACKAGE_DAO = territory.token();
exports.PACKAGE_UNIT_DAO = territory.token();
//# sourceMappingURL=tokens.js.map