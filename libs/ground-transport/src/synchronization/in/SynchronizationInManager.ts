import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import { IRepositoryBlockDao } from '@airport/holding-pattern/dist/app/bundle'
import { ITransactionContext, ITransactionManager } from '@airport/terminal-map'
import { ISyncInChecker } from './checker/SyncInChecker'
import { ICrossBlockRepositoryAndMemberInfo, ITwoStageSyncedInDataProcessor } from './TwoStageSyncedInDataProcessor'
import { ISyncInApplicationVersionChecker } from './checker/SyncInApplicationVersionChecker'
import { IRepositoryLoader } from '@airport/air-traffic-control'
import { IRepository, IRepositoryBlock, RepositoryBlock_GUID, Repository_GUID, RepositoryMember_PublicSigningKey, IRepositoryMember } from '@airport/ground-control'
import { IRepositoriesAndMembersCheckResult } from './checker/SyncInRepositoryChecker'

/**
 * The manager for synchronizing data coming in  to Terminal (TM)
 */
export interface ISynchronizationInManager {

	receiveBlocks(
		blockMapByGUID: Map<RepositoryBlock_GUID, IRepositoryBlock>,
		context: ITransactionContext
	): Promise<void>;

}

export interface ISyncTransactionContext
	extends ITransactionContext {
	doNotLoadReferences: boolean,
	isNestedLoadCall: boolean,
	currentlyLoadedRepsitoryGUIDSet: Set<Repository_GUID>
}

/**
 * Synchronization in Manager implementation.
 */
@Injected()
export class SynchronizationInManager
	implements ISynchronizationInManager {

	@Inject()
	repositoryLoader: IRepositoryLoader

	@Inject()
	repositoryBlockDao: IRepositoryBlockDao

	@Inject()
	syncInApplicationVersionChecker: ISyncInApplicationVersionChecker

	@Inject()
	syncInChecker: ISyncInChecker

	@Inject()
	transactionManager: ITransactionManager

	@Inject()
	twoStageSyncedInDataProcessor: ITwoStageSyncedInDataProcessor

	async receiveBlocks(
		blockMapByGUID: Map<RepositoryBlock_GUID, IRepositoryBlock>,
		context: ISyncTransactionContext,
		syncTimestamp = new Date().getTime()
	): Promise<void> {
		if (!blockMapByGUID.size) {
			return
		}

		const existingRepositoryTransactionHistories = await this.repositoryBlockDao
			.findWhereGUIDsIn([...blockMapByGUID.keys()], context)
		for (const existingRepositoryTransactionHistory of existingRepositoryTransactionHistories) {
			blockMapByGUID.delete(existingRepositoryTransactionHistory.GUID)
		}

		if (!blockMapByGUID.size) {
			return
		}

		const orderedBlocks = this.timeOrderBlocks(blockMapByGUID)

		const immediateProcessingBlocks: IRepositoryBlock[] = []
		const delayedProcessingBlocks: IRepositoryBlock[] = []

		const repositoryAndMemberInfo: ICrossBlockRepositoryAndMemberInfo = {
			loadedRepositoryGUIDSet: new Set(),
			missingRepositoryMap: new Map(),
			newMemberMap: new Map(),
			newRepositoryMemberInvitationMap: new Map(),
			newRepositoryMemberAcceptanceMap: new Map()
		}

		const addedRepositoryMapByGUID: Map<Repository_GUID, IRepository> = new Map()
		const addedRepositoryMembersByRepositoryGUIDAndPublicSigningKey:
			Map<Repository_GUID, Map<RepositoryMember_PublicSigningKey, IRepositoryMember>> = new Map()

		let areBlocksValid: boolean[] = []
		let areAppsLoaded = true
		let i = 0;
		// Split up blocks by type
		for (; i < orderedBlocks.length; i++) {
			const block = orderedBlocks[i]
			if (!this.isValidLastChangeTime(
				syncTimestamp, block.syncTimestamp, 'Sync Timestamp')) {
				continue
			}

			if (!this.isValidLastChangeTime(
				block.syncTimestamp, block.data.history.saveTimestamp,
				'Sync Timestamp', 'Save Timestamp')) {
				continue
			}

			// Each block may come from different source but some may not
			// be valid transaction on essential record creation separately
			// for each block
			// FIXME: right now this does not start a nested trasaction
			// - make it do so
			await this.transactionManager.transactInternal(async (transaction) => {
				const blockCheckResult = await this.syncInChecker.checkBlock(
					block, addedRepositoryMapByGUID,
					addedRepositoryMembersByRepositoryGUIDAndPublicSigningKey, context)
				areAppsLoaded = blockCheckResult.areAppsLoaded
				areBlocksValid[i] = blockCheckResult.isValid
				if (!blockCheckResult.isValid || !areAppsLoaded) {
					transaction.rollback(null, context)
					return
				}
				this.aggregateRepositoryAndMemberInfo(
					blockCheckResult, repositoryAndMemberInfo)
			}, null, context)

			if (!areAppsLoaded) {
				break
			}
			if (!areBlocksValid[i]) {
				continue
			}

			immediateProcessingBlocks.push({
				...block,
				data: {
					...block.data,
					history: block.data.history
				}
			})
		}

		if (!areAppsLoaded) {
			if (!areBlocksValid[i]) {
				i++
			}
			for (; i < orderedBlocks.length; i++) {
				delayedProcessingBlocks.push(orderedBlocks[i])
			}
		}
		
		if (immediateProcessingBlocks.length) {
			await this.transactionManager.transactInternal(async (transaction, context) => {
				transaction.isRepositorySync = true
				await this.twoStageSyncedInDataProcessor.syncBlocks(
					immediateProcessingBlocks, repositoryAndMemberInfo,
					transaction, context)
			}, null, context)

			if (!context.doNotLoadReferences) {
				await this.loadReferencedRepositories(
					immediateProcessingBlocks, context)
			}
		}

		await this.processDelayedBlocks(
			delayedProcessingBlocks, syncTimestamp, context)
	}

	private aggregateRepositoryAndMemberInfo(
		dataCheckResult: IRepositoriesAndMembersCheckResult,
		repositoryAndMemberInfo: ICrossBlockRepositoryAndMemberInfo
	): void {
		for (const loadedRepositoryGUID of dataCheckResult.loadedRepositoryGUIDS) {
			repositoryAndMemberInfo.loadedRepositoryGUIDSet
				.add(loadedRepositoryGUID)
		}
		for (const missingRepository of dataCheckResult.missingRepositories) {
			repositoryAndMemberInfo.missingRepositoryMap
				.set(missingRepository.GUID, missingRepository)
		}
		for (const newMember of dataCheckResult.newMembers) {
			repositoryAndMemberInfo.newMemberMap
				.set(newMember.memberPublicSigningKey, newMember)
		}
		for (const newRepositoryMemberAcceptance of dataCheckResult.newRepositoryMemberAcceptances) {
			repositoryAndMemberInfo.newRepositoryMemberAcceptanceMap
				.set(newRepositoryMemberAcceptance.invitationPublicSigningKey,
					newRepositoryMemberAcceptance
				)
		}
		for (const newRepositoryMemberInvitation of dataCheckResult.newRepositoryMemberInvitations) {
			repositoryAndMemberInfo.newRepositoryMemberInvitationMap
				.set(newRepositoryMemberInvitation.invitationPublicSigningKey,
					newRepositoryMemberInvitation)
		}
	}

	private timeOrderBlocks(
		blockMapByGUID: Map<string, IRepositoryBlock>
	): IRepositoryBlock[] {
		const blocks: IRepositoryBlock[] = [...blockMapByGUID.values()]

		blocks.sort((block1, block2) => {
			if (block1.syncTimestamp < block2.syncTimestamp) {
				return -1
			}
			if (block1.syncTimestamp > block2.syncTimestamp) {
				return 1
			}
			let history1 = block1.data.history
			let history2 = block2.data.history
			if (history1.saveTimestamp < history2.saveTimestamp) {
				return -1
			}
			if (history1.saveTimestamp > history2.saveTimestamp) {
				return 1
			}

			return 0
		})

		return blocks
	}

	private isValidLastChangeTime(
		syncTimestamp: number,
		remoteTimestamp: number,
		remoteFieldName: string,
		syncFieldName = 'Reception Time:'
	): boolean {
		if (syncTimestamp < remoteTimestamp) {
			console.error(`Block ${syncFieldName} is less than
			the ${remoteFieldName} in received block:
				${syncFieldName}:               ${syncTimestamp}
				${remoteFieldName}:           ${remoteTimestamp}
			`)

			return false
		}

		return true
	}

	private async processDelayedBlocks(
		delayedProcessingBlocks: IRepositoryBlock[],
		syncTimestamp: number,
		context: ISyncTransactionContext
	): Promise<void> {
		const delayedProcessingBlocksWithValidApps: IRepositoryBlock[] = []
		for (const block of delayedProcessingBlocks) {
			const data = block.data
			// Install new apps
			const appInstalledIfNeeded = await this.syncInApplicationVersionChecker
				.installAndCheckApplications(data, context)
			if (appInstalledIfNeeded) {
				this.syncInChecker.checkReferencedApplicationRelations(data)
				delayedProcessingBlocksWithValidApps.push(block)
			}
		}
		const blockMapByGUID: Map<RepositoryBlock_GUID, IRepositoryBlock>
			= new Map()
		for (const block of delayedProcessingBlocksWithValidApps) {
			blockMapByGUID
				.set(block.GUID, block)
		}
		await this.receiveBlocks(blockMapByGUID,
			context, syncTimestamp)
	}

	private async loadReferencedRepositories(
		blocks: IRepositoryBlock[],
		context: ISyncTransactionContext
	): Promise<void> {
		const repositoryMapByGUID: Map<Repository_GUID, IRepository> = new Map()
		const currentlyLoadedRepsitoryGUIDSet = context.currentlyLoadedRepsitoryGUIDSet
		for (const block of blocks) {
			for (const repository of block.data.referencedRepositories) {
				if (!repositoryMapByGUID.has(repository.GUID)
					&& (!currentlyLoadedRepsitoryGUIDSet || !currentlyLoadedRepsitoryGUIDSet
						.has(repository.GUID))) {
					repositoryMapByGUID.set(repository.GUID, repository)
				}
			}
		}
		for (const repository of repositoryMapByGUID.values()) {
			await this.repositoryLoader.loadRepository(
				repository.GUID,
				{
					...context,
					doNotLoadReferences: true,
					isNestedLoadCall: true
				}
			)
		}
	}

}
