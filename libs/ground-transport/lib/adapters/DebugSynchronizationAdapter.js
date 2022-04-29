export class DebugSynchronizationAdapter {
    async getTransactionsForRepository(repositorySource, repositoryUuId, sinceSyncTimestamp) {
        const response = await this.nonhubClient.getRepositoryTransactions(repositorySource, repositoryUuId, sinceSyncTimestamp);
        const messages = [];
        // NOTE: syncTimestamp is populated here because file sharing mechanisms
        // (IPFS) won't be able to modify the messages themselves
        for (const fragment of response) {
            if (fragment.repositoryUuId !== repositoryUuId) {
                console.error(`Got a reponse fragment for repository ${fragment.repositoryUuId}.
    Expecting message fragments for repository: ${repositoryUuId}`);
                continue;
            }
            for (const message of fragment.messages) {
                message.syncTimestamp = fragment.syncTimestamp;
                messages.push(message);
            }
        }
        return messages;
    }
    async sendTransactions(repositorySource, messagesByRepository) {
        let allSent = true;
        for (const [repositoryUuid, messages] of messagesByRepository) {
            try {
                if (!await this.sendTransactionsForRepository(repositorySource, repositoryUuid, messages)) {
                    allSent = false;
                }
            }
            catch (e) {
                console.error(e);
                allSent = false;
            }
        }
        return allSent;
    }
    async sendTransactionsForRepository(repositorySource, repositoryUuId, messages) {
        if (!messages || !messages.length) {
            return false;
        }
        const syncTimestamp = await this.nonhubClient.sendRepositoryTransactions(repositorySource, repositoryUuId, messages);
        if (!syncTimestamp) {
            return false;
        }
        for (const message of messages) {
            message.syncTimestamp = syncTimestamp;
        }
        return true;
    }
}
//# sourceMappingURL=DebugSynchronizationAdapter.js.map