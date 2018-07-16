import { IDatabase } from "@airport/holding-pattern";
import { ISharingNode, SharingNodeSyncFrequency } from "@airport/moving-walkway";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
export interface ITerminalStore {
    database: BehaviorSubject<IDatabase>;
    nodesBySyncFrequency: BehaviorSubject<Map<SharingNodeSyncFrequency, ISharingNode[]>>;
    tearDown(): any;
}
export declare class TerminalStore implements ITerminalStore {
    database: BehaviorSubject<IDatabase>;
    nodesBySyncFrequency: BehaviorSubject<Map<number, ISharingNode[]>>;
    tearDown(): void;
}
