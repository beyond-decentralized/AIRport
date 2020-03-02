"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const movingWalkway = di_1.system('airport').lib('moving-walkway');
exports.MISSING_RECORD_DAO = movingWalkway.token();
exports.MISSING_RECORD_REPO_TRANS_BLOCK_DAO = movingWalkway.token();
exports.RECORD_UPDATE_STAGE_DAO = movingWalkway.token();
exports.REPO_TRANS_BLOCK_DAO = movingWalkway.token();
exports.REPO_TRANS_BLOCK_DUO = movingWalkway.token();
exports.REPO_TRANS_HISTORY_UPDATE_STAGE_DAO = movingWalkway.token();
exports.REPO_TRANS_BLOCK_RESPONSE_STAGE_DAO = movingWalkway.token();
exports.SHARING_MESSAGE_DAO = movingWalkway.token();
exports.SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO = movingWalkway.token();
// export const SharingMessageResponseStageDaoToken
// 	= movingWalkway.token<ISharingMessageResponseStageDao>();
exports.REPO_TRANS_BLOCK_SCHEMA_TO_CHANGE_DAO = movingWalkway.token();
exports.SHARING_NODE_DAO = movingWalkway.token();
exports.SHARING_NODE_TERMINAL_DAO = movingWalkway.token();
exports.SHARING_NODE_REPOSITORY_DAO = movingWalkway.token();
exports.SHARING_NODE_REPO_TRANS_BLOCK_DAO = movingWalkway.token();
exports.SHARING_NODE_REPO_TRANS_BLOCK_STAGE_DAO = movingWalkway.token();
exports.SYNC_CONFLICT_DAO = movingWalkway.token();
exports.SYNC_CONFLICT_PENDING_NOTIFICATION_DAO = movingWalkway.token();
exports.SYNC_CONFLICT_VALUES_DAO = movingWalkway.token();
//# sourceMappingURL=tokens.js.map