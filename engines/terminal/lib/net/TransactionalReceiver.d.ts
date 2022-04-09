import { ILocalAPIRequest } from '@airport/aviation-communication';
import { IIsolateMessage, IIsolateMessageOut } from '@airport/security-check';
import { IApiCallContext } from '@airport/terminal-map';
export declare abstract class TransactionalReceiver {
    initializingApps: Set<string>;
    handleApiCall(message: ILocalAPIRequest, fromClient: boolean, context: IApiCallContext, nativeHandleCallback: () => void): Promise<boolean>;
    processMessage<ReturnType extends IIsolateMessageOut<any>>(message: IIsolateMessage): Promise<ReturnType>;
}
//# sourceMappingURL=TransactionalReceiver.d.ts.map