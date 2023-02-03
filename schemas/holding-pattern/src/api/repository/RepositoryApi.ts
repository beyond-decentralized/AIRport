import { Api } from "@airport/air-traffic-control";
import { IContext, Inject, Injected } from "@airport/direction-indicator";
import { IRepository, Repository_GUID, Repository_IsPublic } from '@airport/ground-control';
import { IRepositoryManager } from '@airport/terminal-map';
import { RepositoryDao } from "../../dao/dao";

@Injected()
export class RepositoryApi {

    @Inject()
    repositoryDao: RepositoryDao

    @Inject()
    repositoryManager: IRepositoryManager

    @Api()
    async findRepositories(): Promise<IRepository[]> {
        return await this.repositoryDao.findRepositories()
    }

    async findRepository(
        repositoryGUID: Repository_GUID
    ): Promise<IRepository> {
        return await this.repositoryDao.findRepository(repositoryGUID)
    }

    @Api()
    async create(
        repositoryName: string,
        isPublic?: Repository_IsPublic
    ): Promise<IRepository> {
        let context: IContext = arguments[2]
        if (isPublic === undefined) {
            context = arguments[1]
            isPublic = false
        }
        return await this.repositoryManager.createRepository(
            repositoryName, isPublic, context)
    }

    @Api()
    async setUiEntryUri(
        uiEntryUri: string,
        repository: IRepository
    ): Promise<void> {
        await this.repositoryManager.setUiEntryUri(uiEntryUri, repository, {})
    }

}
