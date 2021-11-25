/// <reference types="node" />
import { BasicServer } from '@airport/processor-common';
import type { FastifyLoggerInstance } from 'fastify';
import * as http from 'http';
export declare const server: BasicServer<http.Server, http.IncomingMessage, http.ServerResponse, FastifyLoggerInstance>;
export interface ITransactionLogEntry {
    data: string;
    repositoryUuId: string;
    transactionLogEntryTime: number;
}
export declare function processSearchRequest(request: any, reply: any): void;
export declare function processUserRequest(request: any, reply: any, masterKey: any): void;
//# sourceMappingURL=server.d.ts.map