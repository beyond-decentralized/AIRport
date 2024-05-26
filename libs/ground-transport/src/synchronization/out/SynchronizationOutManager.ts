import {
	IBlockSigningManager
} from '@airbridge/keyring/dist/app/bundle'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IDatastructureUtils, IRepository, IRepositoryTransactionHistory, IRepositoryBlock, Repository_GUID, Repository_LocalId
} from '@airport/ground-control'
import {
	IRepositoryBlockDao
} from '@airport/holding-pattern/dist/app/bundle'
import { ISynchronizationAdapterLoader } from '../../adapters/SynchronizationAdapterLoader'
import { RepositoryReferenceCreator } from '../RepositoryReferenceCreator'
import { ISyncOutDataPreparer } from './converter/SyncOutDataPreparer'

export interface ISynchronizationOutManager {

	getSynchronizationBlocks(
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
		repositoryMapByLid: Map<Repository_LocalId, IRepository>,
		context: IContext
	): Promise<IRepositoryBlock[]>

	sendBlocks(
		blocks: IRepositoryBlock[],
		context: IContext
	): Promise<void>

}

@Injected()
export class SynchronizationOutManager
	implements ISynchronizationOutManager {

	@Inject()
	datastructureUtils: IDatastructureUtils

	@Inject()
	blockSigningManager: IBlockSigningManager

	@Inject()
	repositoryReferenceCreator: RepositoryReferenceCreator

	@Inject()
	repositoryBlockDao: IRepositoryBlockDao

	@Inject()
	synchronizationAdapterLoader: ISynchronizationAdapterLoader

	@Inject()
	syncOutDataPreparer: ISyncOutDataPreparer

	async getSynchronizationBlocks(
		repositoryTransactionHistories: IRepositoryTransactionHistory[],
		repositoryMapByLid: Map<Repository_LocalId, IRepository>,
		context: IContext
	): Promise<IRepositoryBlock[]> {
		const {
			historiesToSend,
			blocks
		} = await this.syncOutDataPreparer.prepare(
			repositoryTransactionHistories, repositoryMapByLid, context)
		//  await this.ensureGlobalRepositoryIdentifiers(repositoryTransactionHistories, blocks)

		await this.blockSigningManager.signBlocks(historiesToSend, blocks, context)

		await this.repositoryReferenceCreator.create(blocks, context)

		for (const block of blocks) {
			for (const referencedRepository of block.data.referencedRepositories) {
				delete referencedRepository._localId
			}
			delete block.data.history.repository._localId
		}

		return blocks
	}

	async sendBlocks(
		blocks: IRepositoryBlock[],
		context: IContext
	): Promise<void> {
		const blockGroupMap = this.groupBlocksByRepository(blocks)

		for (const [repositoryGUID, blocksForRepository] of blockGroupMap) {
			const synchronizationAdapter = await this.synchronizationAdapterLoader.load(
				repositoryGUID)
			await synchronizationAdapter.sendBlocks(repositoryGUID,
				blocksForRepository)
		}

		await this.updateRepositoryBlocks(
			blocks, context)
	}

	private groupBlocksByRepository(
		blocks: IRepositoryBlock[]
	): Map<Repository_GUID, IRepositoryBlock[]> {
		const blockGroupMap: Map<Repository_GUID, IRepositoryBlock[]>
			= new Map()

		for (const block of blocks) {
			this.datastructureUtils.ensureChildArray(
				blockGroupMap, block.repository.GUID).push(block)
		}

		return blockGroupMap
	}

	private async updateRepositoryBlocks(
		blocks: IRepositoryBlock[],
		context: IContext
	): Promise<void> {
		for (const block of blocks) {
			if (block.syncTimestamp) {
				await this.repositoryBlockDao.updateSyncTimestamp(
					block, context)
			}
		}
	}

}
