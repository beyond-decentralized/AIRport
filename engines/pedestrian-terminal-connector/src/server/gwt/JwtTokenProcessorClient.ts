/*
import { DatabaseId } from "../../model/ClientInMessage";
import {
	CallbackId,
	CheckTokensCallback,
	ConnectionData,
	ConnectionDataCallback,
	JwtPerTokenMessageOut,
	JwtToken,
	JwtTokenMessageIn,
	JwtTokenMessageOut,
	JwtTokenMessageType
} from "../../model/JwtTokenMessage";

export interface IJwtTokenProcessorClient {

	startProcessing( //
	): void;

	processJwtTokenCreates(
		databaseIds: DatabaseId[],
		connectionDataCallbacks: ConnectionDataCallback[],
		checkTokenCallback: CheckTokensCallback,
	): void;

	processJwtTokenUpdates(
		tokensToCheck: JwtToken[],
		connectionDataCallbacks: ConnectionDataCallback[],
		checkTokenCallback: CheckTokensCallback,
	): void;

}

export class JwtTokenProcessorClient
	implements IJwtTokenProcessorClient {

	private checkTokenCallbackMap: Map<CallbackId, [
		ConnectionDataCallback[],
		CheckTokensCallback
		]> = new Map();
	private currCallbackId: CallbackId = 0;

	constructor(
		private childProcess,
	) {
	}

	startProcessing(): void {
		this.childProcess.on('message', (
			message: JwtTokenMessageOut
		) => {
			const callbackData = this.checkTokenCallbackMap.get(<CallbackId>message[0]);
			const callbacks = <ConnectionDataCallback[]>callbackData[0];
			const connectionData: ConnectionData[] = [];
			const tokenMessages: JwtPerTokenMessageOut[] = <JwtPerTokenMessageOut[]>message[1];

			for (let i = 0; i < tokenMessages.length; i++) {
				const checkTokenMessage = tokenMessages[i];
				const callback = callbacks[i];
				const databaseId: DatabaseId = checkTokenMessage[0];
				if (databaseId) {
					callback(databaseId, <JwtToken>checkTokenMessage[1], null);
					connectionData.push([databaseId, callback]);
				} else {
					callback(null, null, null);
				}
			}
			if (connectionData.length) {
				connectionData.sort((
					a,
					b
				) => a[0] < b[0] ? -1 : 1);
				(<CheckTokensCallback>callbackData[1])(connectionData);
			}
		});
	}

	processJwtTokenCreates(
		databaseIds: DatabaseId[],
		connectionDataCallbacks: ConnectionDataCallback[],
		checkTokenCallback: CheckTokensCallback,
	): void {
		const tokenMessageIn: JwtTokenMessageIn = [
			JwtTokenMessageType.CHECK_TOKEN,
			300,
			++this.currCallbackId,
			databaseIds
		];
		this.checkTokenCallbackMap.set(
			this.currCallbackId, [connectionDataCallbacks, checkTokenCallback]);
		this.childProcess.send(tokenMessageIn);
	}

	processJwtTokenUpdates(
		tokensToCheck: JwtToken[],
		connectionDataCallbacks: ConnectionDataCallback[],
		checkTokenCallback: CheckTokensCallback,
	): void {
		const tokenMessageIn: JwtTokenMessageIn = [
			JwtTokenMessageType.CHECK_TOKEN,
			300,
			++this.currCallbackId,
			tokensToCheck
		];
		this.checkTokenCallbackMap.set(
			this.currCallbackId, [connectionDataCallbacks, checkTokenCallback]);
		this.childProcess.send(tokenMessageIn);
	}

}
*/