import { IUtils } from "@airport/air-control";
import { BaseSynchronizationConflictValuesDao, IBaseSynchronizationConflictValuesDao } from "../../generated/generated";
export interface ISynchronizationConflictValuesDao extends IBaseSynchronizationConflictValuesDao {
}
export declare class SynchronizationConflictValuesDao extends BaseSynchronizationConflictValuesDao implements ISynchronizationConflictValuesDao {
    constructor(utils: IUtils);
}
