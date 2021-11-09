import {
    IRepositoryLoader,
    REPOSITORY_LOADER
} from "@airport/air-control";
import { DI } from "@airport/di";

export class RepositoryLoader
    implements IRepositoryLoader {
S
    async loadRepository(
        repositorySource: string,
        repositoryUuid: string
    ): Promise<void> {
        switch (repositorySource) {
            case 'IPFS':
                break;
            default:
                break;

        }
    }

}
DI.set(REPOSITORY_LOADER, RepositoryLoader)
