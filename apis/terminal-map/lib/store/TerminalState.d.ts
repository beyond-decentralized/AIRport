import { IActor } from '@airport/holding-pattern';
import type { IDomain, IApplication } from '@airport/airspace';
import type { ITerminal } from '@airport/travel-document-checkpoint/lib/to_be_generated';
import { FullApplicationName } from '@airport/ground-control';
export interface ITerminalState {
    applicationActors: IActor[];
    applications: IApplication[];
    domains: IDomain[];
    frameworkActor: IActor;
    initializedApps: Set<FullApplicationName>;
    initializingApps: Set<FullApplicationName>;
    terminal: ITerminal;
}
//# sourceMappingURL=TerminalState.d.ts.map