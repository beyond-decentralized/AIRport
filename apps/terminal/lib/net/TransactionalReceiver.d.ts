import { IIsolateMessage, IIsolateMessageOut } from '@airport/security-check';
export declare abstract class TransactionalReceiver {
    processMessage<ReturnType extends IIsolateMessageOut<any>>(message: IIsolateMessage): Promise<ReturnType>;
}
//# sourceMappingURL=TransactionalReceiver.d.ts.map