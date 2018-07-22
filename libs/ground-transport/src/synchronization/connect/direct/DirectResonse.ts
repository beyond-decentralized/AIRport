/**
 * Response handler for a built-in AGT (in P2P setup)
 */
import {
	BatchedMessagesToTM,
	MessageToTM
} from "@airport/arrivals-n-departures";

export class DirectResponse {

	statusCode: number;
	private data: BatchedMessagesToTM = {
		agtSharingMessageId: null,
		protocolVersion: 0,
		targetAgtTerminalIds: [],
		messages: []
	};

	constructor(
		private callback: {
			(
				statusCode: number,
				data: any
			): void
		}
	) {
	}

	writeHead(
		statusCode: number,
		headers: any
	): void {
		this.statusCode = statusCode;
	}

	write(
		data: MessageToTM
	): void {
		this.data.messages.push(data);
	}

	end(): void {
		this.callback(this.statusCode, this.data);
	}

}