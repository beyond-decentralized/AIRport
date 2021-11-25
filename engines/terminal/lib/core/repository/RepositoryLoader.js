import { REPOSITORY_LOADER } from "@airport/air-control";
import { container, DI } from "@airport/di";
import { REPOSITORY_DAO } from "@airport/holding-pattern";
import { NONHUB_CLIENT } from "@airport/nonhub-client";
export class RepositoryLoader {
    /*
    Repository can be loaded because:
    - Repository is not present at all
    - Central: Last non-local Transaction Log timestamp is too old
    - Distributed:  Also stale timestamp but not as frequently (maybe once an hour)
    Immutable repositories are only loaded once
    */
    async loadRepository(repositorySource, repositoryUuId) {
        const repositoryDao = await container(this).get(REPOSITORY_DAO);
        const repositoryLoadInfo = await repositoryDao.getRepositoryLoadInfo(repositorySource, repositoryUuId);
        let loadRepository = false;
        let lastRemoteLoadTimestamp = 0;
        if (!repositoryLoadInfo) {
            loadRepository = true;
        }
        else if (!repositoryLoadInfo.immutable) {
            loadRepository = true;
            for (const remoteRepositoryTransactionHistory of repositoryLoadInfo.repositoryTransactionHistory) {
                if (lastRemoteLoadTimestamp < remoteRepositoryTransactionHistory.saveTimestamp.getTime()) {
                    lastRemoteLoadTimestamp = remoteRepositoryTransactionHistory.saveTimestamp.getTime();
                }
            }
        }
        if (!loadRepository) {
            return;
        }
        const now = new Date().getTime();
        switch (repositorySource) {
            case 'IPFS':
                break;
            default:
                const nonhubClient = await container(this).get(NONHUB_CLIENT);
                if (lastRemoteLoadTimestamp) {
                    // If it's been less than 10 seconds, don't retrieve the repository
                    if (lastRemoteLoadTimestamp >= now - 10000) {
                        return;
                    }
                    // Check 100 seconds back, in case there were update issues
                    lastRemoteLoadTimestamp -= 100000;
                    await nonhubClient.getRepository(repositoryUuId, lastRemoteLoadTimestamp);
                }
                else {
                    await nonhubClient.getRepository(repositoryUuId);
                }
                // await nonhubClient.writeRepository(repositoryUuId, data)
                break;
        }
        // TODO: load repository into the database
    }
}
DI.set(REPOSITORY_LOADER, RepositoryLoader);
//# sourceMappingURL=RepositoryLoader.js.map