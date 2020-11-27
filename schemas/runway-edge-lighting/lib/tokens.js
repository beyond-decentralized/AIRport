import { system } from '@airport/di';
const runwayEdgeLighting = system('airport').lib('runway-edge-lighting');
export const LOG_ENTRY_DAO = runwayEdgeLighting.token('ILogEntryDao');
export const LOG_ENTRY_TYPE_DAO = runwayEdgeLighting.token('ILogEntryTypeDao');
export const LOG_ENTRY_VALUE_DAO = runwayEdgeLighting.token('ILogEntryValueDao');
//# sourceMappingURL=tokens.js.map