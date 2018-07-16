import {UtilsToken}                    from "@airport/air-control/lib/InjectionTokens";
import {IUtils}                        from "@airport/air-control/lib/lingo/utils/Utils";
import {AgtRepositoryId}               from "@airport/ground-control";
import {RepositoryId}                  from "@airport/holding-pattern/lib/ddl/repository/Repository";
import {
	ISharingNodeRepositoryDao,
	SharingNodeId
}                                      from "@airport/moving-walkway";
import {SharingNodeRepositoryDaoToken} from "@airport/moving-walkway/lib/InjectionTokens";
import {Service}                       from "typedi";
import {Inject}                        from "typedi/decorators/Inject";
import {SyncInRepositoryCheckerToken}  from "../../../../../apps/terminal/src/InjectionTokens";
import {IDataToTM}                     from "../SyncInUtils";

export interface RepositoryCheckResults {
	consistentMessages: IDataToTM[];
	inconsistentMessages: IDataToTM[];
	// sharingNodeRepositoryMap: Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>;
	sharingNodeRepositoryMap: Map<SharingNodeId, Set<RepositoryId>>;
}


export interface ISyncInRepositoryChecker {

	ensureRepositories(
		incomingMessages: IDataToTM[]
	): Promise<RepositoryCheckResults>;

}

@Service(SyncInRepositoryCheckerToken)
export class SyncInRepositoryChecker
	implements ISyncInRepositoryChecker {

	constructor(
		@Inject(SharingNodeRepositoryDaoToken)
		private sharingNodeRepositoryDao: ISharingNodeRepositoryDao,
		@Inject(UtilsToken)
		private utils: IUtils,
	) {

	}

	async ensureRepositories(
		incomingMessages: IDataToTM[]
	): Promise<RepositoryCheckResults> {
		const inconsistentMessages: IDataToTM[] = [];
		const consistentMessages: IDataToTM[] = [];

		// const dataMessageMapBySharingNodeAndAgtRepositoryId:
		// 	Map<SharingNodeId, Map<AgtRepositoryId, IDataToTM[]>>
		// 	= new Map();
		const dataMessageMapBySharingNodeId:
			Map<SharingNodeId, Map<AgtRepositoryId, IDataToTM[]>>
			= new Map();
		// const agtRepositoryIds: Set<AgtRepositoryId> = new Set();
		const sharingNodeIds: Set<SharingNodeId> = new Set();

		const sharingNodeRepositoryMap: Map<SharingNodeId, Set<RepositoryId>> = new Map();


		for (const message of incomingMessages) {
			if (this.areRepositoryIdsConsistentInMessage(message)) {
				const sharingNodeId = message.sharingNode.id;
				// const agtRepositoryId = message.agtRepositoryId;

				sharingNodeIds.add(sharingNodeId);
				// agtRepositoryIds.add(agtRepositoryId);
				// Add the Data message from AGT into the datastructure
				// this.utils.ensureChildArray(
				// 	this.utils.ensureChildJsMap(
				// 		dataMessageMapBySharingNodeAndAgtRepositoryId,
				// 		sharingNodeId), agtRepositoryId).push();
				this.utils.ensureChildArray(dataMessageMapBySharingNodeId, sharingNodeId)
					.push(message);
				this.utils.ensureChildJsSet(sharingNodeRepositoryMap, sharingNodeId)
					.add(message.data.repository.id);
				consistentMessages.push(message);
			} else {
				inconsistentMessages.push(message);
			}
		}

		// const {dataMessages, sharingNodeRepositoryMap}
		// 	= await this.updateRepositoryIdsAndFilterOutMissingRepositoryMessages(
		// 	agtRepositoryIds, sharingNodeIds, dataMessageMapBySharingNodeAndAgtRepositoryId);

		return {
			// consistentMessages: dataMessages,
			consistentMessages,
			inconsistentMessages,
			sharingNodeRepositoryMap
		}
	}

	private areRepositoryIdsConsistentInMessage(
		message: IDataToTM
	): boolean {
		const data = message.data;
		const repositoryId = data.repository.id;

		for (const repoTransHistory of data.repoTransHistories) {
			if (repositoryId != repoTransHistory.repository.id) {
				return false;
			}
		}

		return true;
	}

	/*  NOT needed - AgtRepositoryIds are not sent FROM Agt, only TO Agt
		private async updateRepositoryIdsAndFilterOutMissingRepositoryMessages(
			agtRepositoryIds: Set<AgtRepositoryId>,
			sharingNodeIds: Set<SharingNodeId>,
			dataMessageMapBySharingNodeAndAgtRepositoryId:
				Map<SharingNodeId, Map<AgtRepositoryId, IDataToTM[]>>
		): Promise<{
			dataMessages: IDataToTM[];
			sharingNodeRepositoryMap: Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>;
		}> {
			// ASSUMPTION: repositories removed from this device will not be in
			// the returned SharingNodeRepositories (already removed locally)
			const sharingNodeRepositoryMap: Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>
				= await this.sharingNodeRepositoryDao.findBySharingNodeAndAgtRepositoryIds(
				Array.from(sharingNodeIds), Array.from(agtRepositoryIds));

			// FIXME: handle repositories that need to be added to this database

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
					// If did not find the repository in local database
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
