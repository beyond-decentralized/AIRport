/**
 * For logic classes to be hot-swappable for quick upgrades all state is contained
 * in one non-reloadable BehaviorSubject.
 */

import {
    BehaviorSubject,
    Subject
} from "rxjs";
import { ITerminalState } from "./TerminalState";

export const TERMINAL_STATE: Subject<ITerminalState> = new BehaviorSubject({
    applicationActors: [],
    applications: [],
    domains: [],
    frameworkActor: null,
    initializedApps: new Set(),
    initializingApps: new Set(),
    terminal: null,
})