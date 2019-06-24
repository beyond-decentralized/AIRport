import {
	MessageFromTM,
	MessageToTM,
	SYNC_CONNECTION_SERVER
}                                     from '@airport/arrivals-n-departures'
import {DI}                           from '@airport/di'
import {ISharingNode}                 from '@airport/moving-walkway'
import {DIRECT_SHARING_NODE_ENDPOINT} from '../../../diTokens'
import {ISharingNodeEndpoint}         from '../SharingNodeEndpoint'
import {DirectResponse}               from './DirectResonse'

/**
 * P2P endpoint to a built-in AGT
 */
export class DirectSharingNodeEndpoint
	implements ISharingNodeEndpoint {

	async communicateWithAGT(
		sharingNode: ISharingNode,
		message: MessageFromTM
	): Promise<MessageToTM[]> {
		const recentConnectionServer = await DI.get(SYNC_CONNECTION_SERVER)

		return new Promise<MessageToTM[]>((
			resolve,
			reject
		) => {
			recentConnectionServer.handleInMemoryConnect(message, new DirectResponse(
				(
					statusCode: number,
					data: MessageToTM[]
				) => {
					if (statusCode !== 200) {
						reject([statusCode, `Error from AGT: ` + statusCode.toString()])
					}
					resolve(data)
				}
			))
		})
	}

}

DI.set(DIRECT_SHARING_NODE_ENDPOINT, DirectSharingNodeEndpoint)
