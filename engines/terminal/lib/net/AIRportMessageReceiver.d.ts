import { ILocalAPIRequest } from "@airport/autopilot";
export interface IAIRportMessageReceiver {
    handleMessage(message: ILocalAPIRequest, messageOrigin: string): void;
}
export declare class AIRportMessageReceiver implements AIRportMessageReceiver {
    handleMessage(message: ILocalAPIRequest, messageOrigin: string): void;
}
//# sourceMappingURL=AIRportMessageReceiver.d.ts.map