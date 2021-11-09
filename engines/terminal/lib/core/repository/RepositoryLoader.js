import { REPOSITORY_LOADER } from "@airport/air-control";
import { DI } from "@airport/di";
export class RepositoryLoader {
    async loadRepository(repositorySource, repositoryUuid) {
        switch (repositorySource) {
            case 'IPFS':
                break;
            default:
                break;
        }
    }
}
DI.set(REPOSITORY_LOADER, RepositoryLoader);
//# sourceMappingURL=RepositoryLoader.js.map