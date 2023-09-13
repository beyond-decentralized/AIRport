import { IInternalMessage } from "./IMessage";

export interface IUrlChangeMessage extends IInternalMessage {
    newUrl: string
}
