import { lib } from '@airport/di';
export const holdingPattern = lib('holding-pattern');
export const ACTOR_DAO = holdingPattern.token('ACTOR_DAO');
export const OPERATION_HISTORY_DUO = holdingPattern.token('OPERATION_HISTORY_DUO');
export const RECORD_HISTORY_DUO = holdingPattern.token('RECORD_HISTORY_DUO');
export const RECORD_HISTORY_NEW_VALUE_DAO = holdingPattern.token('RECORD_HISTORY_NEW_VALUE_DAO');
export const RECORD_HISTORY_NEW_VALUE_DUO = holdingPattern.token('RECORD_HISTORY_NEW_VALUE_DUO');
export const RECORD_HISTORY_OLD_VALUE_DAO = holdingPattern.token('RECORD_HISTORY_OLD_VALUE_DAO');
export const RECORD_HISTORY_OLD_VALUE_DUO = holdingPattern.token('RECORD_HISTORY_OLD_VALUE_DUO');
export const REPOSITORY_DAO = holdingPattern.token('REPOSITORY_DAO');
export const REPOSITORY_TRANSACTION_HISTORY_DAO = holdingPattern.token('REPOSITORY_TRANSACTION_HISTORY_DAO');
export const REPOSITORY_TRANSACTION_HISTORY_DUO = holdingPattern.token('REPOSITORY_TRANSACTION_HISTORY_DUO');
export const TRANSACTION_HISTORY_DUO = holdingPattern.token('TRANSACTION_HISTORY_DUO');
//# sourceMappingURL=tokens.js.map