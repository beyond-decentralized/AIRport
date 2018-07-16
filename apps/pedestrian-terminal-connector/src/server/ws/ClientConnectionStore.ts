import { IBlacklist } from "../clientConnection/Blacklist";
import { IClientSyncConnection } from "../clientConnection/ClientSyncConnection";
import { ClientConnectionState } from "../model/ClientConnectionState";

export interface IClientConnectionStore {

	/**
	 * Brand new connections, that haven't had any messages on them yet are placed in
	 * this collection.
	 */
	pendingConnectionMap: { [pendingConnectionId: number]: IClientSyncConnection };

	/**
	 * Connections that received an authentication request, but haven't been verified
	 * yet are placed in this collection.
	 */
	unverifiedConnectionMap: { [pendingConnectionId: number]: IClientSyncConnection };

	/**
	 * Active (authenticated/verified) connections are placed in this map.
	 */
	activeConnectionMap: { [databaseId: number]: IClientSyncConnection };

	addPendingConnection(
		clientConnection: IClientSyncConnection
	): void;

	queueConnectionForVerification(
		clientConnection: IClientSyncConnection,
		databaseId: number,
	): void;

	activateConnection(
		databaseId: number,
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

	private _activeConnectionMap: { [databaseId: number]: IClientSyncConnection } = {};

	get activeConnectionMap( //
	): { [databaseId: number]: IClientSyncConnection } {
		return this._activeConnectionMap;
	}

	private _pendingConnectionMap: { [pendingConnectionId: number]: IClientSyncConnection } = {};

	get pendingConnectionMap( //
	): { [pendingConnectionId: number]: IClientSyncConnection } {
		return this._pendingConnectionMap;
	}

	private _unverifiedConnectionMap: { [databaseId: number]: IClientSyncConnection } = {};

	get unverifiedConnectionMap( //
	): { [databaseId: number]: IClientSyncConnection } {
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
		databaseId: number,
	): void {
		const connection: IClientSyncConnection = this._pendingConnectionMap[clientConnection.connectionId];
		if (!clientConnection) {
			throw `Cannot verify connection w/ id ${clientConnection.connectionId}.  It is not found in unverified connections.`;
		}
		delete this._pendingConnectionMap[clientConnection.connectionId];

		if (this._unverifiedConnectionMap[databaseId]) {
			throw `Cannot queue for verification a connection from database ${databaseId}, because it is already queued.`;
		}

		if (this._activeConnectionMap[databaseId]) {
			throw `Cannot queue for verification a connection from database ${databaseId}, because it is already active.`;
		}

		connection.connectionId = databaseId;
		this._unverifiedConnectionMap[databaseId] = connection;
		connection.state = ClientConnectionState.UNVERIFIED;
	}

	activateConnection(
		databaseId: number,
		userId: number,
	): void {
		const connection: IClientSyncConnection = this._unverifiedConnectionMap[databaseId];
		if (!connection) {
			throw `Cannot activate connection from database id ${databaseId}.  It is not found in unverified connections.`;
		}
		delete this._unverifiedConnectionMap[databaseId];

		if (this._activeConnectionMap[databaseId]) {
			throw `Cannot activate a connection from database ${databaseId}, because it already exists.`;
		}

		connection.userId = userId;
		this._activeConnectionMap[databaseId] = connection;
		connection.state = ClientConnectionState.ACTIVE;
	}

	dropConnection(
		clientConnection: IClientSyncConnection,
		blacklist: boolean
	): void {
		const databaseId = clientConnection.connectionId;
		const connection = this._activeConnectionMap[databaseId];
		if (this.dropConnectionFromCollection(
				databaseId, this._pendingConnectionMap, blacklist)) {
			return;
		}
		if (this.dropConnectionFromCollection(
				databaseId, this._unverifiedConnectionMap, blacklist)) {
			return;
		}
		if (this.dropConnectionFromCollection(
				databaseId, this._activeConnectionMap, blacklist)) {
			return;
		}

		throw `Cannot drop connection from database ${databaseId}. It is not in any maps.`;
	}

	private dropConnectionFromCollection(
		databaseId: number,
		collection: { [databaseId: number]: IClientSyncConnection },
		blacklist: boolean
	) {
		const connection = collection[databaseId];
		if (connection) {
			delete collection[databaseId];
			connection.state = ClientConnectionState.INACTIVE;
			if (blacklist) {
				this.blacklist.blacklist(connection.ip);
			}
			return true;
		}

		return false;
	}

}
