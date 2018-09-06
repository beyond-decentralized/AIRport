import { IUtils } from '@airport/air-control';
import { DomainName, JsonSchemaName, SchemaName } from '@airport/ground-control';
import { IDomain } from '@airport/territory';
import { ISchema, ISchemaVersion } from '@airport/traffic-pattern';
import { BehaviorSubject } from 'rxjs';
import { IMemoizedSelector } from '@airport/check-in';
import { ITerminalState } from './TerminalState';
export interface ITerminalStore {
    state: BehaviorSubject<ITerminalState>;
    getDomains: IMemoizedSelector<IDomain[], ITerminalState>;
    getLatestSchemaVersionMapByNames: IMemoizedSelector<Map<DomainName, Map<JsonSchemaName, ISchemaVersion>>, ITerminalState>;
    getLatestSchemaVersionMapBySchemaName: IMemoizedSelector<Map<SchemaName, ISchemaVersion>, ITerminalState>;
    getLatestSchemaVersionsByIndexes: IMemoizedSelector<ISchemaVersion[], ITerminalState>;
    getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>;
    getSchemas: IMemoizedSelector<ISchema[], ITerminalState>;
    tearDown(): any;
}
export declare class TerminalStore implements ITerminalStore {
    private utils;
    constructor(utils: IUtils);
    state: BehaviorSubject<ITerminalState>;
    getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>;
    getDomains: IMemoizedSelector<IDomain[], ITerminalState>;
    getLatestSchemaVersionMapByNames: IMemoizedSelector<Map<string, Map<string, ISchemaVersion>>, ITerminalState>;
    getLatestSchemaVersionMapBySchemaName: IMemoizedSelector<Map<string, ISchemaVersion>, ITerminalState>;
    getLatestSchemaVersionsByIndexes: IMemoizedSelector<ISchemaVersion[], ITerminalState>;
    getSchemas: IMemoizedSelector<ISchema[], ITerminalState>;
    tearDown(): void;
}
