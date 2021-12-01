import { IApplicationBuilder } from './builder/IApplicationBuilder';
import { IApplicationChecker } from './checker/ApplicationChecker';
import { IApplicationLocator } from './locator/ApplicationLocator';
import { IApplicationComposer } from './recorder/ApplicationComposer';
import { IApplicationRecorder } from './recorder/ApplicationRecorder';
import { IApplicationInitializer } from './ApplicationInitializer';
export declare const APPLICATION_BUILDER: import("@airport/di").IDiToken<IApplicationBuilder>;
export declare const APPLICATION_CHECKER: import("@airport/di").IDiToken<IApplicationChecker>;
export declare const APPLICATION_COMPOSER: import("@airport/di").IDiToken<IApplicationComposer>;
export declare const APPLICATION_INITIALIZER: import("@airport/di").IDiToken<IApplicationInitializer>;
export declare const APPLICATION_LOCATOR: import("@airport/di").IDiToken<IApplicationLocator>;
export declare const APPLICATION_RECORDER: import("@airport/di").IDiToken<IApplicationRecorder>;
//# sourceMappingURL=tokens.d.ts.map