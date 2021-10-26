import { ReadRequest, SearchRequest, UserRequest, WriteRequest } from "../client/clientRequest";
import { ReadReplyContext, ReadReplyToClient, ReplyToClient, ReplyToClientContext, SearchReplyContext, SearchReplyToClient, UserReplyContext, UserReplyToClient, WriteReplyContext, WriteReplyToClient } from "../client/clientReply";
import { BatchUuid } from "../common";
export interface BulkRequest<RequestRecordType> {
    records: RequestRecordType[];
    batchUuid: BatchUuid;
}
export interface RequestBatch<RequestRecordType, Reply extends ReplyToClient, ReplyContext extends ReplyToClientContext<Reply>> {
    requestData: BulkRequest<RequestRecordType>;
    replyContexts: {
        [uuid: string]: ReplyContext;
    };
}
export interface ReadRequestBatch extends RequestBatch<ReadRequest, ReadReplyToClient, ReadReplyContext> {
}
export interface SearchRequestBatch extends RequestBatch<SearchRequest, SearchReplyToClient, SearchReplyContext> {
}
export interface UserRequestBatch extends RequestBatch<UserRequest, UserReplyToClient, UserReplyContext> {
}
export interface WriteRequestBatch extends RequestBatch<WriteRequest, WriteReplyToClient, WriteReplyContext> {
}
//# sourceMappingURL=batchRequest.d.ts.map