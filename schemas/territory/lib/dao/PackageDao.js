"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const baseDaos_1 = require("../generated/baseDaos");
const tokens_1 = require("../tokens");
class PackageDao extends baseDaos_1.BasePackageDao {
}
exports.PackageDao = PackageDao;
di_1.DI.set(tokens_1.PACKAGE_DAO, PackageDao);
//# sourceMappingURL=PackageDao.js.map