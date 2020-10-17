import { ISynchronizationConflict } from './synchronizationconflict';
import { IActor } from '@airport/holding-pattern';
export interface ISynchronizationConflictPendingNotification {
    synchronizationConflict: ISynchronizationConflict;
    actor: IActor;
    acknowledged?: boolean;
}
//# sourceMappingURL=synchronizationconflictpendingnotification.d.ts.map