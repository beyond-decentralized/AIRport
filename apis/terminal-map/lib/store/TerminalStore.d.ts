import { IMemoizedSelector } from '@airport/check-in';
import { ApplicationId, DomainName, JsonSchemaName, SchemaName } from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern';
import type { IApplication, IDomain } from '@airport/territory';
import { ISchema, ISchemaColumn, ISchemaEntity, ISchemaRelation, ISchemaVersion } from '@airport/traffic-pattern';
import { BehaviorSubject } from 'rxjs';
import { ITerminalState } from './TerminalState';
export interface ITerminalStore {
    state: BehaviorSubject<ITerminalState>;
    getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>;
    getApplicationActorMapById: IMemoizedSelector<Map<ApplicationId, IActor>, ITerminalState>;
    getApplicationActorMapByNames: IMemoizedSelector<Map<DomainName, Map<SchemaName, IActor>>, ITerminalState>;
    getApplications: IMemoizedSelector<IApplication[], ITerminalState>;
    getApplicationMapById: IMemoizedSelector<Map<ApplicationId, IApplication>, ITerminalState>;
    getApplicationMapByNames: IMemoizedSelector<Map<DomainName, Map<SchemaName, IApplication>>, ITerminalState>;
    getDomains: IMemoizedSelector<IDomain[], ITerminalState>;
    getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>;
    getLatestSchemaVersionMapByNames: IMemoizedSelector<Map<DomainName, Map<JsonSchemaName, ISchemaVersion>>, ITerminalState>;
    getLatestSchemaVersionMapBySchemaName: IMemoizedSelector<Map<SchemaName, ISchemaVersion>, ITerminalState>;
    getAllSchemaVersionsByIds: IMemoizedSelector<ISchemaVersion[], ITerminalState>;
    getLatestSchemaVersionsBySchemaIndexes: IMemoizedSelector<ISchemaVersion[], ITerminalState>;
    getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>;
    getSchemas: IMemoizedSelector<ISchema[], ITerminalState>;
    getAllColumns: IMemoizedSelector<ISchemaColumn[], ITerminalState>;
    getAllEntities: IMemoizedSelector<ISchemaEntity[], ITerminalState>;
    getAllRelations: IMemoizedSelector<ISchemaRelation[], ITerminalState>;
    tearDown(): any;
}
export declare class TerminalStore implements ITerminalStore {
    state: BehaviorSubject<ITerminalState>;
    getApplicationActors: IMemoizedSelector<IActor[], ITerminalState>;
    getApplicationActorMapById: IMemoizedSelector<Map<ApplicationId, IActor>, ITerminalState>;
    getApplicationActorMapByNames: IMemoizedSelector<Map<DomainName, Map<SchemaName, IActor>>, ITerminalState>;
    getApplications: IMemoizedSelector<IApplication[], ITerminalState>;
    getApplicationMapById: IMemoizedSelector<Map<ApplicationId, IApplication>, ITerminalState>;
    getApplicationMapByNames: IMemoizedSelector<Map<DomainName, Map<SchemaName, IApplication>>, ITerminalState>;
    getDomains: IMemoizedSelector<IDomain[], ITerminalState>;
    getFrameworkActor: IMemoizedSelector<IActor, ITerminalState>;
    getLatestSchemaVersionMapByNames: IMemoizedSelector<Map<DomainName, Map<JsonSchemaName, ISchemaVersion>>, ITerminalState>;
    getLatestSchemaVersionMapBySchemaName: IMemoizedSelector<Map<SchemaName, ISchemaVersion>, ITerminalState>;
    getAllSchemaVersionsByIds: IMemoizedSelector<ISchemaVersion[], ITerminalState>;
    getLatestSchemaVersionsBySchemaIndexes: IMemoizedSelector<ISchemaVersion[], ITerminalState>;
    getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>;
    getSchemas: IMemoizedSelector<ISchema[], ITerminalState>;
    getAllColumns: IMemoizedSelector<ISchemaColumn[], ITerminalState>;
    getAllEntities: IMemoizedSelector<ISchemaEntity[], ITerminalState>;
    getAllRelations: IMemoizedSelector<ISchemaRelation[], ITerminalState>;
    init(): Promise<void>;
    tearDown(): void;
}
//# sourceMappingURL=TerminalStore.d.ts.map