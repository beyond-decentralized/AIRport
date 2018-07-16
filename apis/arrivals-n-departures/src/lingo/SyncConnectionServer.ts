import {MessageFromTM}           from "./message/MessageFromTM";
import {SerializedMessageFromTM} from "./message/SerializedMessageFromTM";

export interface ISyncConnectionServer<IncomingMessage, ServerResponse, Server, Timer> {

	startProcessing(
		createServer: (
			requestListener: (
				request: IncomingMessage,
				response: ServerResponse
			) => void
		) => Server,
		portNumberToListenOn: number,
		setInterval: (
			callback: (...args: any[]) => void,
			ms: number
		) => Timer,
		intervalFrequencyMillis: number,
	): void;

	stopProcessing( //
	): void;

	handleConnection(
		req: IncomingMessage,
		res: ServerResponse,
		callback: (
			message: SerializedMessageFromTM
		) => void,
	): void;

	handleInMemoryConnect(
		messageFromTM: MessageFromTM,
		res: ServerResponse
	): void;

}
