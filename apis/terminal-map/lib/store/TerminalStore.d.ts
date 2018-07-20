import { ITerminal } from "@airport/holding-pattern";
import { ISharingNode, SharingNodeSyncFrequency } from "@airport/moving-walkway";
import { BehaviorSubject } from "rxjs";
export interface ITerminalStore {
    terminal: BehaviorSubject<ITerminal>;
    nodesBySyncFrequency: BehaviorSubject<Map<SharingNodeSyncFrequency, ISharingNode[]>>;
    tearDown(): any;
}
export declare class TerminalStore implements ITerminalStore {
    terminal: BehaviorSubject<ITerminal>;
    nodesBySyncFrequency: BehaviorSubject<Map<number, ISharingNode[]>>;
    tearDown(): void;
}
