import { TransactionalReceiver } from '@airport/terminal';
import { ITransactionalReceiver } from '@airport/terminal-map';
import { Subscription } from 'rxjs';
export declare class WebTransactionalReceiver extends TransactionalReceiver implements ITransactionalReceiver {
    dbName: string;
    domainPrefix: string;
    mainDomainFragments: string[];
    serverUrl: string;
    subsriptionMap: Map<string, Map<number, Subscription>>;
    pendingFromAppMessageIds: Map<string, Map<string, Set<string>>>;
    pendingHostCounts: Map<string, number>;
    pendingSchemaCounts: Map<string, number>;
    installedSchemaFrames: Set<string>;
    constructor();
    private hasValidSchemaSignature;
    private handleFromAppRequest;
    private handleToAppRequest;
    private ensureSchemaIsInstalled;
    private messageIsFromValidSchema;
    private handleIsolateMessage;
}
export declare function injectTransactionalReceiver(): void;
//# sourceMappingURL=WebTransactionalReceiver.d.ts.map