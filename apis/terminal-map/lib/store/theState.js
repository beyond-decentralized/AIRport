/**
 * For logic classes to be hot-swappable for quick upgrades all state is contained
 * in one non-reloadable BehaviorSubject.
 */
import { BehaviorSubject } from "rxjs";
export const internalTerminalState = new BehaviorSubject({
    applicationActors: [],
    applications: [],
    domains: [],
    frameworkActor: null,
    initializedApps: new Set(),
    initializingApps: new Set(),
    terminal: null,
    transactionMapById: new Map()
});
//# sourceMappingURL=theState.js.map