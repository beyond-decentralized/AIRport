import { Api } from '@airport/check-in'
import { IContext, Inject, Injected } from "@airport/direction-indicator";
import { IRepositoryManager } from '../../core/RepositoryManager';
import { RepositoryDao } from "../../dao/dao";
import { Repository } from "../../ddl/ddl";
import { Repository_GUID } from '../../types';

@Injected()
export class RepositoryApi {

    @Inject()
    repositoryDao: RepositoryDao

    @Inject()
    repositoryManager: IRepositoryManager

    @Api()
    async findRootRepositories(): Promise<Repository[]> {
        return await this.repositoryDao.findRootRepositories()
    }

    @Api()
    async findChildRepositories(
        parentGUID: Repository_GUID
    ): Promise<Repository[]> {
        return await this.repositoryDao.findChildRepositories(parentGUID)
    }

    @Api()
    async create(
        repositoryName: string,
        parentRepository: Repository,
        nestingType: string = null
    ): Promise<Repository> {
        return await this.repositoryManager.createRepository(
            repositoryName, parentRepository, nestingType, arguments[3])
    }

    @Api()
    async addNesting(
        parentRepository: Repository,
        childRepository: Repository,
        nestingType: string = null
    ): Promise<void> {
        await this.repositoryManager.addRepositoryNesting(
            parentRepository,
            childRepository,
            nestingType,
            arguments[3]);
    }

    @Api()
    async setUiEntryUri(
        uiEntryUri: string,
        repository: Repository
    ): Promise<void> {
        await this.repositoryManager.setUiEntryUri(uiEntryUri, repository)
    }

}