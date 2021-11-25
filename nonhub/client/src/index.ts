
import { DI, lib } from '@airport/di'
import {
    decryptString,
    encryptString,
    encryptStringSync
} from "string-cipher";
import {
    IReadRequest,
    IWriteReply,
    IWriteRequest,
    ServerState,
} from '@airport/nonhub-types'
import axios from 'axios';

const client = lib('nonhub-client')
export const NONHUB_CLIENT = client.token<INonhubClient>('INonhubClient')

export interface INonhubClient {

    getRepository(
        repositoryUuid: string,
        transactionLogEntryTime?: number
    ): Promise<any>
    
    writeRepository(
        repositoryUuId: string,
        data: string
    ): Promise<number>

}

export class NonhubClient
    implements INonhubClient {

    masterKey = 'ciw7p02f70000ysjon7gztjn7c2x7GfJ'

    serverLocation = 'http://localhost:9000'

    async getRepository(
        repositoryUuId: string,
        transactionLogEntryTime: number = null
    ): Promise<any> {
        const textResponse = await this.sendMessage<IReadRequest, any>({
            repositoryUuId,
            transactionLogEntryTime
        })

        return JSON.parse(textResponse)
    }

    async writeRepository(
        repositoryUuId: string,
        data: string
    ): Promise<number> {
        const writeReply = await this.sendMessage<IWriteRequest, IWriteReply>({
            data,
            repositoryUuId
        })

        return writeReply.transactionLogEntryTime
    }

    private async sendMessage<Req, Res>(
        request: Req
    ): Promise<Res> {
        const ecryptedMessage = await encryptString(
            JSON.stringify(request), this.masterKey)
        const response = await axios.put<string>(this.serverLocation + '/read', ecryptedMessage, {
            responseType: 'text'
        })

        const decryptedMessage = await decryptString(response.data, this.masterKey)

        return JSON.parse(decryptedMessage)
    }

}
DI.set(NONHUB_CLIENT, NonhubClient)
