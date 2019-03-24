import {
	ConnectionDataCallback,
	IBlacklist,
	IMessageFromTMDeserializer,
	IMessageFromTMVerifier,
	IMessageToTMSerializer,
	ISyncConnectionServer,
	ISyncConnectionVerifier,
	MESSAGE_FROM_TM_DESERIALIZER,
	MESSAGE_FROM_TM_VERIFIER,
	MESSAGE_TO_TM_SERIALIZER,
	MessageFromTM,
	MessageToTM,
	SerializedMessageFromTM,
	SYNC_CONNECTION_SERVER,
	TerminalId,
	TmToAgtProtocolVersion
}                                 from '@airport/arrivals-n-departures'
import {DI}                       from '@airport/di'
import {
	AGT_REPO_TRANS_BLOCK_DAO,
	AGT_SHARING_MESSAGE_DAO,
	IAgtRepositoryTransactionBlockDao,
	IAgtSharingMessageDao,
	ISyncLogDao,
	SYNC_LOG_DAO
}                                 from '@airport/guideway'
import * as http                  from 'http'
import {
	AGTLogger,
	BLACKLIST,
	SYNC_CONNECTION_PROCESSOR,
	SYNC_CONNECTION_VERIFIER,
	TUNNING_SETTINGS
}                                 from '../../diTokens'
import {ITuningSettings}          from '../../model/TuningSettings'
import {ISyncConnectionProcessor} from './SyncConnectionProcessor'

const log = AGTLogger.add('SyncConnectionServer')

export class SyncConnectionServer
	implements ISyncConnectionServer<http.IncomingMessage, http.ServerResponse, http.Server, NodeJS.Timer> {

	private ipBlacklist: IBlacklist<string>
	private agtSharingMessageDao: IAgtSharingMessageDao
	private messageFromTMVerifier: IMessageFromTMVerifier
	private messageFromTMDeserializer: IMessageFromTMDeserializer
	private messageToTMSerializer: IMessageToTMSerializer
	private syncConnectionProcessor: ISyncConnectionProcessor
	private syncConnectionVerifier: ISyncConnectionVerifier
	private agtRepositoryTransactionBlockDao: IAgtRepositoryTransactionBlockDao
	private syncLogDao: ISyncLogDao
	private tuningSettings: ITuningSettings

	constructor() {
		DI.get((
			ipBlacklist,
			agtSharingMessageDao,
			messageFromTMVerifier,
			messageFromTMDeserializer,
			messageToTMSerializer,
			syncConnectionProcessor,
			syncConnectionVerifier,
			agtRepositoryTransactionBlockDao,
			syncLogDao,
			tuningSettings
			) => {
				this.ipBlacklist                      = ipBlacklist
				this.agtSharingMessageDao             = agtSharingMessageDao
				this.messageFromTMVerifier            = messageFromTMVerifier
				this.messageFromTMDeserializer        = messageFromTMDeserializer
				this.messageToTMSerializer            = messageToTMSerializer
				this.syncConnectionProcessor          = syncConnectionProcessor
				this.syncConnectionVerifier           = syncConnectionVerifier
				this.agtRepositoryTransactionBlockDao = agtRepositoryTransactionBlockDao
				this.syncLogDao                       = syncLogDao
				this.tuningSettings                   = tuningSettings
			}, BLACKLIST, AGT_SHARING_MESSAGE_DAO,
			MESSAGE_FROM_TM_VERIFIER, MESSAGE_FROM_TM_DESERIALIZER,
			MESSAGE_TO_TM_SERIALIZER, SYNC_CONNECTION_PROCESSOR,
			SYNC_CONNECTION_VERIFIER, AGT_REPO_TRANS_BLOCK_DAO,
			SYNC_LOG_DAO, TUNNING_SETTINGS)
	}

	async initialize() {
	}

	startProcessing(
		createServer: (
			requestListener: (
				request: http.IncomingMessage,
				response: http.ServerResponse
			) => void
		) => http.Server,
		portNumberToListenOn: number,
		setInterval: (
			callback: (...args: any[]) => void,
			ms: number
		) => NodeJS.Timer,
		intervalFrequencyMillis: number,
	): void {
		createServer((
			req: http.IncomingMessage,
			res: http.ServerResponse
		) => {
			const ip = this.getIP(req)
			if (this.connectionBlocked(req, res, ip)) {
				return
			}

			switch (req.url) {
				case '/connect':
					this.handleConnect(req, res, ip)
					break
				default:
					this.ipBlacklist.blacklist(ip)
					this.block(res)
			}
		}).listen(portNumberToListenOn)
		// this.jwtTokenProcessorClient.startProcessing();

		// TODO: implement smarter batching, if a batch got kicked off mid-interval.
		// Dont' call next batch until the interval time from the last forced batch kickoff.
		setInterval(() => {
			this.processBatchedConnections().then()
		}, this.tuningSettings.recent.incomingBatchFrequencyMillis)

	}

	async processBatchedConnections( //
	): Promise<void> {
		// const serverId: ServerId = this.server.id;

		const verifiedMessagesFromTM
			      = await this.syncConnectionVerifier.verifyPendingClaims(
			// serverId,
			this.tuningSettings.recent.minMillisSinceLastConnection)

		await this.syncConnectionProcessor.processConnections(verifiedMessagesFromTM)

		// Close all remaining (valid) connections
		for (const [terminalId, connectionClaim]
			of verifiedMessagesFromTM.syncConnectionClaimsByTmId) {
			connectionClaim.connectionDataCallback(terminalId, false, null)
		}
	}

	stopProcessing( //
	): void {
	}

	// TODO: implement kicking off a new batch if max records counts are over the
	// configured values.
	handleConnect(
		req: http.IncomingMessage,
		res: http.ServerResponse,
		ip: string
	): void {
		this.handleConnection(req, res, (
			message: SerializedMessageFromTM
		) => {
			const connectionDataCallback: ConnectionDataCallback = (
				terminalId: TerminalId,
				// token: JwtToken,
				writeHeaders: boolean,
				data: MessageToTM,
			) => {
				this.writeToConnection(
					res, terminalId, writeHeaders, data)
			}
			let maxSingleRepoChangeLength                        = Number.MAX_SAFE_INTEGER //1048576;
			let maxAllRepoChangesLength                          = Number.MAX_SAFE_INTEGER //10485760;

			const schemaValidationResult = this.messageFromTMVerifier.verifyMessage(
				message, maxAllRepoChangesLength, maxSingleRepoChangeLength)

			const connectionDataError = schemaValidationResult[0]
			if (connectionDataError) {
				log.error(`
	Message from TM validation error:
		Invalid sync message data schema:
				Error Code:    {1}
				Evaluation:    {2}
				Data index:    {3}
				`,
					connectionDataError,
					schemaValidationResult[1],
					schemaValidationResult[2]
				)
				connectionDataCallback(null, false, null)
			}
			const messageFromTM = this.messageFromTMDeserializer.deserialize(message)
			this.syncConnectionVerifier.queueConnectionClaim({
				messageFromTM,
				connectionDataCallback,
				loginClaimReceptionTime: new Date().getTime()
			})
		})
	}

	handleInMemoryConnect(
		messageFromTM: MessageFromTM,
		res: http.ServerResponse,
	): void {
		const connectionDataCallback: ConnectionDataCallback = (
			terminalId: TerminalId,
			// token: JwtToken,
			writeHeaders: boolean,
			data: MessageToTM,
		) => {
			this.writeToInMemoryConnection(
				res, terminalId, writeHeaders, data)
		}
		this.syncConnectionVerifier.queueConnectionClaim({
			messageFromTM,
			connectionDataCallback,
			loginClaimReceptionTime: new Date().getTime()
		})
	}

	handleConnection(
		req: http.IncomingMessage,
		res: http.ServerResponse,
		callback: (
			message: SerializedMessageFromTM
		) => void,
	): void {
		const body = []
		let bodyString
		req.on('error', (err) => {
			// This prints the error message and stack trace to `stderr`.
			console.error(err.stack)
		}).on('data', (chunk) => {
			body.push(chunk)
		}).on('end', () => {
			res.on('error', (err) => {
				// This prints the error message and stack trace to `stderr`.
				console.error(err.stack)
			})
			try {
				bodyString                             = Buffer.concat(body).toString()
				const message: SerializedMessageFromTM = JSON.parse(bodyString)
				callback(message)
			} catch (err) {
				console.error(err.stack)
			}
		})
	}

	private writeToConnection(
		res: http.ServerResponse,
		terminalId: TerminalId,
		writeHeaders: boolean,
		data: MessageToTM,
	): void {
		if (!terminalId) {
			this.block(res)
		}
		if (writeHeaders) {
			res.writeHead(200, {
				// "Set-Cookie": token + ", HTTP Only, Secure"
			})
			const protocolVersion: TmToAgtProtocolVersion = 0
			// protocol version
			res.write('[' + protocolVersion)
		} else if (data) {
			res.write(',')
			const serializedMessage = this.messageToTMSerializer.serializeAMessage(data)
			res.write(JSON.stringify(serializedMessage))
		} else {
			res.write(']')
			res.end()
		}
	}

	private writeToInMemoryConnection(
		res: http.ServerResponse,
		terminalId: TerminalId,
		writeHeaders: boolean,
		data: MessageToTM,
	): void {
		if (!terminalId) {
			this.block(res)
		}
		if (writeHeaders) {
			res.writeHead(200, {
				// "Set-Cookie": token + ", HTTP Only, Secure"
			})
			const protocolVersion: TmToAgtProtocolVersion = 0
			// protocol version
		} else if (data) {
			res.write(data)
		} else {
			res.end()
		}
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
			return true
		}
		if (req.method !== 'PUT') {
			this.ipBlacklist.blacklist(ip)
			this.block(res)
			return true
		}
		return false
	}

	private getIP(
		req: http.IncomingMessage
	): string {
		// https://stackoverflow.com/questions/38621921/best-way-to-get-the-ip-address-of-client-is-req-ip-or-req-connection-remoteaddre
		// req.ip || req.connection.remoteAddress;
		const ip = req.connection.remoteAddress
		// If the server is behind a proxy
		// ip = request.headers['x-forwarded-for']

		return ip
	}

	private blockBlacklisted(
		ip: string,
		res: http.ServerResponse,
	): boolean {
		if (this.ipBlacklist.isBlacklisted(ip)) {
			this.block(res)
			return true
		}
		return false
	}

	private block(
		res: http.ServerResponse,
	) {
		res.statusCode = 555
		res.end()
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

DI.set(SYNC_CONNECTION_SERVER, SyncConnectionServer)
