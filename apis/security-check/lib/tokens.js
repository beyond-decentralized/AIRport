import { system } from '@airport/di';
const securityCheck = system('airport').lib('security-check');
export const API_REGISTRY = securityCheck.token('IApiRegistry');
export const API_VALIDATOR = securityCheck.token('IApiValidator');
//# sourceMappingURL=tokens.js.map