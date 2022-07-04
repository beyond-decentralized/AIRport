var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
let SyncInRepositoryChecker = class SyncInRepositoryChecker {
    async ensureRepositories(message, context) {
        try {
            let repositoryGUIDs = [];
            let messageRepositoryIndexMap = new Map();
            for (let i = 0; i < message.referencedRepositories.length; i++) {
                this.checkRepository(message.referencedRepositories[i], i, repositoryGUIDs, messageRepositoryIndexMap, message);
            }
            const history = message.history;
            if (history.isRepositoryCreation) {
                if (typeof history.repository !== 'object') {
                    throw new Error(`Serialized RepositorySynchronizationMessage.history.repository should be an object
	if RepositorySynchronizationMessage.history.isRepositoryCreation === true`);
                }
                this.checkRepository(history.repository, null, repositoryGUIDs, messageRepositoryIndexMap, message);
            }
            else {
                if (typeof history.repository !== 'string') {
                    throw new Error(`Serialized RepositorySynchronizationMessage.history.repository should be a string
	if RepositorySynchronizationMessage.history.isRepositoryCreation === false`);
                }
                repositoryGUIDs.push(history.repository);
            }
            const repositories = await this.repositoryDao.findByGUIDs(repositoryGUIDs);
            for (const repository of repositories) {
                const messageUserIndex = messageRepositoryIndexMap.get(repository.GUID);
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
                .filter(messageRepository => !messageRepository._localId);
            if (typeof history.repository !== 'object') {
                throw new Error(`Repository with GUID ${history.repository} is not
					present and cannot be synced
	This RepositorySynchronizationMessage is for an existing repository and that
	repository must already be loaded in this database for this message to be
	processed.`);
            }
            else if (!history.repository._localId) {
                missingRepositories.push(history.repository);
            }
            if (missingRepositories.length) {
                await this.repositoryDao.insert(missingRepositories, context);
            }
        }
        catch (e) {
            console.error(e);
            return false;
        }
        return true;
    }
    checkRepository(repository, repositoryIndex, repositoryGUIDs, messageRepositoryIndexMap, message) {
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
        if (typeof repository.GUID !== 'string' || repository.GUID.length !== 36) {
            throw new Error(`Invalid 'repository.GUID'`);
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
        repositoryGUIDs.push(repository.GUID);
        if (typeof repositoryIndex === 'number') {
            messageRepositoryIndexMap.set(repository.GUID, repositoryIndex);
        }
        // Make sure id field is not in the input
        delete repository._localId;
    }
};
__decorate([
    Inject()
], SyncInRepositoryChecker.prototype, "repositoryDao", void 0);
SyncInRepositoryChecker = __decorate([
    Injected()
], SyncInRepositoryChecker);
export { SyncInRepositoryChecker };
//# sourceMappingURL=SyncInRepositoryChecker.js.map