"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const generated_1 = require("../generated/generated");
const InjectionTokens_1 = require("../InjectionTokens");
class PackagedUnitDao extends generated_1.BasePackagedUnitDao {
}
exports.PackagedUnitDao = PackagedUnitDao;
di_1.DI.set(InjectionTokens_1.PACKAGE_UNIT_DAO, PackagedUnitDao);
//# sourceMappingURL=PackagedUnitDao.js.map