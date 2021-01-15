import { system } from '@airport/di';
const hwFlow = system('airport').lib('hw-flow');
export const QUERY_WEB_SERVICE = hwFlow.token('IQueryWebService');
export const QUERY_VALIDATOR = hwFlow.token('IQueryValidator');
//# sourceMappingURL=tokens.js.map