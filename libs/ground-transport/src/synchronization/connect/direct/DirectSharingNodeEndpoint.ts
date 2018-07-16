import {Container, Service} from "typedi";
import {ISharingNode} from "@airport/moving-walkway";
import {
	ISyncConnectionServer,
	MessageFromTM,
	MessageToTM,
	SyncConnectionServerToken
} from "@airport/ground-control";
import {ISharingNodeEndpoint} from "../SharingNodeEndpoint";
import {DirectResponse} from "./DirectResonse";
import {DirectSharingNodeEndpointToken} from "../../../../../apps/terminal/src/InjectionTokens";

/**
 * P2P endpoint to a built-in AGT
 */
@Service(DirectSharingNodeEndpointToken)
export class DirectSharingNodeEndpoint
	implements ISharingNodeEndpoint {

	recentConnectionServer: ISyncConnectionServer<MessageFromTM, any, any, any>;

	constructor() {
		this.recentConnectionServer = Container.get(SyncConnectionServerToken);
	}

	async communicateWithAGT(
		sharingNode: ISharingNode,
		message: MessageFromTM
	): Promise<MessageToTM[]> {
		return new Promise<MessageToTM[]>((
			resolve,
			reject
		) => {
			this.recentConnectionServer.handleInMemoryConnect(message, new DirectResponse(
				(
					statusCode: number,
					data: MessageToTM[]
				) => {
					if (statusCode !== 200) {
						reject([statusCode, `Error from AGT: ` + statusCode.toString()]);
					}
					resolve(data);
				}
			));
		});
	}

}