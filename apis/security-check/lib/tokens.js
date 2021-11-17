import { lib } from '@airport/di';
const checkIn = lib('security-check');
export const APPLICATION_INITIALIZER = checkIn.token('IApplicationInitializer');
export const LOCAL_API_SERVER = checkIn.token('ILocalAPIServer');
//# sourceMappingURL=tokens.js.map