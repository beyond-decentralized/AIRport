import { IMemoizedSelector } from '@airport/check-in';
import { DomainName, JsonSchemaName, SchemaName } from '@airport/ground-control';
import { BehaviorSubject, Store } from '@airport/observe';
import { IDomain } from '@airport/territory';
import { ISchema, ISchemaColumn, ISchemaEntity, ISchemaRelation, ISchemaVersion } from '@airport/traffic-pattern';
import { ITerminalState } from './TerminalState';
export interface ITerminalStore {
    state: BehaviorSubject<ITerminalState>;
    getDomains: IMemoizedSelector<IDomain[], ITerminalState>;
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
    state: Store<ITerminalState>;
    getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>;
    getDomains: IMemoizedSelector<IDomain[], ITerminalState>;
    getLatestSchemaVersionMapByNames: IMemoizedSelector<Map<string, Map<string, ISchemaVersion>>, ITerminalState>;
    getLatestSchemaVersionMapBySchemaName: IMemoizedSelector<Map<string, ISchemaVersion>, ITerminalState>;
    getAllSchemaVersionsByIds: IMemoizedSelector<ISchemaVersion[], ITerminalState>;
    getLatestSchemaVersionsBySchemaIndexes: IMemoizedSelector<ISchemaVersion[], ITerminalState>;
    getSchemas: IMemoizedSelector<ISchema[], ITerminalState>;
    tearDown(): void;
    getAllEntities: IMemoizedSelector<ISchemaEntity[], ITerminalState>;
    getAllColumns: IMemoizedSelector<ISchemaColumn[], ITerminalState>;
    getAllRelations: IMemoizedSelector<ISchemaRelation[], ITerminalState>;
}
//# sourceMappingURL=TerminalStore.d.ts.map