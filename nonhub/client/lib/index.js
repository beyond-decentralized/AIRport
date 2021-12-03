import { DI, lib } from '@airport/di';
import { decryptString, encryptString, } from "string-cipher";
import axios from 'axios';
const client = lib('nonhub-client');
export const NONHUB_CLIENT = client.token('INonhubClient');
export class NonhubClient {
    constructor() {
        this.encryptionKey = process.env.ENCRYPTION_KEY;
        this.serverLocationProtocol = 'https://';
    }
    async getRepositoryTransactions(location, repositoryUuId, sinceSyncTimestamp = null) {
        const response = await this.sendMessage(location, {
            repositoryUuId,
            syncTimestamp: sinceSyncTimestamp
        });
        return response;
    }
    async sendRepositoryTransactions(location, repositoryUuId, messages) {
        const writeReply = await this.sendMessage(location, {
            messages,
            repositoryUuId
        });
        return writeReply;
    }
    async sendMessage(location, request) {
        let packagedMessage = JSON.stringify(request);
        if (this.encryptionKey) {
            packagedMessage = await encryptString(packagedMessage, this.encryptionKey);
        }
        const response = await axios.put(this.serverLocationProtocol + location + '/read', packagedMessage, {
            responseType: 'text'
        });
        let unpackagedMessage = response.data;
        if (this.encryptionKey) {
            unpackagedMessage = await decryptString(unpackagedMessage, this.encryptionKey);
        }
        return JSON.parse(unpackagedMessage);
    }
}
DI.set(NONHUB_CLIENT, NonhubClient);
//# sourceMappingURL=index.js.map