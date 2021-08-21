import { TransactionalReceiver } from '@airport/terminal';
import { ITransactionalReceiver } from '@airport/terminal-map';
export declare class WebTransactionalReceiver extends TransactionalReceiver implements ITransactionalReceiver {
    dbName: string;
    serverUrl: string;
    WebTransactionalReceiver(): void;
}
export declare function injectTransactionalConnector(): void;
//# sourceMappingURL=WebTransactionalReceiver.d.ts.map