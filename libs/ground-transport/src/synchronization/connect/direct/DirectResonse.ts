import {BatchedMessagesToTM, MessageToTM} from "@airport/ground-control";

/**
 * Response handler for a built-in AGT (in P2P setup)
 */
export class DirectResponse {

	statusCode: number;
	private data: BatchedMessagesToTM = {
		protocolVersion: 0,
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