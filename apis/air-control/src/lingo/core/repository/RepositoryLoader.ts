export interface IRepositoryLoader {

    loadRepository(
        repositorySource: string,
        repositoryUuid: string
    ): Promise<void>

}
