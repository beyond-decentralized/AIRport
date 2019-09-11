import { IMemoizedSelector } from '@airport/check-in';
import { DomainName, JsonSchemaName, SchemaName } from '@airport/ground-control';
import { BehaviorSubject } from '@airport/observe';
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
    state: any;
    getTerminalState: IMemoizedSelector<{}, {}>;
    getDomains: IMemoizedSelector<any, {}>;
    getLatestSchemaVersionMapByNames: IMemoizedSelector<Map<string, Map<string, ISchemaVersion>>, {}>;
    getLatestSchemaVersionMapBySchemaName: IMemoizedSelector<Map<string, ISchemaVersion>, {}>;
    getAllSchemaVersionsByIds: IMemoizedSelector<ISchemaVersion[], {}>;
    getLatestSchemaVersionsBySchemaIndexes: IMemoizedSelector<ISchemaVersion[], {}>;
    getSchemas: IMemoizedSelector<any, {}>;
    tearDown(): void;
    getAllEntities: IMemoizedSelector<ISchemaEntity[], {}>;
    getAllColumns: IMemoizedSelector<ISchemaColumn[], {}>;
    getAllRelations: IMemoizedSelector<ISchemaRelation[], {}>;
}
