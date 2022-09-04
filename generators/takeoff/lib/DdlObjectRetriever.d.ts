import { IDomainDao, IApplicationColumnDao, IApplicationDao, IApplicationEntityDao, IApplicationPropertyColumnDao, IApplicationPropertyDao, IApplicationReferenceDao, IApplicationRelationColumnDao, IApplicationRelationDao, IApplicationVersionDao } from '@airport/airspace/dist/app/bundle';
import { DdlObjects, ITerminalStore } from '@airport/terminal-map';
export interface IDdlObjectRetriever {
    retrieveDdlObjects(): Promise<DdlObjects>;
}
export declare class DdlObjectRetriever implements IDdlObjectRetriever {
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
    terminalStore: ITerminalStore;
    retrieveDdlObjects(): Promise<DdlObjects>;
}
//# sourceMappingURL=DdlObjectRetriever.d.ts.map