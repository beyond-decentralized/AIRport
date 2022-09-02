import { IContext } from '@airport/direction-indicator';
import { IApplicationColumnDao, IApplicationDao, IApplicationEntityDao, IApplicationPropertyColumnDao, IApplicationPropertyDao, IApplicationReferenceDao, IApplicationRelationColumnDao, IApplicationRelationDao, IApplicationVersionDao, IDomainDao } from '@airport/airspace/lib/to_be_generated/runtime-index';
import { DdlObjects, ITransactionManager } from '@airport/terminal-map';
export interface IApplicationRecorder {
    record(ddlObjects: DdlObjects, context: IContext): Promise<void>;
}
export declare class ApplicationRecorder implements IApplicationRecorder {
    applicationColumnDao: IApplicationColumnDao;
    applicationDao: IApplicationDao;
    applicationEntityDao: IApplicationEntityDao;
    applicationPropertyColumnDao: IApplicationPropertyColumnDao;
    applicationPropertyDao: IApplicationPropertyDao;
    applicationReferenceDao: IApplicationReferenceDao;
    applicationRelationColumnDao: IApplicationRelationColumnDao;
    applicationRelationDao: IApplicationRelationDao;
    applicationVersionDao: IApplicationVersionDao;
    domainDao: IDomainDao;
    transactionManager: ITransactionManager;
    record(ddlObjects: DdlObjects, context: IContext): Promise<void>;
    private setDefaultVersioning;
    private bulkCreate;
}
//# sourceMappingURL=ApplicationRecorder.d.ts.map