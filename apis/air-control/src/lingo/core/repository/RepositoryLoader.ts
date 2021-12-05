import { IContext } from "@airport/di";

export interface IRepositoryLoader {

    loadRepository(
        repositorySource: string,
        repositoryUuid: string,
        context: IContext
    ): Promise<void>

}
