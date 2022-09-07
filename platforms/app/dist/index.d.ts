export * from '@airbridge/validate';
export * from '@airport/airspace';
import { IApplicationLoader, JsonApplicationWithLastIds, LastIds } from '@airport/apron';
export * from '@airport/apron';
export * from '@airport/aviation-communication';
import { IApiRegistry } from '@airport/check-in';
export * from '@airport/check-in';
export * from '@airport/direction-indicator';
export * from '@airport/holding-pattern';
export * from '@airport/tarmaq-entity';
export * from '@airport/tarmaq-dao';
import { IApplicationInitializer, ITerminalStore } from '@airport/terminal-map';
export * from '@airport/terminal-map';
export * from '@airport/travel-document-checkpoint';
export * from '@airport/tower';

declare class AbstractApplicationLoader implements IApplicationLoader {
    private application;
    applicationInitializer: IApplicationInitializer;
    terminalStore: ITerminalStore;
    apiRegistry: IApiRegistry;
    private initializing;
    constructor(application: JsonApplicationWithLastIds);
    load(lastIds: LastIds): Promise<void>;
    initialize(): Promise<void>;
    getApplication(): JsonApplicationWithLastIds;
}

export { AbstractApplicationLoader };
