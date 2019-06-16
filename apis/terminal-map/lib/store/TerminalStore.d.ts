import { IMemoizedSelector } from '@airport/check-in';
import { DomainName, JsonSchemaName, SchemaName } from '@airport/ground-control';
import { BehaviorSubject } from '@airport/observe';
import { IDomain } from '@airport/territory';
import { ISchema, ISchemaVersion } from '@airport/traffic-pattern';
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
    tearDown(): any;
}
export declare class TerminalStore implements ITerminalStore {
    state: BehaviorSubject<ITerminalState>;
    getTerminalState: IMemoizedSelector<any, any>;
    getDomains: IMemoizedSelector<any, any>;
    getLatestSchemaVersionMapByNames: IMemoizedSelector<Map<string, Map<string, ISchemaVersion>>, any>;
    getLatestSchemaVersionMapBySchemaName: IMemoizedSelector<Map<string, ISchemaVersion>, any>;
    getAllSchemaVersionsByIds: IMemoizedSelector<ISchemaVersion[], any>;
    getLatestSchemaVersionsBySchemaIndexes: IMemoizedSelector<ISchemaVersion[], any>;
    getSchemas: IMemoizedSelector<any, any>;
    tearDown(): void;
}
