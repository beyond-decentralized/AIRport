import { system } from '@airport/di';
const landing = system('airport').lib('landing');
export const APPLICATION_BUILDER = landing.token('APPLICATION_BUILDER');
export const APPLICATION_CHECKER = landing.token('APPLICATION_CHECKER');
export const APPLICATION_COMPOSER = landing.token('APPLICATION_COMPOSER');
export const APPLICATION_INITIALIZER = landing.token('APPLICATION_INITIALIZER');
export const APPLICATION_LOCATOR = landing.token('APPLICATION_LOCATOR');
export const APPLICATION_RECORDER = landing.token('APPLICATION_RECORDER');
//# sourceMappingURL=tokens.js.map