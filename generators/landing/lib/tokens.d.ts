import { ApplicationInitializer } from './ApplicationInitializer';
import { ISchemaBuilder } from './builder/ISchemaBuilder';
import { IApplicationChecker } from './checker/ApplicationChecker';
import { IApplicationLocator } from './locator/ApplicationLocator';
import { IApplicationComposer } from './recorder/ApplicationComposer';
import { IApplicationRecorder } from './recorder/ApplicationRecorder';
export declare const ABSTRACT_APPLICATION_INITIALIZER: import("@airport/direction-indicator").IDependencyInjectionToken<ApplicationInitializer>;
export declare const APPLICATION_BUILDER: import("@airport/direction-indicator").IDependencyInjectionToken<ISchemaBuilder>;
export declare const APPLICATION_CHECKER: import("@airport/direction-indicator").IDependencyInjectionToken<IApplicationChecker>;
export declare const APPLICATION_COMPOSER: import("@airport/direction-indicator").IDependencyInjectionToken<IApplicationComposer>;
export declare const APPLICATION_LOCATOR: import("@airport/direction-indicator").IDependencyInjectionToken<IApplicationLocator>;
export declare const APPLICATION_RECORDER: import("@airport/direction-indicator").IDependencyInjectionToken<IApplicationRecorder>;
export declare const SQL_SCHEMA_BUILDER: import("@airport/direction-indicator").IDependencyInjectionToken<ISchemaBuilder>;
//# sourceMappingURL=tokens.d.ts.map