import { ITerminal } from '@airport/holding-pattern';
import { ISharingNode, SharingNodeSyncFrequency } from '@airport/moving-walkway';
import { IDomain } from '@airport/territory';
import { BehaviorSubject } from 'rxjs';
export interface ITerminalStore {
    terminal: BehaviorSubject<ITerminal>;
    nodesBySyncFrequency: BehaviorSubject<Map<SharingNodeSyncFrequency, ISharingNode[]>>;
    domains: BehaviorSubject<IDomain>;
    tearDown(): any;
}
export declare class MemoizedSelector {
}
export declare class TerminalStore implements ITerminalStore {
    terminal: BehaviorSubject<ITerminal>;
    nodesBySyncFrequency: BehaviorSubject<Map<number, ISharingNode[]>>;
    tearDown(): void;
}
