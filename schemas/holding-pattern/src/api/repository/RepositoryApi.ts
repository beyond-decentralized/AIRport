import { Api } from "@airport/air-traffic-control";
import { IContext, Inject, Injected } from "@airport/direction-indicator";
import { IRepository, Repository_GUID, Repository_IsPublic } from '@airport/ground-control';
import { IRepositoryManager } from '@airport/terminal-map';
import { Observable } from "rxjs";
import { RepositoryDao } from "../../dao/dao";

@Injected()
export class RepositoryApi {

    @Inject()
    repositoryDao: RepositoryDao

    @Inject()
    repositoryManager: IRepositoryManager

    @Api()
    searchRepositories(): Observable<IRepository[]> {
        return this.repositoryDao.searchRepositories(arguments[0])
    }

    async findRepository(
        repositoryGUID: Repository_GUID
    ): Promise<IRepository> {
        return await this.repositoryDao.findRepository(
            repositoryGUID,
            arguments[1]
        )
    }

    @Api()
    async create(
        repositoryName: string,
        isPublic?: Repository_IsPublic
    ): Promise<IRepository> {
        if (isPublic === undefined) {
            isPublic = false
        }
        let context: IContext = arguments[2]
        return await this.repositoryManager.createRepository(
            repositoryName, false, isPublic, context)
    }

    @Api()
    async setUiEntryUri(
        uiEntryUri: string,
        repository: IRepository
    ): Promise<void> {
        await this.repositoryManager.setUiEntryUri(
            uiEntryUri, repository, arguments[2])
    }

}
