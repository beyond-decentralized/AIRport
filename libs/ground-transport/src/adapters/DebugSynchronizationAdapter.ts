import { RepositorySynchronizationMessage, RepositorySynchronizationReadResponseFragment } from "@airport/arrivals-n-departures";
import { container, DEPENDENCY_INJECTION } from "@airport/direction-indicator";
import {
    Repository_Source,
    Repository_UuId
} from "@airport/holding-pattern";
import { NONHUB_CLIENT } from "@airport/nonhub-client";
import { DEBUG_SYNCHRONIZATION_ADAPTER } from "../tokens";
import { ISynchronizationAdapter } from "./ISynchronizationAdapter";

export class DebugSynchronizationAdapter
    implements ISynchronizationAdapter {

    async getTransactionsForRepository(
        repositorySource: Repository_Source,
        repositoryUuId: Repository_UuId,
        sinceSyncTimestamp?: number
    ): Promise<RepositorySynchronizationMessage[]> {
        const nonhubClient = await container(this).get(NONHUB_CLIENT)
        const response: RepositorySynchronizationReadResponseFragment[]
            = await nonhubClient.getRepositoryTransactions(
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

        const nonhubClient = await container(this).get(NONHUB_CLIENT)
        const syncTimestamp = await nonhubClient.sendRepositoryTransactions(repositorySource,
            repositoryUuId, messages)

        if (!syncTimestamp) {
            return false
        }

        for (const message of messages) {
            message.syncTimestamp = syncTimestamp
        }

        return true
    }

}
DEPENDENCY_INJECTION.set(DEBUG_SYNCHRONIZATION_ADAPTER, DebugSynchronizationAdapter)
