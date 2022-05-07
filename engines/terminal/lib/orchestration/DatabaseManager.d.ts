import { IContext } from '@airport/direction-indicator';
import { IDbApplicationUtils } from '@airport/ground-control';
import { IApplicationDao } from '@airport/airspace';
import { IApplicationInitializer, IDatabaseManager, IStoreDriver, ITransactionalServer } from '@airport/terminal-map';
import { JsonApplicationWithLastIds } from '@airport/apron';
import { IInternalRecordManager } from '../data/InternalRecordManager';
export declare class DatabaseManager implements IDatabaseManager {
    applicationDao: IApplicationDao;
    applicationInitializer: IApplicationInitializer;
    dbApplicationUtils: IDbApplicationUtils;
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