import { IMemoizedSelector } from '@airport/check-in';
import { DomainName, JsonApplicationName, ApplicationName, FullApplicationName } from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern';
import { IDomain, IApplication, IApplicationColumn, IApplicationEntity, IApplicationRelation, IApplicationVersion } from '@airport/airspace';
import { Subject } from 'rxjs';
import { ITerminalState } from './TerminalState';
export interface ITerminalStore {
    state: Subject<ITerminalState>;
    getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>;
    getApplicationActorMapByDomainAndApplicationNames: IMemoizedSelector<Map<DomainName, Map<ApplicationName, IActor[]>>, ITerminalState>;
    getDomains: IMemoizedSelector<IDomain[], ITerminalState>;
    getDomainMapByName: IMemoizedSelector<Map<DomainName, IDomain>, ITerminalState>;
    getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>;
    getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<DomainName, Map<JsonApplicationName, IApplicationVersion>>, ITerminalState>;
    getLatestApplicationVersionMapByFullApplicationName: IMemoizedSelector<Map<FullApplicationName, IApplicationVersion>, ITerminalState>;
    getAllApplicationVersionsByIds: IMemoizedSelector<IApplicationVersion[], ITerminalState>;
    getLatestApplicationVersionsByApplicationIndexes: IMemoizedSelector<IApplicationVersion[], ITerminalState>;
    getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>;
    getApplications: IMemoizedSelector<IApplication[], ITerminalState>;
    getAllColumns: IMemoizedSelector<IApplicationColumn[], ITerminalState>;
    getAllEntities: IMemoizedSelector<IApplicationEntity[], ITerminalState>;
    getAllRelations: IMemoizedSelector<IApplicationRelation[], ITerminalState>;
    getInitializingApps: IMemoizedSelector<Set<FullApplicationName>, ITerminalState>;
    getInitializedApps: IMemoizedSelector<Set<FullApplicationName>, ITerminalState>;
    tearDown(): any;
}
export declare class TerminalStore implements ITerminalStore {
    state: Subject<ITerminalState>;
    getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>;
    getApplicationActorMapByDomainAndApplicationNames: IMemoizedSelector<Map<DomainName, Map<ApplicationName, IActor[]>>, ITerminalState>;
    getDomains: IMemoizedSelector<IDomain[], ITerminalState>;
    getDomainMapByName: IMemoizedSelector<Map<DomainName, IDomain>, ITerminalState>;
    getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>;
    getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<DomainName, Map<JsonApplicationName, IApplicationVersion>>, ITerminalState>;
    getLatestApplicationVersionMapByFullApplicationName: IMemoizedSelector<Map<FullApplicationName, IApplicationVersion>, ITerminalState>;
    getAllApplicationVersionsByIds: IMemoizedSelector<IApplicationVersion[], ITerminalState>;
    getLatestApplicationVersionsByApplicationIndexes: IMemoizedSelector<IApplicationVersion[], ITerminalState>;
    getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>;
    getApplications: IMemoizedSelector<IApplication[], ITerminalState>;
    getAllColumns: IMemoizedSelector<IApplicationColumn[], ITerminalState>;
    getAllEntities: IMemoizedSelector<IApplicationEntity[], ITerminalState>;
    getAllRelations: IMemoizedSelector<IApplicationRelation[], ITerminalState>;
    getInitializingApps: IMemoizedSelector<Set<FullApplicationName>, ITerminalState>;
    getInitializedApps: IMemoizedSelector<Set<FullApplicationName>, ITerminalState>;
    init(): Promise<void>;
    tearDown(): void;
}
//# sourceMappingURL=TerminalStore.d.ts.map