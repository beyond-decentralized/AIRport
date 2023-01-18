import { Api } from '@airport/check-in'
import { Inject, Injected } from "@airport/direction-indicator";
import { IRepository, Repository_GUID } from '@airport/ground-control';
import { IRepositoryManager } from '@airport/terminal-map';
import { RepositoryDao } from "../../dao/dao";

@Injected()
export class RepositoryApi {

    @Inject()
    repositoryDao: RepositoryDao

    @Inject()
    repositoryManager: IRepositoryManager

    @Api()
    async findRootRepositories(): Promise<IRepository[]> {
        return await this.repositoryDao.findRootRepositories()
    }

    async findRepository(
        repositoryGUID: Repository_GUID
    ): Promise<IRepository> {
        return await this.repositoryDao.findRepository(repositoryGUID)
    }

    @Api()
    async create(
        repositoryName: string
    ): Promise<IRepository> {
        return await this.repositoryManager.createRepository(
            repositoryName, arguments[1])
    }

    @Api()
    async setUiEntryUri(
        uiEntryUri: string,
        repository: IRepository
    ): Promise<void> {
        await this.repositoryManager.setUiEntryUri(uiEntryUri, repository, {})
    }

}
