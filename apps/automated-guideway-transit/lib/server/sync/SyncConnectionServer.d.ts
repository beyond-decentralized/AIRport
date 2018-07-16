/// <reference types="node" />
import { IBlacklist, IMessageFromTMDeserializer, IMessageFromTMVerifier, IMessageToTMSerializer, ISyncConnectionServer, ISyncConnectionVerifier, MessageFromTM, SerializedMessageFromTM } from "@airport/arrivals-n-departures";
import { IAgtSharingMessageDao, ISyncLogDao, IAgtRepositoryTransactionBlockDao } from "@airport/guideway";
import * as http from "http";
import { ITuningSettings } from "../../model/TuningSettings";
import { ISyncConnectionProcessor } from "./SyncConnectionProcessor";
export declare class SyncConnectionServer implements ISyncConnectionServer<http.IncomingMessage, http.ServerResponse, http.Server, NodeJS.Timer> {
    private ipBlacklist;
    private agtSharingMessageDao;
    private messageFromTMVerifier;
    private messageFromTMDeserializer;
    private messageToTMSerializer;
    private syncConnectionProcessor;
    private syncConnectionVerifier;
    private agtRepositoryTransactionBlockDao;
    private syncLogDao;
    private tuningSettings;
    constructor(ipBlacklist: IBlacklist<string>, agtSharingMessageDao: IAgtSharingMessageDao, messageFromTMVerifier: IMessageFromTMVerifier, messageFromTMDeserializer: IMessageFromTMDeserializer, messageToTMSerializer: IMessageToTMSerializer, syncConnectionProcessor: ISyncConnectionProcessor, syncConnectionVerifier: ISyncConnectionVerifier, agtRepositoryTransactionBlockDao: IAgtRepositoryTransactionBlockDao, syncLogDao: ISyncLogDao, tuningSettings: ITuningSettings);
    initialize(): Promise<void>;
    startProcessing(createServer: (requestListener: (request: http.IncomingMessage, response: http.ServerResponse) => void) => http.Server, portNumberToListenOn: number, setInterval: (callback: (...args: any[]) => void, ms: number) => NodeJS.Timer, intervalFrequencyMillis: number): void;
    processBatchedConnections(): Promise<void>;
    stopProcessing(): void;
    handleConnect(req: http.IncomingMessage, res: http.ServerResponse, ip: string): void;
    handleInMemoryConnect(messageFromTM: MessageFromTM, res: http.ServerResponse): void;
    handleConnection(req: http.IncomingMessage, res: http.ServerResponse, callback: (message: SerializedMessageFromTM) => void): void;
    private writeToConnection;
    private writeToInMemoryConnection;
    private connectionBlocked;
    private getIP;
    private blockBlacklisted;
    private block;
}
