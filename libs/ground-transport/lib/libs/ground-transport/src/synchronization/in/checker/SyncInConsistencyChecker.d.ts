import { IDataToTM } from "../SyncInUtils";
export interface ISyncInConsistencyChecker {
}
export declare class SyncInConsistencyChecker implements ISyncInConsistencyChecker {
    ensureConsistency(message: IDataToTM): void;
    private isRepositoryConsistent();
    private areActorsConsistent(message);
    private areSchemasConsistent();
}
