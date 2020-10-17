import { IActor } from "@airport/holding-pattern";
import { SynchronizationConflict } from "./SynchronizationConflict";
export declare type SynchronizationConflictPendingNotificationAcknowledged = boolean;
export declare class SynchronizationConflictPendingNotification {
    synchronizationConflict: SynchronizationConflict;
    actor: IActor;
    acknowledged: SynchronizationConflictPendingNotificationAcknowledged;
}
//# sourceMappingURL=SynchronizationConflictPendingNotification.d.ts.map