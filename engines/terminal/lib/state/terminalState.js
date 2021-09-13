/**
 * For logic classes to be hot-swappable for quick upgrades all state should be contained
 * in one non-reloadable BehaviorSubject.
 */
import { BehaviorSubject } from "rxjs";
export const TERMINAL_STATE = new BehaviorSubject({
    transactions: {
        currentTransaction: null,
        currentTransactionDomain: null,
    }
});
//# sourceMappingURL=terminalState.js.map