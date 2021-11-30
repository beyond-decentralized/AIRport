import { system } from '@airport/di';
export const holdingPattern = system('airport')
    .lib('holding-pattern');
export const ACTOR_DAO = holdingPattern.token('IActorDao');
export const OPER_HISTORY_DUO = holdingPattern.token('IOperationHistoryDuo');
export const REC_HISTORY_DUO = holdingPattern.token('IRecordHistoryDuo');
export const REC_HIST_NEW_VALUE_DAO = holdingPattern.token('IRecordHistoryNewValueDao');
export const REC_HIST_NEW_VALUE_DUO = holdingPattern.token('IRecordHistoryNewValueDuo');
export const REC_HIST_OLD_VALUE_DAO = holdingPattern.token('IRecordHistoryOldValueDao');
export const REC_HIST_OLD_VALUE_DUO = holdingPattern.token('IRecordHistoryOldValueDuo');
export const REPOSITORY_DAO = holdingPattern.token('IRepositoryDao');
export const REPO_TRANS_HISTORY_DAO = holdingPattern.token('IRepositoryTransactionHistoryDao');
export const REPO_TRANS_HISTORY_DUO = holdingPattern.token('IRepositoryTransactionHistoryDuo');
export const TRANS_HISTORY_DUO = holdingPattern.token('ITransactionHistoryDuo');
//# sourceMappingURL=tokens.js.map