import { IMemoizedSelector } from '@airport/check-in';
import { DomainName, JsonSchemaName, SchemaName } from '@airport/ground-control';
import { IDomain } from '@airport/territory';
import { ISchema, ISchemaColumn, ISchemaEntity, ISchemaRelation, ISchemaVersion } from '@airport/traffic-pattern';
import type { BehaviorSubject as IRxBehaviorSubject } from 'rxjs';
import { ITerminalState } from './TerminalState';
export interface ITerminalStore {
    state: IRxBehaviorSubject<ITerminalState>;
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
    state: IRxBehaviorSubject<ITerminalState>;
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
    init(): Promise<void>;
    tearDown(): void;
}
//# sourceMappingURL=TerminalStore.d.ts.map