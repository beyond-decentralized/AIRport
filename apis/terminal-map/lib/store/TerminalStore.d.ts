import { IDomain, IApplication, IApplicationColumn, IApplicationEntity, IApplicationRelation, IApplicationVersion } from '@airport/airspace';
import { ILocalAPIRequest } from '@airport/aviation-communication';
import { IMemoizedSelector, ISelectorManager } from '@airport/check-in';
import { DomainName, JsonApplicationName, ApplicationName, FullApplicationName } from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern-runtime';
import { Subject } from 'rxjs';
import { IApplicationInitializerState, InternalConnectorState, IReceiverState, ITerminalState, ITerminalStateContainer, ITransactionManagerState, IWebReceiverState } from './TerminalState';
import { ITransactionCredentials } from '../Credentials';
import { LastIds } from '@airport/apron';
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
    getApplicationActorMapByDomainAndApplicationNames: IMemoizedSelector<Map<DomainName, Map<ApplicationName, IActor[]>>, ITerminalState>;
    getDomains: IMemoizedSelector<IDomain[], ITerminalState>;
    getDomainMapByName: IMemoizedSelector<Map<DomainName, IDomain>, ITerminalState>;
    getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>;
    getInternalConnector: IMemoizedSelector<InternalConnectorState, ITerminalState>;
    getLastIds: IMemoizedSelector<LastIds, ITerminalState>;
    getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<DomainName, Map<JsonApplicationName, IApplicationVersion>>, ITerminalState>;
    getLatestApplicationVersionMapByFullApplicationName: IMemoizedSelector<Map<FullApplicationName, IApplicationVersion>, ITerminalState>;
    getLatestApplicationVersionsByApplicationIndexes: IMemoizedSelector<IApplicationVersion[], ITerminalState>;
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
    getApplicationActorMapByDomainAndApplicationNames: IMemoizedSelector<Map<DomainName, Map<ApplicationName, IActor[]>>, ITerminalState>;
    getApplications: IMemoizedSelector<IApplication[], ITerminalState>;
    getDomains: IMemoizedSelector<IDomain[], ITerminalState>;
    getDomainMapByName: IMemoizedSelector<Map<DomainName, IDomain>, ITerminalState>;
    getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>;
    getInternalConnector: IMemoizedSelector<InternalConnectorState, ITerminalState>;
    getLastIds: IMemoizedSelector<LastIds, ITerminalState>;
    getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<DomainName, Map<JsonApplicationName, IApplicationVersion>>, ITerminalState>;
    getLatestApplicationVersionMapByFullApplicationName: IMemoizedSelector<Map<FullApplicationName, IApplicationVersion>, ITerminalState>;
    getLatestApplicationVersionsByApplicationIndexes: IMemoizedSelector<IApplicationVersion[], ITerminalState>;
    getReceiver: IMemoizedSelector<IReceiverState, ITerminalState>;
    getSequenceGenerator: IMemoizedSelector<ISequenceGeneratorState, ITerminalState>;
    getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>;
    getTransactionManager: IMemoizedSelector<ITransactionManagerState, ITerminalState>;
    getWebReceiver: IMemoizedSelector<IWebReceiverState, ITerminalState>;
    init(): Promise<void>;
    tearDown(): void;
}
//# sourceMappingURL=TerminalStore.d.ts.map