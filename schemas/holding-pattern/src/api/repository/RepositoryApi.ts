import { Api } from "@airport/air-traffic-control";
import { IContext, Inject, Injected } from "@airport/direction-indicator";
import { IRepository, Repository_GUID, Repository_IsPublic } from '@airport/ground-control';
import { IRepositoryManager } from '@airport/terminal-map';
import { Observable, map } from "rxjs";
import { RepositoryDao, RepositoryMemberDao } from "../../dao/dao";
import { UserAccount } from "@airport/travel-document-checkpoint";

@Injected()
export class RepositoryApi {

    @Inject()
    repositoryDao: RepositoryDao

    @Inject()
    repositoryMemberDao: RepositoryMemberDao

    @Inject()
    repositoryManager: IRepositoryManager

    @Api()
    searchRepositories(): Observable<IRepository[]> {
        return this.repositoryDao.searchRepositories(arguments[0])
    }

    @Api()
    searchRepositoryMemberUserAccountsByGUID(
        repositoryGUID: Repository_GUID
    ): Observable<UserAccount[]> {
        return this.repositoryMemberDao
            .searchWithMembersForRepositoryGUID(repositoryGUID).pipe(
                map(repositoryMembers => repositoryMembers.map(
                    repositoryMember => repositoryMember.userAccount
                ))
            )
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
