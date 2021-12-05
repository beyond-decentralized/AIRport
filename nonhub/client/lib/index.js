import { DI, lib } from '@airport/di';
// import {
//     decryptString,
//     encryptString,
// } from "string-cipher";
const nonhubClient = lib('nonhub-client');
export const NONHUB_CLIENT = nonhubClient.token('INonhubClient');
export class NonhubClient {
    constructor() {
        // encryptionKey = process.env.ENCRYPTION_KEY
        this.serverLocationProtocol = 'http://';
    }
    async getRepositoryTransactions(location, repositoryUuId, sinceSyncTimestamp = null) {
        try {
            const response = await this.sendMessage(location, {
                repositoryUuId,
                syncTimestamp: sinceSyncTimestamp
            });
            if (response.error) {
                console.error(response.error);
                return {
                    messages: [],
                    syncTimestamp: 0
                };
            }
            return {
                messages: response.messages,
                syncTimestamp: response.syncTimestamp
            };
        }
        catch (e) {
            console.error(e);
            return {
                messages: [],
                syncTimestamp: 0
            };
        }
    }
    async sendRepositoryTransactions(location, repositoryUuId, messages) {
        try {
            const response = await this.sendMessage(location, {
                messages,
                repositoryUuId
            });
            if (response.error) {
                console.error(response.error);
                return 0;
            }
            return response.syncTimestamp;
        }
        catch (e) {
            console.error(e);
            return 0;
        }
    }
    async sendMessage(location, request) {
        let packagedMessage = JSON.stringify(request);
        // if (this.encryptionKey) {
        //     packagedMessage = await encryptString(
        //         packagedMessage, this.encryptionKey)
        // }
        const response = await fetch(this.serverLocationProtocol + location + '/read', {
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
        });
        // let unpackagedMessage = response.text()
        // if (this.encryptionKey) {
        //     unpackagedMessage = await decryptString(unpackagedMessage, this.encryptionKey)
        // }
        // return JSON.parse(unpackagedMessage)
        return response.json();
    }
}
DI.set(NONHUB_CLIENT, NonhubClient);
//# sourceMappingURL=index.js.map