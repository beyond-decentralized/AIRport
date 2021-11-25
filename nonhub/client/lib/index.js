import { DI, lib } from '@airport/di';
import { decryptString, encryptString } from "string-cipher";
import axios from 'axios';
const client = lib('nonhub-client');
export const NONHUB_CLIENT = client.token('INonhubClient');
export class NonhubClient {
    constructor() {
        this.masterKey = 'ciw7p02f70000ysjon7gztjn7c2x7GfJ';
        this.serverLocation = 'http://localhost:9000';
    }
    async getRepository(repositoryUuId, transactionLogEntryTime = null) {
        const textResponse = await this.sendMessage({
            repositoryUuId,
            transactionLogEntryTime
        });
        return JSON.parse(textResponse);
    }
    async writeRepository(repositoryUuId, data) {
        const writeReply = await this.sendMessage({
            data,
            repositoryUuId
        });
        return writeReply.transactionLogEntryTime;
    }
    async sendMessage(request) {
        const ecryptedMessage = await encryptString(JSON.stringify(request), this.masterKey);
        const response = await axios.put(this.serverLocation + '/read', ecryptedMessage, {
            responseType: 'text'
        });
        const decryptedMessage = await decryptString(response.data, this.masterKey);
        return JSON.parse(decryptedMessage);
    }
}
DI.set(NONHUB_CLIENT, NonhubClient);
//# sourceMappingURL=index.js.map