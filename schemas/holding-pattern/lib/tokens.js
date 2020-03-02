"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const groundControl = di_1.system('airport').lib('holding-pattern');
exports.ACTOR_DAO = groundControl.token();
exports.OPER_HISTORY_DUO = groundControl.token();
exports.REC_HISTORY_DUO = groundControl.token();
exports.REC_HIST_NEW_VALUE_DAO = groundControl.token();
exports.REC_HIST_NEW_VALUE_DUO = groundControl.token();
exports.REC_HIST_OLD_VALUE_DAO = groundControl.token();
exports.REC_HIST_OLD_VALUE_DUO = groundControl.token();
exports.REPO_ACTOR_DAO = groundControl.token();
exports.REPOSITORY_DAO = groundControl.token();
exports.REPO_TRANS_HISTORY_DAO = groundControl.token();
exports.REPO_TRANS_HISTORY_DUO = groundControl.token();
exports.TRANS_HISTORY_DUO = groundControl.token();
//# sourceMappingURL=tokens.js.map