import {IShard} from "@airport/airport-code";
import {
	DatabaseId,
	IDatabaseSyncLogDao,
	IDatabaseSyncLogVerificationStageDao,
	InsertDatabaseSyncLog,
	InsertDatabaseSyncLogVerificationStage,
	InsertSyncLog,
	InsertSyncRecord,
	IServer,
	ISyncLogDao,
	ISyncRecordDao,
	RepositoryId,
	SyncRecordAddDatetime,
	SyncRecordTransactionData
} from "@airport/guideway";
import {Transactional} from "@airport/tower";
import * as http from "http";
import * as https from 'https';
import {IBlacklist} from "../clientConnection/Blacklist";
import {
	ClientInMessage,
	DatabaseInfo,
	DatabaseSyncAck,
	RepositoryUpdateRequest,
	VerifiedClientPollMessages,
} from "../model/ClientInMessage";
import {ConnectionDataCallback, MILLIS_IN_DAY} from "../model/ClientOutMessage";
import {ITuningSettings} from "../model/TuningSettings";
import {IDataProcessor} from "./DataProcessor";
import {IPollLoginVerifier} from "./PollLoginVerifier";
import {IShardCache} from "./ShardCache";

export interface IPollServer {

	startProcessing(
		createServer: (
			requestListener: (
				request: http.IncomingMessage,
				response: http.ServerResponse
			) => void
		) => http.Server,
		portNumberToListenOn: number,
		setInterval: (callback: (...args: any[]) => void, ms: number) => NodeJS.Timer,
		intervalFrequencyMillis: number,
	): void;

	stopProcessing( //
	): void;

}

export class PollServer
	implements IPollServer {

	minMillisSinceLastConnection: number = 300000;

	constructor(
		private ipBlacklist: IBlacklist<string>,
		private databaseSyncLogDao: IDatabaseSyncLogDao,
		private databaseSyncLogVerificationStageDao: IDatabaseSyncLogVerificationStageDao,
		private dataProcessor: IDataProcessor,
		private loginVerifier: IPollLoginVerifier,
		private server: IServer,
		private shardCache: IShardCache,
		private syncRecordDao: ISyncRecordDao,
		private syncLogDao: ISyncLogDao,
		private tuningSettings: ITuningSettings,
		private shard: IShard,
	) {
	}

	startProcessing(
		createServer: (
			requestListener: (
				request: http.IncomingMessage,
				response: http.ServerResponse
			) => void
		) => http.Server,
		portNumberToListenOn: number,
		setInterval: (callback: (...args: any[]) => void, ms: number) => NodeJS.Timer,
		intervalFrequencyMillis: number,
	): void {
		createServer((
			req: http.IncomingMessage,
			res: http.ServerResponse
		) => {
			const ip = this.getIP(req);
			if (this.connectionBlocked(req, res, ip)) {
				return;
			}

			switch (req.url) {
				case '/connect':
					this.handleConnect(req, res, ip);
					break;
				case '/refreshShards':
					// TODO: implement security checks
					this.shardCache.reloadShards().then();
					break;
				default:
					this.ipBlacklist.blacklist(ip);
					this.block(res);
			}
		}).listen(portNumberToListenOn);
		// this.jwtTokenProcessorClient.startProcessing();

		setInterval(() => {
			this.processBatchedConnections().then();
		}, this.tuningSettings.realtime.processingIntervalFrequencyMillis);

	}

	async processBatchedConnections( //
	): Promise<void> {
		const serverId = this.server.id;
		const verificationResults: VerifiedClientPollMessages
			= await this.loginVerifier.verifyPendingClaims(
			serverId, this.minMillisSinceLastConnection);

		// Wait for acked terminal sync logging so that it doesn't show up in returned results
		await this.logAckedDatabaseSyncs(serverId, verificationResults[0]);
		// Adding of incoming changes does not block further processing
		this.addRepositoryChanges(verificationResults[1], verificationResults[2], verificationResults[5]).then();

		const connectionDataCallbackMapByDatabaseId: Map<DatabaseId, ConnectionDataCallback> = null;

		await this.sendAllNewRealtimeChanges(verificationResults[3], verificationResults[4]);

		// Close all remaining (valid) connections
		for (const [databaseId, connectionDataCallback] of connectionDataCallbackMapByDatabaseId) {
			connectionDataCallback(databaseId, false, null);
		}
	}

	@Transactional()
	async logAckedDatabaseSyncs(
		serverId: number,
		databaseSyncLogVerificationStageDataInserts: InsertDatabaseSyncLogVerificationStage[]
	): Promise<void> {

		await this.databaseSyncLogVerificationStageDao.insertValues(
			databaseSyncLogVerificationStageDataInserts);
		await this.databaseSyncLogDao.updateToAckedForServer(serverId);
		await this.databaseSyncLogVerificationStageDao.deleteForServer(serverId);
	}

	@Transactional()
	async addRepositoryChanges(
		// values must be sorted by DatabaseId [1]
		syncRecordInserts: InsertSyncRecord[],
		databaseSyncLogInserts: InsertDatabaseSyncLog[],
		syncRecordAddDatetime: SyncRecordAddDatetime,
	): Promise<void> {
		const results = await Promise.all([
			this.syncRecordDao.insertValues(syncRecordInserts),
			this.databaseSyncLogDao.insertValues(databaseSyncLogInserts)
		]);
		const syncRecordMapByDatabaseId: Map<number, number[]> = results[0];
		const dbSyncLogMapByDatabaseId: Map<number, number> = results[1];
		// const syncRecordMapByDatabaseId = await
		// this.realtimeSyncDao.insertValues(changes); const dbSyncLogMapByDatabaseId =
		// await this.dbSyncLogDao.insertValues(dbSyncEntries);
		const realtimeSyncLogs: InsertSyncLog[] = [];
		for (const [databaseId, dbSyncLogId] of dbSyncLogMapByDatabaseId) {
			for (const syncRecordId of syncRecordMapByDatabaseId[databaseId]) {
				realtimeSyncLogs.push([dbSyncLogId, syncRecordId, syncRecordAddDatetime]);
			}
		}
		await this.syncLogDao.insertValues(realtimeSyncLogs);
	}

	async sendAllNewRealtimeChanges(
		databaseIds: DatabaseId[],
		connectionDataCallbackMapByDatabaseId: Map<DatabaseId, ConnectionDataCallback>,
	): Promise<void> {
		const partitionLimitingFromTime = new Date().getTime() - MILLIS_IN_DAY;
		await this.syncRecordDao.getAllUnreadChanges(
			partitionLimitingFromTime, databaseIds, true,
			this.tuningSettings.realtime.numSyncRecordsToReturnInCursor, (
				batchData: [DatabaseId, RepositoryId, SyncRecordAddDatetime, SyncRecordTransactionData][]
			) => {
				for (const unreadChange of batchData) {
					const databaseId = unreadChange[0];
					connectionDataCallbackMapByDatabaseId.get(databaseId)(databaseId, false, [
						unreadChange[1], unreadChange[2], unreadChange[3]
					]);
				}
			}
		)
	}

	stopProcessing( //
	): void {
	}

	private handleConnect(
		req: http.IncomingMessage,
		res: http.ServerResponse,
		ip: string
	): void {
		this.handleConnection(req, res, (
			message: ClientInMessage
		) => {
			const connectionDataCallback = (
				databaseId: DatabaseId,
				// token: JwtToken,
				writeHeaders: boolean,
				data: any,
				forwardToServerAddress?: string,
				mesageIn?: ClientInMessage,
			) => {
				this.writeToConnection(
					res, databaseId, writeHeaders, data, forwardToServerAddress, mesageIn);
			};
			let databaseInfo: DatabaseInfo;
			let repositoryChanges: RepositoryUpdateRequest[];
			let syncedDatabases: DatabaseSyncAck[];
			// Verify input
			if (!(message instanceof Array)
				|| message.length !== 4
				|| typeof message[0] !== 'number'
				|| !((databaseInfo = message[1]) instanceof Array)
				|| databaseInfo.length != 3
				|| databaseInfo.some(databaseInfoField =>
					typeof databaseInfo !== 'number'
					|| typeof databaseInfo !== 'number'
					|| typeof databaseInfo !== 'string'
				)
				|| !((repositoryChanges = message[2]) instanceof Array)
				|| repositoryChanges.length > 1000
				|| repositoryChanges.some(repoData =>
					!(repoData instanceof Array)
					|| repoData.length !== 3
					|| typeof repoData[0] !== 'number'
					|| typeof repoData[1] !== 'number'
					|| typeof repoData[2] !== 'string'
				)
				|| !((syncedDatabases = message[3]) instanceof Array)
				|| syncedDatabases.length > 10000
				|| !syncedDatabases.some(databaseSyncData =>
					!(databaseSyncData instanceof Array)
					|| databaseSyncData.length !== 2
					|| typeof databaseSyncData[0] !== 'number'
					|| typeof databaseSyncData[1] !== 'number'
				)) {
				connectionDataCallback(null, false, null);
			}
			this.loginVerifier.queueLoginClaim([
				message, connectionDataCallback, new Date().getTime()
			]);
		});
	}

	private writeToConnection(
		res: http.ServerResponse,
		databaseId: DatabaseId,
		// token: JwtToken,
		writeHeaders: boolean,
		data: any,
		forwardToServerAddress?: string,
		mesageIn?: ClientInMessage,
	): void {
		if (!databaseId) {
			this.block(res);
		}
		if (writeHeaders) {
			res.writeHead(200, {
				// "Set-Cookie": token + ", HTTP Only, Secure"
			});
		} else if (data) {
			res.write(data);
		} else if (forwardToServerAddress) {
			res.writeHead(200, {
				// "Set-Cookie": token + ", HTTP Only, Secure"
			});
			data = JSON.stringify(mesageIn);
			// TODO: implement authentication between server shards
			var options = {
				hostname: forwardToServerAddress,
				port: 443,
				path: '/connect',
				method: 'POST',
				auth: this.shard.id + ':' + this.shard.secret,
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': data.length,
			};
			const postRequest = https.request(options, (resp) => {
				resp.on('data', (chunk) => {
					res.write(chunk);
				});
				resp.on('end', () => {
					res.end();
				});
			}).on("error", (err) => {
				console.log("Error: " + err.message);
				res.end();
			});
			postRequest.write(data);
			postRequest.end();
		} else {
			res.end();
		}
	}

	private handleConnection(
		req: http.IncomingMessage,
		res: http.ServerResponse,
		callback: (
			message: ClientInMessage
		) => void,
	): void {
		const body = [];
		let bodyString;
		req.on('error', (err) => {
			// This prints the error message and stack trace to `stderr`.
			console.error(err.stack);
		}).on('data', (chunk) => {
			body.push(chunk);
		}).on('end', () => {
			res.on('error', (err) => {
				// This prints the error message and stack trace to `stderr`.
				console.error(err.stack);
			});
			try {
				bodyString = Buffer.concat(body).toString();
				const message: ClientInMessage = JSON.parse(bodyString);
				callback(message);
			} catch (err) {
				console.error(err.stack);
			}
		});
	}

	/*
		private getCookies(
			cookieString: string
		): { [key: string]: string } {
			const cookieList = {};
			cookieString && cookieString.split(';').forEach(
				cookie => {
					const cookieKeyValue = cookie.split('=');
					// cookieList[cookieKeyValue.shift().trim()] =
					// decodeURI(cookieKeyValue.join('='));
					cookieList[cookieKeyValue[0]] = cookieKeyValue[1];
				});

			return cookieList;
		}
	*/

	private connectionBlocked(
		req: http.IncomingMessage,
		res: http.ServerResponse,
		ip: string
	) {
		if (this.blockBlacklisted(ip, res)) {
			return true;
		}
		if (req.method !== 'PUT') {
			this.ipBlacklist.blacklist(ip);
			this.block(res);
			return true;
		}
		return false;
	}

	private getIP(
		req: http.IncomingMessage
	): string {
		// https://stackoverflow.com/questions/38621921/best-way-to-get-the-ip-address-of-client-is-req-ip-or-req-connection-remoteaddre
		// req.ip || req.connection.remoteAddress;
		const ip = req.connection.remoteAddress;
		// If the server is behind a proxy
		// ip = request.headers['x-forwarded-for']

		return ip;
	}

	private blockBlacklisted(
		ip: string,
		res: http.ServerResponse,
	): boolean {
		if (this.ipBlacklist.isBlacklisted(ip)) {
			this.block(res);
			return true;
		}
		return false;
	}

	private block(
		res: http.ServerResponse,
	) {
		res.statusCode = 555;
		res.end();
	}

	/*
		private sessionWithInvalidTokenBlocked(
			req: http.IncomingMessage,
			res: http.ServerResponse,
		): boolean {
			return true;
		}
	*/

	/*
		private invalidSessionToken(): boolean {
			// TODO: verify session token
			//req.headers.SessionToken;
			return true;
		}
	*/

}