import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { container, DI } from "@airport/di";
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
        const response = await nonhubClient.getRepositoryTransactions(
            repositorySource, repositoryUuId, sinceSyncTimestamp)


        const messages = response.messages
        // NOTE: syncTimestamp is populated here because file sharing mechanisms
        // (IPFS) won't be able to modify the messages themselves
        for (const message of messages) {
            message.syncTimestamp = response.syncTimestamp
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
DI.set(DEBUG_SYNCHRONIZATION_ADAPTER, DebugSynchronizationAdapter)
