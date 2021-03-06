import {
    IRepositoryLoader
} from "@airport/air-traffic-control";
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
    IContext
} from "@airport/direction-indicator";
import {
    ISynchronizationAdapterLoader,
    ISynchronizationInManager
} from "@airport/ground-transport";
import {
    IRepositoryDao,
    RepositoryTransactionHistory_GUID,
} from "@airport/holding-pattern/lib/to_be_generated/runtime-index";
import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { ITransactionContext } from "@airport/terminal-map";

@Injected()
export class RepositoryLoader
    implements IRepositoryLoader {

    @Inject()
    repositoryDao: IRepositoryDao

    @Inject()
    synchronizationAdapterLoader: ISynchronizationAdapterLoader

    @Inject()
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
        repositoryGUID: string,
        context: IContext & ITransactionContext
    ): Promise<void> {
        if (context.repositoryExistenceChecked) {
            return
        }
        context.repositoryExistenceChecked = true

        const repositoryLoadInfo = await this.repositoryDao.getRepositoryLoadInfo(
            repositorySource, repositoryGUID, context)

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
                    repositorySource, repositoryGUID, lastSyncTimestamp)
            } else {
                messages = await synchronizationAdapter.getTransactionsForRepository(
                    repositorySource, repositoryGUID)
            }

            // TODO: Add a special message for repository for adding users
            // into the repository 
            // each user will have a public key that they will distribute
            // each message is signed with the private key and the initial
            // message for repository is CREATE_REPOSITORY with the public 
            // key of the owner user

            const messageMapByGUID: Map<RepositoryTransactionHistory_GUID, RepositorySynchronizationMessage>
                = new Map()
            for (const message of messages) {
                messageMapByGUID.set(message.history.GUID, message)
            }

            await this.synchronizationInManager.receiveMessages(messageMapByGUID, context)
        } catch (e) {
            console.error(e)
            return
        }
    }

}
