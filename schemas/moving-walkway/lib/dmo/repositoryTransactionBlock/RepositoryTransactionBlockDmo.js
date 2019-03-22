"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class RepositoryTransactionBlockDmo extends generated_1.BaseRepositoryTransactionBlockDmo {
}
exports.RepositoryTransactionBlockDmo = RepositoryTransactionBlockDmo;
di_1.DI.set(diTokens_1.REPO_TRANS_BLOCK_DMO, RepositoryTransactionBlockDmo);
//# sourceMappingURL=RepositoryTransactionBlockDmo.js.map