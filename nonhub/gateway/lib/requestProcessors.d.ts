import { ReadRequestBatch, SearchRequestBatch, UserRequestBatch } from '@airport/nonhub-types';
export declare function processReadRequest(request: any, reply: any, currentReadBatch: ReadRequestBatch): void;
export declare function processSearchRequest(request: any, reply: any, currentSearchBatch: SearchRequestBatch): void;
export declare function processUserRequest(request: any, reply: any, currentUserBatch: UserRequestBatch): void;
export declare function processWriteRequest(request: any, reply: any, masterKey: any, requestHost: any): void;
//# sourceMappingURL=requestProcessors.d.ts.map