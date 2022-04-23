import { IContext } from "@airport/direction-indicator";

export interface IRepositoryLoader {

    loadRepository(
        repositorySource: string,
        repositoryUuid: string,
        context: IContext
    ): Promise<void>

}
