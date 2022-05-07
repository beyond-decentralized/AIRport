import { IDomain, IApplication, IApplicationColumn, IApplicationEntity, IApplicationRelation, IApplicationVersion } from '@airport/airspace';
import { ILocalAPIRequest } from '@airport/aviation-communication';
import { IMemoizedSelector, ISelectorManager } from '@airport/check-in';
import { DomainName, JsonApplicationName, ApplicationName, FullApplicationName } from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern-runtime';
import { Subject, Subscription } from 'rxjs';
import { ITerminalState, ITerminalStateContainer } from './TerminalState';
import { ITransaction } from '../transaction/ITransaction';
import { ITransactionCredentials } from '../Credentials';
import { LastIds } from '@airport/apron';
export interface InternalConnectorStore {
    dbName: string;
    internalCredentials: ITransactionCredentials;
    serverUrl: string;
}
export interface IMessageInRecord {
    message: ILocalAPIRequest<'FromClientRedirected'>;
    reject: any;
    resolve: any;
}
export interface IPendingTransaction {
    credentials: ITransactionCredentials;
    reject: any;
    resolve: any;
}
export interface IReceiverStore {
    initializingApps: Set<FullApplicationName>;
    initializedApps: Set<FullApplicationName>;
}
export interface ITransactionManagerStore {
    pendingTransactionQueue: IPendingTransaction[];
    transactionInProgressMap: Map<string, ITransaction>;
    rootTransactionInProgressMap: Map<string, ITransaction>;
}
export interface IWebReceiverStore {
    domainPrefix: string;
    localDomain: string;
    mainDomainFragments: string[];
    onClientMessageCallback: (message: any) => void;
    pendingApplicationCounts: Map<string, number>;
    pendingHostCounts: Map<string, number>;
    pendingInterAppApiCallMessageMap: Map<string, IMessageInRecord>;
    subsriptionMap: Map<string, Map<string, Subscription>>;
}
export interface ITerminalStore {
    state: Subject<ITerminalState>;
    getAllApplicationVersionsByIds: IMemoizedSelector<IApplicationVersion[], ITerminalState>;
    getAllColumns: IMemoizedSelector<IApplicationColumn[], ITerminalState>;
    getAllEntities: IMemoizedSelector<IApplicationEntity[], ITerminalState>;
    getAllRelations: IMemoizedSelector<IApplicationRelation[], ITerminalState>;
    getApplications: IMemoizedSelector<IApplication[], ITerminalState>;
    getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>;
    getApplicationActorMapByDomainAndApplicationNames: IMemoizedSelector<Map<DomainName, Map<ApplicationName, IActor[]>>, ITerminalState>;
    getDomains: IMemoizedSelector<IDomain[], ITerminalState>;
    getDomainMapByName: IMemoizedSelector<Map<DomainName, IDomain>, ITerminalState>;
    getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>;
    getInternalConnector: IMemoizedSelector<InternalConnectorStore, ITerminalState>;
    getLastIds: IMemoizedSelector<LastIds, ITerminalState>;
    getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<DomainName, Map<JsonApplicationName, IApplicationVersion>>, ITerminalState>;
    getLatestApplicationVersionMapByFullApplicationName: IMemoizedSelector<Map<FullApplicationName, IApplicationVersion>, ITerminalState>;
    getLatestApplicationVersionsByApplicationIndexes: IMemoizedSelector<IApplicationVersion[], ITerminalState>;
    getReceiver: IMemoizedSelector<IReceiverStore, ITerminalState>;
    getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>;
    getTransactionManager: IMemoizedSelector<ITransactionManagerStore, ITerminalState>;
    getWebReceiver: IMemoizedSelector<IWebReceiverStore, ITerminalState>;
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
    getApplicationActorMapByDomainAndApplicationNames: IMemoizedSelector<Map<DomainName, Map<ApplicationName, IActor[]>>, ITerminalState>;
    getApplications: IMemoizedSelector<IApplication[], ITerminalState>;
    getDomains: IMemoizedSelector<IDomain[], ITerminalState>;
    getDomainMapByName: IMemoizedSelector<Map<DomainName, IDomain>, ITerminalState>;
    getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>;
    getInternalConnector: IMemoizedSelector<InternalConnectorStore, ITerminalState>;
    getLastIds: IMemoizedSelector<LastIds, ITerminalState>;
    getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<DomainName, Map<JsonApplicationName, IApplicationVersion>>, ITerminalState>;
    getLatestApplicationVersionMapByFullApplicationName: IMemoizedSelector<Map<FullApplicationName, IApplicationVersion>, ITerminalState>;
    getLatestApplicationVersionsByApplicationIndexes: IMemoizedSelector<IApplicationVersion[], ITerminalState>;
    getReceiver: IMemoizedSelector<IReceiverStore, ITerminalState>;
    getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>;
    getTransactionManager: IMemoizedSelector<ITransactionManagerStore, ITerminalState>;
    getWebReceiver: IMemoizedSelector<IWebReceiverStore, ITerminalState>;
    init(): Promise<void>;
    tearDown(): void;
}
//# sourceMappingURL=TerminalStore.d.ts.map