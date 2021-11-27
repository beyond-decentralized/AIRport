import {AgtRepositoryId}      from '@airport/arrivals-n-departures'
import {DI}                   from '@airport/di'
import {
	ensureChildArray,
	ensureChildJsSet
}                             from '@airport/ground-control'
import {Repository_Id}         from '@airport/holding-pattern'
import {
	SHARING_NODE_REPOSITORY_DAO,
	SharingNode_Id
}                             from '@airport/moving-walkway'
import {SYNC_IN_REPO_CHECKER} from '../../../tokens'
import {IDataToTM}            from '../SyncInUtils'

export interface RepositoryCheckResults {
	consistentMessages: IDataToTM[];
	sharingNodeRepositoryMap: Map<SharingNode_Id, Set<Repository_Id>>;
}


export interface ISyncInRepositoryChecker {

	ensureRepositories(
		incomingMessages: IDataToTM[],
		dataMessagesWithInvalidData: IDataToTM[]
	): Promise<RepositoryCheckResults>;

}

export class SyncInRepositoryChecker
	implements ISyncInRepositoryChecker {

	async ensureRepositories(
		incomingMessages: IDataToTM[],
		dataMessagesWithInvalidData: IDataToTM[]
	): Promise<RepositoryCheckResults> {
		const consistentMessages: IDataToTM[] = []

		// const dataMessageMapBySharingNodeAndAgtRepositoryId:
		// 	Map<SharingNode_Id, Map<AgtRepositoryId, IDataToTM[]>>
		// 	= new Map();
		const dataMessageMapBySharingNodeId:
			      Map<SharingNode_Id, Map<AgtRepositoryId, IDataToTM[]>>
			                                       = new Map()
		// const agtRepositoryIds: Set<AgtRepositoryId> = new Set();
		const sharingNodeIds: Set<SharingNode_Id> = new Set()

		const sharingNodeRepositoryMap: Map<SharingNode_Id, Set<Repository_Id>> = new Map()


		for (const message of incomingMessages) {
			if (this.areRepositoryIdsConsistentInMessage(message)) {
				const sharingNodeId = message.sharingMessage.sharingNode.id
				// const agtRepositoryId = message.agtRepositoryId;

				sharingNodeIds.add(sharingNodeId)
				// agtRepositoryIds.add(agtRepositoryId);
				// Add the Data message from AGT into the datastructure
				// this.utils.ensureChildArray(
				// 	this.utils.ensureChildJsMap(
				// 		dataMessageMapBySharingNodeAndAgtRepositoryId,
				// 		sharingNodeId), agtRepositoryId).push();
				ensureChildArray(dataMessageMapBySharingNodeId, sharingNodeId)
					.push(message)
				ensureChildJsSet(sharingNodeRepositoryMap, sharingNodeId)
					.add(message.data.repository.id)
				consistentMessages.push(message)
			} else {
				dataMessagesWithInvalidData.push(message)
			}
		}

		// const {dataMessages, sharingNodeRepositoryMap}
		// 	= await this.updateRepositoryIdsAndFilterOutMissingRepositoryMessages(
		// 	agtRepositoryIds, sharingNodeIds, dataMessageMapBySharingNodeAndAgtRepositoryId);

		return {
			// consistentMessages: dataMessages,
			consistentMessages,
			sharingNodeRepositoryMap
		}
	}

	private areRepositoryIdsConsistentInMessage(
		message: IDataToTM
	): boolean {
		const data                                       = message.data
		const repositoryId                               = data.repository.id
		const referencedRepositorySet: Set<Repository_Id> = new Set()
		for (const repository of data.referencedRepositories) {
			if (referencedRepositorySet.has(repositoryId)) {
				return false
			}
			referencedRepositorySet.add(repository.id)
		}

		for (const repoTransHistory of data.repoTransHistories) {
			if (repositoryId != repoTransHistory.repository.id) {
				return false
			}
			for (const operationHistory of repoTransHistory.operationHistory) {
				// FIXME: implement
				//operationHistory.
			}
		}

		return true
	}

	/*  NOT needed - AgtRepositoryIds are not sent FROM Agt, only TO Agt
		private async updateRepositoryIdsAndFilterOutMissingRepositoryMessages(
			agtRepositoryIds: Set<AgtRepositoryId>,
			sharingNodeIds: Set<SharingNode_Id>,
			dataMessageMapBySharingNodeAndAgtRepositoryId:
				Map<SharingNode_Id, Map<AgtRepositoryId, IDataToTM[]>>
		): Promise<{
			dataMessages: IDataToTM[];
			sharingNodeRepositoryMap: Map<SharingNode_Id, Map<AgtRepositoryId, RepositoryId>>;
		}> {
			// ASSUMPTION: repositories removed from this device will not be in
			// the returned SharingNodeRepositories (already removed locally)
			const sharingNodeRepositoryMap: Map<SharingNode_Id, Map<AgtRepositoryId, RepositoryId>>
				= await this.sharingNodeRepositoryDao.findBySharingNodeAndAgtRepositoryIds(
				Array.from(sharingNodeIds), Array.from(agtRepositoryIds));

			// FIXME: handle repositories that need to be added to this terminal

			// Filter out all messages for missing (probably removed) repositories
			let dataMessages: IDataToTM[] = [];
			for (const [sharingNodeId, messageMapByAgtRepositoryId]
				of dataMessageMapBySharingNodeAndAgtRepositoryId) {
				const repositoryIdMapByAgtRepositoryId
					= sharingNodeRepositoryMap.get(sharingNodeId);
				if (!repositoryIdMapByAgtRepositoryId) {
					continue;
				}
				for (const [agtRepositoryId, messagesForAgtRepositoryId]
					of messageMapByAgtRepositoryId) {
					const repositoryId: RepositoryId = repositoryIdMapByAgtRepositoryId.get(agtRepositoryId);
					// If did not find the repository in local terminal
					if (!repositoryId) {
						// Do not process the message
						// TODO: record the fact that the message was not processed
						// FIXME: ?why is this TM receiving this message, should it have this repository?
						continue;
					}
					for (const dataMessage of messagesForAgtRepositoryId) {
						dataMessage.data.repository.id = repositoryId;

						for (const repoTransHistory of dataMessage.data.repoTransHistories) {
							repoTransHistory.repository.id = repositoryId;
						}
					}
					dataMessages = dataMessages.concat(messagesForAgtRepositoryId);
				}
			}

			return {dataMessages, sharingNodeRepositoryMap};
		}
	*/

}

DI.set(SYNC_IN_REPO_CHECKER, SyncInRepositoryChecker)
