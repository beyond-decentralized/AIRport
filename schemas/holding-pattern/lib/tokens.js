import { system } from '@airport/di';
export const holdingPattern = system('airport')
    .lib('holding-pattern');
export const ACTOR_DAO = holdingPattern.token();
export const OPER_HISTORY_DUO = holdingPattern.token();
export const REC_HISTORY_DUO = holdingPattern.token();
export const REC_HIST_NEW_VALUE_DAO = holdingPattern.token();
export const REC_HIST_NEW_VALUE_DUO = holdingPattern.token();
export const REC_HIST_OLD_VALUE_DAO = holdingPattern.token();
export const REC_HIST_OLD_VALUE_DUO = holdingPattern.token();
export const REPO_ACTOR_DAO = holdingPattern.token();
export const REPOSITORY_DAO = holdingPattern.token();
export const REPO_TRANS_HISTORY_DAO = holdingPattern.token();
export const REPO_TRANS_HISTORY_DUO = holdingPattern.token();
export const TRANS_HISTORY_DUO = holdingPattern.token();
//# sourceMappingURL=tokens.js.map