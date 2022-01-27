/**
 * For logic classes to be hot-swappable for quick upgrades all state is contained
 * in one non-reloadable BehaviorSubject.
 */
import { BehaviorSubject } from "rxjs";
export const TERMINAL_STATE = new BehaviorSubject({
    applicationActors: [],
    applications: [],
    domains: [],
    frameworkActor: null,
    initializedApps: new Set(),
    initializingApps: new Set(),
    terminal: null,
});
//# sourceMappingURL=theState.js.map