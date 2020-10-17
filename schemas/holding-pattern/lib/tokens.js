import { system } from '@airport/di';
const groundControl = system('airport').lib('holding-pattern');
export const ACTOR_DAO = groundControl.token();
export const OPER_HISTORY_DUO = groundControl.token();
export const REC_HISTORY_DUO = groundControl.token();
export const REC_HIST_NEW_VALUE_DAO = groundControl.token();
export const REC_HIST_NEW_VALUE_DUO = groundControl.token();
export const REC_HIST_OLD_VALUE_DAO = groundControl.token();
export const REC_HIST_OLD_VALUE_DUO = groundControl.token();
export const REPO_ACTOR_DAO = groundControl.token();
export const REPOSITORY_DAO = groundControl.token();
export const REPO_TRANS_HISTORY_DAO = groundControl.token();
export const REPO_TRANS_HISTORY_DUO = groundControl.token();
export const TRANS_HISTORY_DUO = groundControl.token();
//# sourceMappingURL=tokens.js.map