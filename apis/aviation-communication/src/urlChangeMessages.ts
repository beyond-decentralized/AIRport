import { IInternalMessage } from "./IMessage";

export type UI_URL = string

export interface IUrlChangeMessage extends IInternalMessage {
    newUrl: UI_URL
}

export interface IChangeUrlMessage extends IInternalMessage {
    changeToUrl: UI_URL
}
