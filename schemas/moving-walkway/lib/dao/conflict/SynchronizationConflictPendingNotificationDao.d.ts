import { IUtils } from "@airport/air-control";
import { BaseSynchronizationConflictPendingNotificationDao, IBaseSynchronizationConflictPendingNotificationDao } from "../../generated/generated";
export interface ISynchronizationConflictPendingNotificationDao extends IBaseSynchronizationConflictPendingNotificationDao {
}
export declare class SynchronizationConflictPendingNotificationDao extends BaseSynchronizationConflictPendingNotificationDao implements ISynchronizationConflictPendingNotificationDao {
    constructor(utils: IUtils);
}
