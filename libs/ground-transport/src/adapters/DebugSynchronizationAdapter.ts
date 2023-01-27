import {
    Inject,
    Injected
} from '@airport/direction-indicator'
import { IClient } from "@airway/client";
import { ISynchronizationAdapter } from "./ISynchronizationAdapter";
import { RepositorySynchronizationMessage, RepositorySynchronizationReadResponseFragment, Repository_GUID, Repository_Source } from '@airport/ground-control';

@Injected()
export class DebugSynchronizationAdapter
    implements ISynchronizationAdapter {

    @Inject()
    client: IClient

    async getTransactionsForRepository(
        repositorySource: Repository_Source,
        repositoryGUID: Repository_GUID,
        sinceSyncTimestamp?: number
    ): Promise<RepositorySynchronizationMessage[]> {
        const location = this.getLocation(repositorySource)
        const response: RepositorySynchronizationReadResponseFragment[]
            = await this.client.getRepositoryTransactions(
                location, repositoryGUID, sinceSyncTimestamp)

        const messages: RepositorySynchronizationMessage[] = []

        // NOTE: syncTimestamp is populated here because file sharing mechanisms
        // (IPFS) won't be able to modify the messages themselves
        for (const fragment of response) {
            if (fragment.repositoryGUID !== repositoryGUID) {
                console.error(`Got a reponse fragment for repository ${fragment.repositoryGUID}.
    Expecting message fragments for repository: ${repositoryGUID}`)
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
        messagesByRepository: Map<Repository_GUID, RepositorySynchronizationMessage[]>
    ): Promise<boolean> {
        let allSent = true
        for (const [repositoryGUID, messages] of messagesByRepository) {
            try {
                if (!await this.sendTransactionsForRepository(
                    repositorySource, repositoryGUID, messages)) {
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
        repositoryGUID: Repository_GUID,
        messages: RepositorySynchronizationMessage[]
    ): Promise<boolean> {
        if (!messages || !messages.length) {
            return false
        }

        const location = this.getLocation(repositorySource)
        const syncTimestamp = await this.client.sendRepositoryTransactions(
            location, repositoryGUID, messages)

        if (!syncTimestamp) {
            return false
        }

        for (const message of messages) {
            message.syncTimestamp = syncTimestamp
        }

        return true
    }

    private getLocation(
        repositorySource: Repository_Source
    ): string {
        if (repositorySource !== 'DEVSERVR') {
            throw new Error(`DebugSynchronizationAdapter only supports DEVSERVR source`)
        }

        return 'localhost:9000'
    }

}
