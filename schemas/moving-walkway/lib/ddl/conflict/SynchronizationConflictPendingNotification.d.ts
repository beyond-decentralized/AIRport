import { IActor } from "@airport/holding-pattern";
import { SynchronizationConflict } from "./SynchronizationConflict";
export declare type SynchronizationConflictPendingNotification_Acknowledged = boolean;
export declare class SynchronizationConflictPendingNotification {
    synchronizationConflict: SynchronizationConflict;
    actor: IActor;
    acknowledged: SynchronizationConflictPendingNotification_Acknowledged;
}
//# sourceMappingURL=SynchronizationConflictPendingNotification.d.ts.map