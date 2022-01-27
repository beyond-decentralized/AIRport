/**
 * For logic classes to be hot-swappable for quick upgrades all state is contained
 * in one non-reloadable BehaviorSubject.
 */
import { Subject } from "rxjs";
import { ITerminalState } from "./TerminalState";
export declare const TERMINAL_STATE: Subject<ITerminalState>;
//# sourceMappingURL=theState.d.ts.map