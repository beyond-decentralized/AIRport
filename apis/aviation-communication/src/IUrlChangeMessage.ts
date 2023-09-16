import { IInternalMessage } from "./IMessage";

export type UI_URL = string

export interface IUrlChangeMessage extends IInternalMessage {
    newUrl: UI_URL
}
