import { system } from '@airport/di';
const movingWalkway = system('airport').lib('moving-walkway');
export const RECORD_UPDATE_STAGE_DAO = movingWalkway.token('RECORD_UPDATE_STAGE_DAO');
export const SYNCHRONIZATION_CONFLICT_DAO = movingWalkway.token('SYNCHRONIZATION_CONFLICT_DAO');
export const SYNCHRONIZATION_CONFLICT_VALUES_DAO = movingWalkway.token('SYNCHRONIZATION_CONFLICT_VALUES_DAO');
//# sourceMappingURL=tokens.js.map