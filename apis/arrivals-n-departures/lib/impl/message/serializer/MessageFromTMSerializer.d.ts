import { MessageFromTM, SerializedMessageFromTM } from '../../../lingo/lingo';
export interface IMessageFromTMSerializer {
    serialize(messageFromTM: MessageFromTM): SerializedMessageFromTM;
}
export declare class MessageFromTMSerializer implements IMessageFromTMSerializer {
    serialize(messageFromTM: MessageFromTM): SerializedMessageFromTM;
}
//# sourceMappingURL=MessageFromTMSerializer.d.ts.map