import { system } from '@airport/di';
const landing = system('airport').lib('landing');
export const APPLICATION_BUILDER = landing.token('IApplicationBuilder');
export const APPLICATION_CHECKER = landing.token('IApplicationChecker');
export const APPLICATION_COMPOSER = landing.token('IApplicationComposer');
export const APPLICATION_INITIALIZER = landing.token('IApplicationInitializer');
export const APPLICATION_LOCATOR = landing.token('IApplicationLocator');
export const APPLICATION_RECORDER = landing.token('IApplicationRecorder');
//# sourceMappingURL=tokens.js.map