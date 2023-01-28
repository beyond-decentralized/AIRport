import {
    Inject,
    Injected
} from '@airport/direction-indicator'
import { IClient } from "@airway/client";
import { ISynchronizationAdapter } from "./ISynchronizationAdapter";
import { RepositorySynchronizationMessage, RepositorySynchronizationReadResponseFragment, Repository_GUID } from '@airport/ground-control';

@Injected()
export class DebugSynchronizationAdapter
    implements ISynchronizationAdapter {

    @Inject()
    client: IClient

    async getTransactionsForRepository(
        repositoryGUID: Repository_GUID,
        sinceSyncTimestamp?: number
    ): Promise<RepositorySynchronizationMessage[]> {
        const location = this.getLocation(repositoryGUID)
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
        repositoryGUID: Repository_GUID,
        messagesForRepository: RepositorySynchronizationMessage[]
    ): Promise<boolean> {
        let allSent = true
        try {
            if (!await this.sendTransactionsForRepository(repositoryGUID, messagesForRepository)) {
                allSent = false
            }
        } catch (e) {
            console.error(e)
            allSent = false
        }

        return allSent
    }

    async sendTransactionsForRepository(
        repositoryGUID: Repository_GUID,
        messages: RepositorySynchronizationMessage[]
    ): Promise<boolean> {
        if (!messages || !messages.length) {
            return false
        }

        const location = this.getLocation(repositoryGUID)
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
        repositoryGUID: Repository_GUID
    ): string {
        // if (repositorySource !== 'DEVSERVR') {
        //     throw new Error(`DebugSynchronizationAdapter only supports DEVSERVR source`)
        // }

        return 'localhost:9000'
    }

}
