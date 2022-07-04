import {
    RepositorySynchronizationMessage,
    RepositorySynchronizationReadRequest,
    RepositorySynchronizationReadResponse,
    RepositorySynchronizationReadResponseFragment,
    RepositorySynchronizationWriteRequest,
    RepositorySynchronizationWriteResponse
} from '@airport/arrivals-n-departures';
import { Injected } from '@airport/direction-indicator';
import type {
    RepositoryTransactionHistory_SyncTimestamp
} from '@airport/holding-pattern';

export interface INonhubClient {

    getRepositoryTransactions(
        location: string,
        repositoryGUID: string,
        sinceSyncTimestamp?: number
    ): Promise<RepositorySynchronizationReadResponseFragment[]>

    sendRepositoryTransactions(
        location: string,
        repositoryGUID: string,
        messages: RepositorySynchronizationMessage[]
    ): Promise<RepositoryTransactionHistory_SyncTimestamp>

}

@Injected()
export class NonhubClient
    implements INonhubClient {

    // encryptionKey = process.env.ENCRYPTION_KEY
    serverLocationProtocol = 'http://'

    async getRepositoryTransactions(
        location: string,
        repositoryGUID: string,
        sinceSyncTimestamp: number = null
    ): Promise<RepositorySynchronizationReadResponseFragment[]> {
        try {
            const response = await this.sendMessage<
                RepositorySynchronizationReadRequest,
                RepositorySynchronizationReadResponse>(location + '/read', {
                    repositoryGUID,
                    syncTimestamp: sinceSyncTimestamp
                })
            if (response.error) {
                console.error(response.error)
                return []
            }
            return response.fragments
        } catch (e) {
            console.error(e)
            return []
        }
    }

    async sendRepositoryTransactions(
        location: string,
        repositoryGUID: string,
        messages: RepositorySynchronizationMessage[]
    ): Promise<RepositoryTransactionHistory_SyncTimestamp> {
        try {
            const response = await this.sendMessage<
                RepositorySynchronizationWriteRequest,
                RepositorySynchronizationWriteResponse
            >(location + '/write', {
                messages,
                repositoryGUID
            })
            if (response.error) {
                console.error(response.error)
                return 0
            }
            return response.syncTimestamp
        } catch (e) {
            console.error(e)
            return 0
        }

    }

    private async sendMessage<Req, Res>(
        location: string,
        request: Req
    ): Promise<Res> {
        let packagedMessage = JSON.stringify(request)
        // if (this.encryptionKey) {
        //     packagedMessage = await encryptString(
        //         packagedMessage, this.encryptionKey)
        // }
        const response = await fetch(
            this.serverLocationProtocol + location, {
            method: 'PUT',
            mode: 'cors',
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: packagedMessage // body data type must match "Content-Type" header
        })


        // let unpackagedMessage = response.text()
        // if (this.encryptionKey) {
        //     unpackagedMessage = await decryptString(unpackagedMessage, this.encryptionKey)
        // }

        // return JSON.parse(unpackagedMessage)
        return response.json()
    }

}
