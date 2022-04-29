export class SyncInRepositoryChecker {
    async ensureRepositories(message) {
        try {
            let repositoryUuids = [];
            let messageRepositoryIndexMap = new Map();
            for (let i = 0; i < message.referencedRepositories.length; i++) {
                this.checkRepository(message.referencedRepositories[i], i, repositoryUuids, messageRepositoryIndexMap, message);
            }
            const history = message.history;
            if (history.isRepositoryCreation) {
                if (typeof history.repository !== 'object') {
                    throw new Error(`Serialized RepositorySynchronizationMessage.history.repository should be an object
	if RepositorySynchronizationMessage.history.isRepositoryCreation === true`);
                }
                this.checkRepository(history.repository, null, repositoryUuids, messageRepositoryIndexMap, message);
            }
            else {
                if (typeof history.repository !== 'string') {
                    throw new Error(`Serialized RepositorySynchronizationMessage.history.repository should be a string
	if RepositorySynchronizationMessage.history.isRepositoryCreation === false`);
                }
                repositoryUuids.push(history.repository);
            }
            const repositories = await this.repositoryDao.findByUuIds(repositoryUuids);
            for (const repository of repositories) {
                const messageUserIndex = messageRepositoryIndexMap.get(repository.uuId);
                if (messageUserIndex || messageUserIndex === 0) {
                    message.referencedRepositories[messageUserIndex] = repository;
                }
                else {
                    // Populating ahead of potential insert is OK, object
                    // gets modified with required state on an insert
                    history.repository = repository;
                }
            }
            const missingRepositories = message.referencedRepositories
                .filter(messageRepository => !messageRepository.id);
            if (typeof history.repository !== 'object') {
                throw new Error(`Repository with UuId ${history.repository} is not
					present and cannot be synced
	This RepositorySynchronizationMessage is for an existing repository and that
	repository must already be loaded in this database for this message to be
	processed.`);
            }
            else if (!history.repository.id) {
                missingRepositories.push(history.repository);
            }
            if (missingRepositories.length) {
                await this.repositoryDao.insert(missingRepositories);
            }
        }
        catch (e) {
            console.error(e);
            return false;
        }
        return true;
    }
    checkRepository(repository, repositoryIndex, repositoryUuids, messageRepositoryIndexMap, message) {
        if (typeof repository.ageSuitability !== 'number') {
            throw new Error(`Invalid 'repository.ageSuitability'`);
        }
        if (!repository.createdAt || typeof repository.createdAt !== 'string') {
            throw new Error(`Invalid 'repository.createdAt'`);
        }
        repository.createdAt = new Date(repository.createdAt);
        if (typeof repository.immutable !== 'boolean') {
            throw new Error(`Invalid 'repository.immutable'`);
        }
        if (!repository.source || typeof repository.source !== 'string') {
            throw new Error(`Invalid 'repository.source'`);
        }
        if (typeof repository.uuId !== 'string' || repository.uuId.length !== 36) {
            throw new Error(`Invalid 'repository.uuid'`);
        }
        if (typeof repository.owner !== 'number') {
            throw new Error(`Expecting "in-message index" (number)
				in 'repository.owner'`);
        }
        const user = message.users[repository.owner];
        if (!user) {
            throw new Error(`Did not find repository.owner (User) with "in-message index" ${repository.owner}`);
        }
        repository.owner = user;
        repositoryUuids.push(repository.uuId);
        if (typeof repositoryIndex === 'number') {
            messageRepositoryIndexMap.set(repository.uuId, repositoryIndex);
        }
        // Make sure id field is not in the input
        delete repository.id;
    }
}
//# sourceMappingURL=SyncInRepositoryChecker.js.map