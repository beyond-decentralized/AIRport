import { IDomain, IApplication, IApplicationColumn, IApplicationEntity, IApplicationRelation, IApplicationVersion } from '@airport/airspace';
import { IMemoizedSelector, ISelectorManager, LastIds } from '@airport/apron';
import { ILocalAPIRequest } from '@airport/aviation-communication';
import { Domain_Name, JsonApplication_Name, Application_Name, FullApplication_Name } from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern';
import { Subject } from 'rxjs';
import { IApplicationInitializerState, InternalConnectorState, IReceiverState, ITerminalState, ITerminalStateContainer, ITransactionManagerState, IWebReceiverState } from './TerminalState';
import { ITransactionCredentials } from '../Credentials';
import { ISequenceGeneratorState } from '..';
export interface IMessageInRecord {
    message: ILocalAPIRequest<'FromClientRedirected'>;
    reject: any;
    resolve: any;
}
export interface IPendingTransaction {
    context: any;
    credentials: ITransactionCredentials;
    reject: any;
    resolve: any;
}
export interface ITerminalStore {
    state: Subject<ITerminalState>;
    getAllApplicationVersionsByIds: IMemoizedSelector<IApplicationVersion[], ITerminalState>;
    getAllColumns: IMemoizedSelector<IApplicationColumn[], ITerminalState>;
    getAllEntities: IMemoizedSelector<IApplicationEntity[], ITerminalState>;
    getAllRelations: IMemoizedSelector<IApplicationRelation[], ITerminalState>;
    getApplications: IMemoizedSelector<IApplication[], ITerminalState>;
    getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>;
    getApplicationInitializer: IMemoizedSelector<IApplicationInitializerState, ITerminalState>;
    getApplicationActorMapByDomainAndApplication_Names: IMemoizedSelector<Map<Domain_Name, Map<Application_Name, IActor[]>>, ITerminalState>;
    getDomains: IMemoizedSelector<IDomain[], ITerminalState>;
    getDomainMapByName: IMemoizedSelector<Map<Domain_Name, IDomain>, ITerminalState>;
    getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>;
    getInternalConnector: IMemoizedSelector<InternalConnectorState, ITerminalState>;
    getIsServer: IMemoizedSelector<boolean, ITerminalState>;
    getLastIds: IMemoizedSelector<LastIds, ITerminalState>;
    getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<Domain_Name, Map<JsonApplication_Name, IApplicationVersion>>, ITerminalState>;
    getLatestApplicationVersionMapByFullApplication_Name: IMemoizedSelector<Map<FullApplication_Name, IApplicationVersion>, ITerminalState>;
    getLatestApplicationVersionsByApplication_Indexes: IMemoizedSelector<IApplicationVersion[], ITerminalState>;
    getReceiver: IMemoizedSelector<IReceiverState, ITerminalState>;
    getSequenceGenerator: IMemoizedSelector<ISequenceGeneratorState, ITerminalState>;
    getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>;
    getTransactionManager: IMemoizedSelector<ITransactionManagerState, ITerminalState>;
    getWebReceiver: IMemoizedSelector<IWebReceiverState, ITerminalState>;
    tearDown(): any;
}
export declare class TerminalStore implements ITerminalStore {
    selectorManager: ISelectorManager;
    terminalState: ITerminalStateContainer;
    get state(): Subject<ITerminalState>;
    getAllApplicationVersionsByIds: IMemoizedSelector<IApplicationVersion[], ITerminalState>;
    getAllColumns: IMemoizedSelector<IApplicationColumn[], ITerminalState>;
    getAllEntities: IMemoizedSelector<IApplicationEntity[], ITerminalState>;
    getAllRelations: IMemoizedSelector<IApplicationRelation[], ITerminalState>;
    getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>;
    getApplicationInitializer: IMemoizedSelector<IApplicationInitializerState, ITerminalState>;
    getApplicationActorMapByDomainAndApplication_Names: IMemoizedSelector<Map<Domain_Name, Map<Application_Name, IActor[]>>, ITerminalState>;
    getApplications: IMemoizedSelector<IApplication[], ITerminalState>;
    getDomains: IMemoizedSelector<IDomain[], ITerminalState>;
    getDomainMapByName: IMemoizedSelector<Map<Domain_Name, IDomain>, ITerminalState>;
    getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>;
    getInternalConnector: IMemoizedSelector<InternalConnectorState, ITerminalState>;
    getIsServer: IMemoizedSelector<boolean, ITerminalState>;
    getLastIds: IMemoizedSelector<LastIds, ITerminalState>;
    getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<Domain_Name, Map<JsonApplication_Name, IApplicationVersion>>, ITerminalState>;
    getLatestApplicationVersionMapByFullApplication_Name: IMemoizedSelector<Map<FullApplication_Name, IApplicationVersion>, ITerminalState>;
    getLatestApplicationVersionsByApplication_Indexes: IMemoizedSelector<IApplicationVersion[], ITerminalState>;
    getReceiver: IMemoizedSelector<IReceiverState, ITerminalState>;
    getSequenceGenerator: IMemoizedSelector<ISequenceGeneratorState, ITerminalState>;
    getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>;
    getTransactionManager: IMemoizedSelector<ITransactionManagerState, ITerminalState>;
    getWebReceiver: IMemoizedSelector<IWebReceiverState, ITerminalState>;
    init(): Promise<void>;
    tearDown(): void;
}
//# sourceMappingURL=TerminalStore.d.ts.map