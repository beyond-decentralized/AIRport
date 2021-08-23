import { TransactionalReceiver } from '@airport/terminal';
import { ITransactionalReceiver } from '@airport/terminal-map';
import { Subscription } from 'rxjs';
export declare class WebTransactionalReceiver extends TransactionalReceiver implements ITransactionalReceiver {
    dbName: string;
    serverUrl: string;
    subsriptionMap: Map<string, Map<number, Subscription>>;
    WebTransactionalReceiver(): void;
}
export declare function injectTransactionalConnector(): void;
//# sourceMappingURL=WebTransactionalReceiver.d.ts.map