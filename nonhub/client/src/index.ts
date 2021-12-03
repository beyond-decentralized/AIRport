
import {
    RepositorySynchronizationMessage,
    RepositorySynchronizationReadRequest,
    RepositorySynchronizationReadResponse,
    RepositorySynchronizationWriteRequest,
    RepositorySynchronizationWriteResponse
} from '@airport/arrivals-n-departures';
import { DI, lib } from '@airport/di'
import {
    decryptString,
    encryptString,
} from "string-cipher";
import axios from 'axios';

const client = lib('nonhub-client')
export const NONHUB_CLIENT = client.token<INonhubClient>('INonhubClient')

export interface INonhubClient {

    getRepositoryTransactions(
        location: string,
        repositoryUuid: string,
        sinceSyncTimestamp?: number
    ): Promise<RepositorySynchronizationReadResponse>

    sendRepositoryTransactions(
        location: string,
        repositoryUuId: string,
        messages: RepositorySynchronizationMessage[]
    ): Promise<RepositorySynchronizationWriteResponse>

}

export class NonhubClient
    implements INonhubClient {

    encryptionKey = process.env.ENCRYPTION_KEY
    serverLocationProtocol = 'https://'

    async getRepositoryTransactions(
        location: string,
        repositoryUuId: string,
        sinceSyncTimestamp: number = null
    ): Promise<RepositorySynchronizationReadResponse> {
        const response = await this.sendMessage<
            RepositorySynchronizationReadRequest,
            RepositorySynchronizationReadResponse>(location, {
                repositoryUuId,
                syncTimestamp: sinceSyncTimestamp
            })

        return response
    }

    async sendRepositoryTransactions(
        location: string,
        repositoryUuId: string,
        messages: RepositorySynchronizationMessage[]
    ): Promise<RepositorySynchronizationWriteResponse> {
        const writeReply = await this.sendMessage<
            RepositorySynchronizationWriteRequest,
            RepositorySynchronizationWriteResponse
        >(location, {
            messages,
            repositoryUuId
        })

        return writeReply
    }

    private async sendMessage<Req, Res>(
        location: string,
        request: Req
    ): Promise<Res> {
        let packagedMessage = JSON.stringify(request)
        if (this.encryptionKey) {
            packagedMessage = await encryptString(
                packagedMessage, this.encryptionKey)
        }
        const response = await axios.put<string>(
            this.serverLocationProtocol + location + '/read',
            packagedMessage, {
            responseType: 'text'
        })

        let unpackagedMessage = response.data
        if (this.encryptionKey) {
            unpackagedMessage = await decryptString(unpackagedMessage, this.encryptionKey)
        }

        return JSON.parse(unpackagedMessage)
    }

}
DI.set(NONHUB_CLIENT, NonhubClient)
