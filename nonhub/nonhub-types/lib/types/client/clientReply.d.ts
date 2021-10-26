import { TransactionLogs } from "../common";
export interface ReplyToClient {
    received: boolean;
}
export interface ReadReplyToClient extends ReplyToClient {
    records?: TransactionLogs[];
}
export interface SearchReplyToClient extends ReplyToClient {
}
export interface UserReplyToClient extends ReplyToClient {
}
export interface WriteReplyToClient extends ReplyToClient {
}
export interface ReplyHandle<Reply extends ReplyToClient> {
    send: (reply: Reply) => void;
}
export interface ReplyToClientContext<Reply extends ReplyToClient> {
    replyHandle: ReplyHandle<Reply>;
    responded: boolean;
}
export interface ReadReplyContext extends ReplyToClientContext<ReadReplyToClient> {
    records: TransactionLogs[];
}
export interface SearchReplyContext extends ReplyToClientContext<SearchReplyToClient> {
}
export interface UserReplyContext extends ReplyToClientContext<UserReplyToClient> {
}
export interface WriteReplyContext extends ReplyToClientContext<WriteReplyToClient> {
}
//# sourceMappingURL=clientReply.d.ts.map