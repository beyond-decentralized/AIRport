import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import { RepositorySynchronizationMessage, RepositorySynchronizationReadResponseFragment } from "@airport/arrivals-n-departures";
import {
    Repository_Source,
    Repository_UuId
} from "@airport/holding-pattern-runtime";
import { INonhubClient } from "@airport/nonhub-client";
import { ISynchronizationAdapter } from "./ISynchronizationAdapter";

@Injected()
export class DebugSynchronizationAdapter
    implements ISynchronizationAdapter {

    @Inject()
    nonhubClient: INonhubClient

    async getTransactionsForRepository(
        repositorySource: Repository_Source,
        repositoryUuId: Repository_UuId,
        sinceSyncTimestamp?: number
    ): Promise<RepositorySynchronizationMessage[]> {
        const response: RepositorySynchronizationReadResponseFragment[]
            = await this.nonhubClient.getRepositoryTransactions(
                repositorySource, repositoryUuId, sinceSyncTimestamp)

        const messages: RepositorySynchronizationMessage[] = []

        // NOTE: syncTimestamp is populated here because file sharing mechanisms
        // (IPFS) won't be able to modify the messages themselves
        for (const fragment of response) {
            if (fragment.repositoryUuId !== repositoryUuId) {
                console.error(`Got a reponse fragment for repository ${fragment.repositoryUuId}.
    Expecting message fragments for repository: ${repositoryUuId}`)
                continue
            }
            for (const message of fragment.messages) {
                message.syncTimestamp = fragment.syncTimestamp
                messages.push(message)
            }
        }

        return messages
    }

    async sendTransactions(
        repositorySource: Repository_Source,
        messagesByRepository: Map<Repository_UuId, RepositorySynchronizationMessage[]>
    ): Promise<boolean> {
        let allSent = true
        for (const [repositoryUuid, messages] of messagesByRepository) {
            try {
                if (!await this.sendTransactionsForRepository(
                    repositorySource, repositoryUuid, messages)) {
                    allSent = false
                }
            } catch (e) {
                console.error(e)
                allSent = false
            }
        }

        return allSent
    }

    async sendTransactionsForRepository(
        repositorySource: Repository_Source,
        repositoryUuId: Repository_UuId,
        messages: RepositorySynchronizationMessage[]
    ): Promise<boolean> {
        if (!messages || !messages.length) {
            return false
        }

        const syncTimestamp = await this.nonhubClient.sendRepositoryTransactions(
            repositorySource, repositoryUuId, messages)

        if (!syncTimestamp) {
            return false
        }

        for (const message of messages) {
            message.syncTimestamp = syncTimestamp
        }

        return true
    }

}
