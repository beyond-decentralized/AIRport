import {
    IRepositoryLoader,
    REPOSITORY_LOADER
} from "@airport/air-control";
import {
    DEPENDENCY_INJECTION,
    IContext
} from "@airport/direction-indicator";
import {
    ISynchronizationAdapterLoader,
    ISynchronizationInManager
} from "@airport/ground-transport";
import {
    IRepositoryDao,
    RepositoryTransactionHistory_UuId,
} from "@airport/holding-pattern";
import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { ITransactionContext } from "@airport/terminal-map";

export class RepositoryLoader
    implements IRepositoryLoader {

    repositoryDao: IRepositoryDao
    synchronizationAdapterLoader: ISynchronizationAdapterLoader
    synchronizationInManager: ISynchronizationInManager

    /*
    Repository can be loaded because:
    - Repository is not present at all
    - Central: Last non-local Transaction Log timestamp is too old
    - Distributed:  Also stale timestamp but not as frequently (maybe once an hour)
    Immutable repositories are only loaded once
    */
    async loadRepository(
        repositorySource: string,
        repositoryUuId: string,
        context: IContext & ITransactionContext
    ): Promise<void> {
        if (context.repositoryExistenceChecked) {
            return
        }
        context.repositoryExistenceChecked = true

        const repositoryLoadInfo = await this.repositoryDao.getRepositoryLoadInfo(
            repositorySource, repositoryUuId, context)

        let loadRepository = false
        let lastSyncTimestamp = 0
        if (!repositoryLoadInfo) {
            loadRepository = true
        } else if (!repositoryLoadInfo.immutable) {
            loadRepository = true
            for (const remoteRepositoryTransactionHistory of repositoryLoadInfo.repositoryTransactionHistory) {
                if (lastSyncTimestamp < remoteRepositoryTransactionHistory.saveTimestamp) {
                    lastSyncTimestamp = remoteRepositoryTransactionHistory.saveTimestamp
                }
            }
        }

        if (!loadRepository) {
            return
        }

        const now = new Date().getTime()
        const synchronizationAdapter = await this.synchronizationAdapterLoader
            .load(repositorySource)

        let messages: RepositorySynchronizationMessage[]
        try {
            if (lastSyncTimestamp) {
                // If it's been less than 10 seconds, don't retrieve the repository
                if (lastSyncTimestamp >= now - 10000) {
                    return
                }
                // Check 100 seconds back, in case there were update issues
                lastSyncTimestamp -= 100000
                messages = await synchronizationAdapter.getTransactionsForRepository(
                    repositorySource, repositoryUuId, lastSyncTimestamp)
            } else {
                messages = await synchronizationAdapter.getTransactionsForRepository(
                    repositorySource, repositoryUuId)
            }

            // TODO: Add a special message for repository for adding users
            // into the repository 
            // each user will have a public key that they will distribute
            // each message is signed with the private key and the initial
            // message for repository is CREATE_REPOSITORY with the public 
            // key of the owner user

            const messageMapByUuId: Map<RepositoryTransactionHistory_UuId, RepositorySynchronizationMessage>
                = new Map()
            for (const message of messages) {
                messageMapByUuId.set(message.history.uuId, message)
            }

            await this.synchronizationInManager.receiveMessages(messageMapByUuId, context)
        } catch (e) {
            console.error(e)
            return
        }
    }

}
DEPENDENCY_INJECTION.set(REPOSITORY_LOADER, RepositoryLoader)
