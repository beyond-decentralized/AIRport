/// <reference types="node" />
import { IMessageFromTMDeserializer, IMessageFromTMVerifier, IMessageToTMSerializer, ISyncConnectionServer, ISyncConnectionVerifier, MessageFromTM, SerializedMessageFromTM } from '@airport/arrivals-n-departures';
import * as http from 'http';
import { ITuningSettings } from '../../model/TuningSettings';
import { ISyncConnectionProcessor } from './SyncConnectionProcessor';
export declare class SyncConnectionServer implements ISyncConnectionServer<http.IncomingMessage, http.ServerResponse, http.Server, NodeJS.Timer> {
    initialize(): Promise<void>;
    startProcessing(createServer: (requestListener: (request: http.IncomingMessage, response: http.ServerResponse) => void) => http.Server, portNumberToListenOn: number, setInterval: (callback: (...args: any[]) => void, ms: number) => NodeJS.Timer, intervalFrequencyMillis: number): void;
    processBatchedConnections(syncConnectionProcessor: ISyncConnectionProcessor, syncConnectionVerifier: ISyncConnectionVerifier, tuningSettings: ITuningSettings): Promise<void>;
    stopProcessing(): void;
    handleConnect(req: http.IncomingMessage, res: http.ServerResponse, ip: string, messageFromTMDeserializer: IMessageFromTMDeserializer, messageFromTMVerifier: IMessageFromTMVerifier, messageToTMSerializer: IMessageToTMSerializer, syncConnectionVerifier: ISyncConnectionVerifier): void;
    handleInMemoryConnect(messageFromTM: MessageFromTM, res: http.ServerResponse, syncConnectionVerifier: ISyncConnectionVerifier): void;
    handleConnection(req: http.IncomingMessage, res: http.ServerResponse, callback: (message: SerializedMessageFromTM) => void): void;
    private writeToConnection;
    private writeToInMemoryConnection;
    private connectionBlocked;
    private getIP;
    private blockBlacklisted;
    private block;
}
