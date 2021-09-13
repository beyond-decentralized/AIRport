/**
 * For logic classes to be hot-swappable for quick upgrades all state should be contained
 * in one non-reloadable BehaviorSubject.
 */

import {
    BehaviorSubject,
    Subject
} from "rxjs";

export const TERMINAL_STATE: Subject<{
    transactions: {
        currentTransaction: any
        currentTransactionDomain: string
    }
}> = new BehaviorSubject({
    transactions: {
        currentTransaction: null,
        currentTransactionDomain: null,
    }
})