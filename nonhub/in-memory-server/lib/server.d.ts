/// <reference types="node" />
import { BasicServer } from '@airport/processor-common';
import * as http from 'http';
export declare const server: BasicServer<http.Server>;
export interface ITransactionLogEntry {
    data: string;
    repositoryUuId: string;
    transactionLogEntryTime: number;
}
export declare function processSearchRequest(request: any, reply: any): void;
export declare function processUserRequest(request: any, reply: any, encryptionKey: any): void;
//# sourceMappingURL=server.d.ts.map