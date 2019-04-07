"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class RepositoryTransactionBlockDuo extends generated_1.BaseRepositoryTransactionBlockDuo {
}
exports.RepositoryTransactionBlockDuo = RepositoryTransactionBlockDuo;
di_1.DI.set(diTokens_1.REPO_TRANS_BLOCK_DUO, RepositoryTransactionBlockDuo);
//# sourceMappingURL=RepositoryTransactionBlockDuo.js.map