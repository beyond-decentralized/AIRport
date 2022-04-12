import { IActor } from '@airport/holding-pattern';
import type { IDomain, IApplication } from '@airport/airspace';
import type { ITerminal } from '@airport/travel-document-checkpoint-internal';
import { InternalConnectorStore, IReceiverStore, ITransactionManagerStore, IWebReceiverStore } from './TerminalStore';
export interface ITerminalState {
    applicationActors: IActor[];
    applications: IApplication[];
    domains: IDomain[];
    frameworkActor: IActor;
    internalConnector: InternalConnectorStore;
    receiver: IReceiverStore;
    terminal: ITerminal;
    transactionManager: ITransactionManagerStore;
    webReceiver: IWebReceiverStore;
}
//# sourceMappingURL=TerminalState.d.ts.map