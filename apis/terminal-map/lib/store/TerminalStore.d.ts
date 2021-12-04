import { IMemoizedSelector } from '@airport/check-in';
import { ApplicationSignature, DomainName, JsonApplicationName, ApplicationName } from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern';
import { IDomain, IApplication, IApplicationColumn, IApplicationEntity, IApplicationRelation, IApplicationVersion } from '@airport/airspace';
import { BehaviorSubject } from 'rxjs';
import { ITerminalState } from './TerminalState';
export interface ITerminalStore {
    state: BehaviorSubject<ITerminalState>;
    getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>;
    getApplicationActorMapBySignature: IMemoizedSelector<Map<ApplicationSignature, IActor[]>, ITerminalState>;
    getDomains: IMemoizedSelector<IDomain[], ITerminalState>;
    getDomainMapByName: IMemoizedSelector<Map<DomainName, IDomain>, ITerminalState>;
    getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>;
    getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<DomainName, Map<JsonApplicationName, IApplicationVersion>>, ITerminalState>;
    getLatestApplicationVersionMapByApplicationName: IMemoizedSelector<Map<ApplicationName, IApplicationVersion>, ITerminalState>;
    getAllApplicationVersionsByIds: IMemoizedSelector<IApplicationVersion[], ITerminalState>;
    getLatestApplicationVersionsByApplicationIndexes: IMemoizedSelector<IApplicationVersion[], ITerminalState>;
    getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>;
    getApplications: IMemoizedSelector<IApplication[], ITerminalState>;
    getAllColumns: IMemoizedSelector<IApplicationColumn[], ITerminalState>;
    getAllEntities: IMemoizedSelector<IApplicationEntity[], ITerminalState>;
    getAllRelations: IMemoizedSelector<IApplicationRelation[], ITerminalState>;
    tearDown(): any;
}
export declare class TerminalStore implements ITerminalStore {
    state: BehaviorSubject<ITerminalState>;
    getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>;
    getApplicationActorMapBySignature: IMemoizedSelector<Map<ApplicationSignature, IActor[]>, ITerminalState>;
    getDomains: IMemoizedSelector<IDomain[], ITerminalState>;
    getDomainMapByName: IMemoizedSelector<Map<DomainName, IDomain>, ITerminalState>;
    getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>;
    getLatestApplicationVersionMapByNames: IMemoizedSelector<Map<DomainName, Map<JsonApplicationName, IApplicationVersion>>, ITerminalState>;
    getLatestApplicationVersionMapByApplicationName: IMemoizedSelector<Map<ApplicationName, IApplicationVersion>, ITerminalState>;
    getAllApplicationVersionsByIds: IMemoizedSelector<IApplicationVersion[], ITerminalState>;
    getLatestApplicationVersionsByApplicationIndexes: IMemoizedSelector<IApplicationVersion[], ITerminalState>;
    getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>;
    getApplications: IMemoizedSelector<IApplication[], ITerminalState>;
    getAllColumns: IMemoizedSelector<IApplicationColumn[], ITerminalState>;
    getAllEntities: IMemoizedSelector<IApplicationEntity[], ITerminalState>;
    getAllRelations: IMemoizedSelector<IApplicationRelation[], ITerminalState>;
    init(): Promise<void>;
    tearDown(): void;
}
//# sourceMappingURL=TerminalStore.d.ts.map