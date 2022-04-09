import { ILocalAPIRequest } from '@airport/aviation-communication';
import { FullApplicationName } from '@airport/ground-control';
import { IIsolateMessage, IIsolateMessageOut } from '@airport/security-check';
import { IApiCallContext } from '@airport/terminal-map';
export declare abstract class TransactionalReceiver {
    initializingApps: Set<string>;
    handleApiCall(message: ILocalAPIRequest, fullApplicationName: FullApplicationName, fromClient: boolean, context: IApiCallContext, nativeHandleCallback: () => void): Promise<boolean>;
    abstract nativeHandleApiCall(message: ILocalAPIRequest, fullApplicationName: FullApplicationName, fromClient: boolean, context: IApiCallContext): Promise<boolean>;
    processMessage<ReturnType extends IIsolateMessageOut<any>>(message: IIsolateMessage): Promise<ReturnType>;
}
//# sourceMappingURL=TransactionalReceiver.d.ts.map