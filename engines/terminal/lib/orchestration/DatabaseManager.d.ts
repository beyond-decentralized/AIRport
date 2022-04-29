import { IContext } from '@airport/direction-indicator';
import { IApplicationDao } from '@airport/airspace';
import { IApplicationInitializer, IDatabaseManager, IStoreDriver, ITransactionalServer } from '@airport/terminal-map';
import { JsonApplicationWithLastIds } from '@airport/security-check';
import { IInternalRecordManager } from '../data/InternalRecordManager';
export declare class DatabaseManager implements IDatabaseManager {
    applicationDao: IApplicationDao;
    applicationInitializer: IApplicationInitializer;
    internalRecordManager: IInternalRecordManager;
    storeDriver: IStoreDriver;
    transactionalServer: ITransactionalServer;
    private initialized;
    initNoDb(context: IContext, ...applications: JsonApplicationWithLastIds[]): Promise<void>;
    initWithDb(domainName: string, context: IContext): Promise<void>;
    isInitialized(): boolean;
    initFeatureApplications(context: IContext, jsonApplications?: JsonApplicationWithLastIds[]): Promise<void>;
    private installStarterApplication;
}
//# sourceMappingURL=DatabaseManager.d.ts.map