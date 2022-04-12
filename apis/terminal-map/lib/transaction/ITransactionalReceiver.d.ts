import { IApiIMI, IIsolateMessage } from "@airport/security-check";
import { ILocalAPIRequest, ILocalAPIResponse } from "@airport/aviation-communication";
export interface ITransactionalReceiver {
    handleClientRequest(message: ILocalAPIRequest): void;
    handleAppRequest(message: (IIsolateMessage & IApiIMI) | ILocalAPIResponse, messageOrigin: string, source: any): void;
    onMessage(callback: (message: any) => void): any;
}
//# sourceMappingURL=ITransactionalReceiver.d.ts.map