"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const guideway = di_1.system('airport').lib('guideway');
exports.DAILY_ARCHIVE_LOG_DAO = guideway.token();
exports.TERMINAL_DAO = guideway.token();
exports.TERMINAL_REPOSITORY_DAO = guideway.token();
exports.REPOSITORY_DAO = guideway.token();
exports.SYNC_LOG_DAO = guideway.token();
exports.AGT_SHARING_MESSAGE_DAO = guideway.token();
exports.AGT_REPO_TRANS_BLOCK_DAO = guideway.token();
//# sourceMappingURL=tokens.js.map