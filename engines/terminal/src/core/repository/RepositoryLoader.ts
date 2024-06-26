import {
    IRepositoryLoader
} from "@airport/air-traffic-control";
import {
    IContext,
    Inject,
    Injected
} from '@airport/direction-indicator';
import { IRepository, Repository_GUID, IRepositoryBlock, RepositoryBlock_GUID } from "@airport/ground-control";
import {
    ISyncTransactionContext,
    ISynchronizationAdapterLoader,
    ISynchronizationInManager
} from "@airport/ground-transport";
import {
    IRepositoryDao,
} from "@airport/holding-pattern/dist/app/bundle";
import { ITransactionContext, ITransactionManager } from "@airport/terminal-map";

@Injected()
export class RepositoryLoader
    implements IRepositoryLoader {

    @Inject()
    repositoryDao: IRepositoryDao

    @Inject()
    synchronizationAdapterLoader: ISynchronizationAdapterLoader

    @Inject()
    synchronizationInManager: ISynchronizationInManager

    @Inject()
    transactionManager: ITransactionManager

    currentlyLoading = false

    init(): void {
        setTimeout(() => {
            setInterval(() => {
                this.ensureOneLoadAtATime(async () => {
                    await this.syncAllRepositories()
                }, false).then()
            }, 10000)
        }, 20000)
    }

    async syncAllRepositories(): Promise<void> {

        let repositoriesWithLoadInfo: IRepository[] = []
        await this.transactionManager.transactInternal(async (
            _transaction,
            context
        ) => {
            repositoriesWithLoadInfo = await this
                .repositoryDao.findAllWithLoadInfo(context)

        }, null, {})

        for (const repositoryWithLoadInfo of repositoriesWithLoadInfo) {
            try {
                await this.doLoadRepository(
                    repositoryWithLoadInfo,
                    repositoryWithLoadInfo.GUID,
                    {}
                )
            } catch (e) {
                console.error(e)
            }
        }
    }

    /*
    Repository can be loaded because:
    - Repository is not present at all
    - Central: Last non-local Transaction Log timestamp is too old
    - Distributed:  Also stale timestamp but not as frequently (maybe once an hour)
    Immutable repositories are only loaded once
    */
    async loadRepository(
        repositoryGUID: string,
        context: ISyncTransactionContext
    ): Promise<void> {
        await this.ensureOneLoadAtATime(async () => {
            if (context.repositoryExistenceChecked) {
                return
            }
            context.repositoryExistenceChecked = true

            const repositoryWithLoadInfo = await this.repositoryDao.getWithLoadInfo(
                repositoryGUID, context)

            await this.doLoadRepository(
                repositoryWithLoadInfo,
                repositoryGUID,
                context
            )
        }, true, context.isNestedLoadCall)
    }

    private async ensureOneLoadAtATime(
        callback: () => Promise<void>,
        wait: boolean,
        nestedCall = false
    ): Promise<void> {
        if (nestedCall) {
            await callback()
            return
        }
        if (wait) {
            while (this.currentlyLoading) {
                await this.wait(100)
            }
        } else if (this.currentlyLoading) {
            return
        }
        this.currentlyLoading = true

        try {
            await callback()
        } finally {
            this.currentlyLoading = false
        }
    }

    private wait(
        milliseconds
    ): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, milliseconds)
        })
    }

    private async doLoadRepository(
        repositoryWithLoadInfo: IRepository,
        repositoryGUID: Repository_GUID,
        context: IContext & ITransactionContext
    ): Promise<void> {
        let loadRepository = false
        let lastSyncTimestamp = 0
        if (!repositoryWithLoadInfo) {
            loadRepository = true
        } else if (!repositoryWithLoadInfo.immutable) {
            loadRepository = true
            for (const remoteRepositoryTransactionHistory of repositoryWithLoadInfo.repositoryTransactionHistory) {
                if (lastSyncTimestamp < remoteRepositoryTransactionHistory.saveTimestamp) {
                    lastSyncTimestamp = remoteRepositoryTransactionHistory.saveTimestamp
                }
            }
        }

        if (!loadRepository) {
            return
        }

        const currentlyLoadedRepsitoryGUIDSet = context.currentlyLoadedRepsitoryGUIDSet
        if(currentlyLoadedRepsitoryGUIDSet) {
            currentlyLoadedRepsitoryGUIDSet.set(repositoryGUID)
        }

        const now = new Date().getTime()
        const synchronizationAdapter = await this.synchronizationAdapterLoader
            .load(repositoryGUID)

        let blocks: IRepositoryBlock[]
        try {
            if (lastSyncTimestamp) {
                // If it's been less than 10 seconds, don't retrieve the repository
                if (lastSyncTimestamp >= now - 10000) {
                    return
                }
                // Check 100 seconds back, in case there were update issues
                lastSyncTimestamp -= 100000
                blocks = await synchronizationAdapter.getBlocksForRepository(
                    repositoryGUID, lastSyncTimestamp)
            } else {
                blocks = await synchronizationAdapter.getBlocksForRepository(
                    repositoryGUID)
            }

            if (!blocks.length) {
                return
            }

            // TODO: Add a special block for repository for adding users
            // into the repository 
            // each user will have a public key that they will distribute
            // each block is signed with the private key and the initial
            // block for repository is CREATE_REPOSITORY with the public 
            // key of the owner user

            const blockMapByGUID: Map<RepositoryBlock_GUID, IRepositoryBlock>
                = new Map()
            for (const block of blocks) {
                blockMapByGUID.set(block.GUID, block)
            }

            await this.synchronizationInManager.receiveBlocks(blockMapByGUID, context)
        } catch (e) {
            console.error(e)
        }
    }

}
