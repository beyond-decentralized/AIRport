import { IActor } from '@airport/holding-pattern';
import type { IDomain, IApplication } from '@airport/airspace';
import type { ITerminal } from '@airport/travel-document-checkpoint-internal';
import { FullApplicationName } from '@airport/ground-control';
import { ITransaction } from '../transaction/ITransaction';
export interface ITerminalState {
    applicationActors: IActor[];
    applications: IApplication[];
    domains: IDomain[];
    frameworkActor: IActor;
    initializedApps: Set<FullApplicationName>;
    initializingApps: Set<FullApplicationName>;
    terminal: ITerminal;
    transactionMapById: Map<string, ITransaction>;
}
//# sourceMappingURL=TerminalState.d.ts.map