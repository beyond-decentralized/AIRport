/**
 * For logic classes to be hot-swappable for quick upgrades all state should be contained
 * in one non-reloadable BehaviorSubject.
 */
import { Subject } from "rxjs";
export declare const TERMINAL_STATE: Subject<{
    transactions: {
        currentTransaction: any;
        currentTransactionDomain: string;
    };
}>;
//# sourceMappingURL=terminalState.d.ts.map