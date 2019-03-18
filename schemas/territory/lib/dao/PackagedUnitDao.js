"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const generated_1 = require("../generated/generated");
const diTokens_1 = require("../diTokens");
class PackagedUnitDao extends generated_1.BasePackagedUnitDao {
}
exports.PackagedUnitDao = PackagedUnitDao;
di_1.DI.set(diTokens_1.PACKAGE_UNIT_DAO, PackagedUnitDao);
//# sourceMappingURL=PackagedUnitDao.js.map