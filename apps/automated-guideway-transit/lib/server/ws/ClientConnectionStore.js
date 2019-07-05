/*
import { IBlacklist } from "@airport/ground-control";
import { IClientSyncConnection } from "../../clientConnection/ClientSyncConnection";
import { ClientConnectionState } from "../../model/ClientConnectionState";

export interface IClientConnectionStore {

    /!**
     * Brand new connections, that haven't had any messages on them yet are placed in
     * this collection.
     *!/
    pendingConnectionMap: { [pendingConnectionId: number]: IClientSyncConnection };

    /!**
     * Connections that received an authentication request, but haven't been verified
     * yet are placed in this collection.
     *!/
    unverifiedConnectionMap: { [pendingConnectionId: number]: IClientSyncConnection };

    /!**
     * Active (authenticated/verified) connections are placed in this map.
     *!/
    activeConnectionMap: { [terminalId: number]: IClientSyncConnection };

    addPendingConnection(
        clientConnection: IClientSyncConnection
    ): void;

    queueConnectionForVerification(
        clientConnection: IClientSyncConnection,
        terminalId: number,
    ): void;

    activateConnection(
        terminalId: number,
        userId: number,
    ): void;

    dropConnection(
        clientConnection: IClientSyncConnection,
        blacklist: boolean
    ): void;

}

export class ClientConnectionStore implements IClientConnectionStore {

    private pendingConnectionCounter: number = 0;

    constructor(
        private blacklist: IBlacklist
    ) {
    }

    private _activeConnectionMap: { [terminalId: number]: IClientSyncConnection } = {};

    get activeConnectionMap( //
    ): { [terminalId: number]: IClientSyncConnection } {
        return this._activeConnectionMap;
    }

    private _pendingConnectionMap: { [pendingConnectionId: number]: IClientSyncConnection } = {};

    get pendingConnectionMap( //
    ): { [pendingConnectionId: number]: IClientSyncConnection } {
        return this._pendingConnectionMap;
    }

    private _unverifiedConnectionMap: { [terminalId: number]: IClientSyncConnection } = {};

    get unverifiedConnectionMap( //
    ): { [terminalId: number]: IClientSyncConnection } {
        return this._unverifiedConnectionMap;
    }

    addPendingConnection(
        clientConnection: IClientSyncConnection
    ): void {
        clientConnection.connectionId = ++this.pendingConnectionCounter;
        this._pendingConnectionMap[clientConnection.connectionId] = clientConnection;
        clientConnection.state = ClientConnectionState.PENDING;
    }

    queueConnectionForVerification(
        clientConnection: IClientSyncConnection,
        terminalId: number,
    ): void {
        const connection: IClientSyncConnection = this._pendingConnectionMap[clientConnection.connectionId];
        if (!clientConnection) {
            throw new Error(
            `Cannot verify connection w/ id ${clientConnection.connectionId}.  It is not found in unverified connections.`);
        }
        delete this._pendingConnectionMap[clientConnection.connectionId];

        if (this._unverifiedConnectionMap[terminalId]) {
            throw new Error(
            `Cannot queue for verification a connection from terminal ${terminalId}, because it is already queued.`);
        }

        if (this._activeConnectionMap[terminalId]) {
            throw new Error(
            `Cannot queue for verification a connection from terminal ${terminalId}, because it is already active.`);
        }

        connection.connectionId = terminalId;
        this._unverifiedConnectionMap[terminalId] = connection;
        connection.state = ClientConnectionState.UNVERIFIED;
    }

    activateConnection(
        terminalId: number,
        userId: number,
    ): void {
        const connection: IClientSyncConnection = this._unverifiedConnectionMap[terminalId];
        if (!connection) {
            throw new Error(
            `Cannot activate connection from terminal id ${terminalId}.  It is not found in unverified connections.`);
        }
        delete this._unverifiedConnectionMap[terminalId];

        if (this._activeConnectionMap[terminalId]) {
            throw new Error(
            `Cannot activate a connection from terminal ${terminalId}, because it already exists.`);
        }

        connection.userId = userId;
        this._activeConnectionMap[terminalId] = connection;
        connection.state = ClientConnectionState.ACTIVE;
    }

    dropConnection(
        clientConnection: IClientSyncConnection,
        blacklist: boolean
    ): void {
        const terminalId = clientConnection.connectionId;
        const connection = this._activeConnectionMap[terminalId];
        if (this.dropConnectionFromCollection(
                terminalId, this._pendingConnectionMap, blacklist)) {
            return;
        }
        if (this.dropConnectionFromCollection(
                terminalId, this._unverifiedConnectionMap, blacklist)) {
            return;
        }
        if (this.dropConnectionFromCollection(
                terminalId, this._activeConnectionMap, blacklist)) {
            return;
        }

        throw new Error(
        `Cannot drop connection from terminal ${terminalId}. It is not in any maps.`);
    }

    private dropConnectionFromCollection(
        terminalId: number,
        collection: { [terminalId: number]: IClientSyncConnection },
        blacklist: boolean
    ) {
        const connection = collection[terminalId];
        if (connection) {
            delete collection[terminalId];
            connection.state = ClientConnectionState.INACTIVE;
            if (blacklist) {
                this.blacklist.blacklist(connection.ip);
            }
            return true;
        }

        return false;
    }

}
*/
//# sourceMappingURL=ClientConnectionStore.js.map