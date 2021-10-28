import { ReadRequestBatch, SearchRequestBatch, WriteRequest } from '@airport/nonhub-types';
export declare function processReadRequest(request: any, reply: any, currentReadBatch: ReadRequestBatch): void;
export declare function processSearchRequest(request: any, reply: any, currentSearchBatch: SearchRequestBatch): void;
export declare function processUserRequest(request: any, reply: any, masterKey: any): void;
export declare function processWriteRequest(request: any, reply: any, masterKey: any, requestHost: any): void;
export declare function doProcessWriteRequestAsync<WR extends WriteRequest>(writeRequest: WR, reply: any, masterKey: any, requestHost: any): Promise<void>;
//# sourceMappingURL=requestProcessors.d.ts.map