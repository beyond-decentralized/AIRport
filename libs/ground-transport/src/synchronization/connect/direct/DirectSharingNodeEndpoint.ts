import {
	ISyncConnectionServer,
	MessageFromTM,
	MessageToTM
}                                     from "@airport/arrivals-n-departures";
import {SYNC_CONNECTION_SERVER}       from '@airport/arrivals-n-departures'
import {DI}                           from '@airport/di'
import {ISharingNode}                 from "@airport/moving-walkway";
import {DIRECT_SHARING_NODE_ENDPOINT} from "../../../diTokens";
import {ISharingNodeEndpoint}         from "../SharingNodeEndpoint";
import {DirectResponse}               from "./DirectResonse";

/**
 * P2P endpoint to a built-in AGT
 */
export class DirectSharingNodeEndpoint
	implements ISharingNodeEndpoint {

	recentConnectionServer: ISyncConnectionServer<MessageFromTM, any, any, any>;

	constructor() {
		DI.get((
			recentConnectionServer
		) => {
			this.recentConnectionServer = recentConnectionServer
		}, SYNC_CONNECTION_SERVER);
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

DI.set(DIRECT_SHARING_NODE_ENDPOINT, DirectSharingNodeEndpoint)
