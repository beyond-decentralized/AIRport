import { IUtils } from '@airport/air-control';
import { DomainName, SchemaName } from '@airport/ground-control';
import { ISchemaVersion } from '@airport/traffic-pattern';
import { BehaviorSubject, Subject } from 'rxjs';
import { IMemoizedSelector } from './Selector';
import { ITerminalState } from './TerminalState';
export interface ITerminalStore {
    state: Subject<ITerminalState>;
    getLatestSchemaVersionMapByNames: IMemoizedSelector<Map<DomainName, Map<SchemaName, ISchemaVersion>>, ITerminalState>;
    tearDown(): any;
}
export declare class TerminalStore implements ITerminalStore {
    private utils;
    constructor(utils: IUtils);
    state: BehaviorSubject<ITerminalState>;
    getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>;
    getDomains: IMemoizedSelector<import("../../../../schemas/territory/lib/generated/qdomain").IDomain[], ITerminalState>;
    getNodesBySyncFrequency: IMemoizedSelector<Map<number, import("../../../../schemas/moving-walkway/lib/generated/sharingNode/qsharingnode").ISharingNode[]>, ITerminalState>;
    getLatestSchemaVersionMapByNames: IMemoizedSelector<Map<string, Map<string, ISchemaVersion>>, ITerminalState>;
    tearDown(): void;
}
