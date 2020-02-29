import { system } from '@airport/di';
const landing = system('airport').lib('landing');
export const SCHEMA_BUILDER = landing.token();
export const SCHEMA_CHECKER = landing.token();
export const SCHEMA_COMPOSER = landing.token();
export const SCHEMA_INITIALIZER = landing.token();
export const SCHEMA_LOCATOR = landing.token();
export const SCHEMA_RECORDER = landing.token();
//# sourceMappingURL=tokens.js.map