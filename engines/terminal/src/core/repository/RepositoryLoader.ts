import {
    IRepositoryLoader,
    REPOSITORY_LOADER
} from "@airport/air-control";
import {
    container,
    DI
} from "@airport/di";
import {
    SYNCHRONIZATION_ADAPTER_LOADER,
    SYNCHRONIZATION_IN_MANAGER
} from "@airport/ground-transport";
import {
    RepositoryTransactionHistory_UuId,
    REPOSITORY_DAO
} from "@airport/holding-pattern";
import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";

export class RepositoryLoader
    implements IRepositoryLoader {

    /*
    Repository can be loaded because:
    - Repository is not present at all
    - Central: Last non-local Transaction Log timestamp is too old
    - Distributed:  Also stale timestamp but not as frequently (maybe once an hour)
    Immutable repositories are only loaded once
    */
    async loadRepository(
        repositorySource: string,
        repositoryUuId: string
    ): Promise<void> {
        const repositoryDao = await container(this).get(REPOSITORY_DAO)
        const repositoryLoadInfo = await repositoryDao.getRepositoryLoadInfo(repositorySource, repositoryUuId)

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

        const [synchronizationAdapterLoader, synchronizationInManager] =
            await container(this).get(
                SYNCHRONIZATION_ADAPTER_LOADER, SYNCHRONIZATION_IN_MANAGER)
        const synchronizationAdapter = await synchronizationAdapterLoader
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

            await synchronizationInManager.receiveMessages(messageMapByUuId)
        } catch (e) {
            console.error(e)
            return
        }
    }

}
DI.set(REPOSITORY_LOADER, RepositoryLoader)
