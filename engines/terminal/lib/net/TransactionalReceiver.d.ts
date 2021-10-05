import { IIsolateMessage, IIsolateMessageOut } from '@airport/security-check';
export declare abstract class TransactionalReceiver {
    initializingApps: Set<string>;
    initializedApps: Set<string>;
    processMessage<ReturnType extends IIsolateMessageOut<any>>(message: IIsolateMessage): Promise<ReturnType>;
}
//# sourceMappingURL=TransactionalReceiver.d.ts.map