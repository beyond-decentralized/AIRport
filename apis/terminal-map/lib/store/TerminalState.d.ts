import { IActor } from '@airport/holding-pattern';
import type { IDomain, ISchema } from '@airport/traffic-pattern';
import type { ITerminal } from '@airport/travel-document-checkpoint';
export interface ITerminalState {
    applicationActors: IActor[];
    domains: IDomain[];
    frameworkActor: IActor;
    schemas: ISchema[];
    terminal: ITerminal;
}
//# sourceMappingURL=TerminalState.d.ts.map