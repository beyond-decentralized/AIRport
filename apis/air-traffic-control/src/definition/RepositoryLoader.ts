import { IContext } from "@airport/direction-indicator";

export interface IRepositoryLoader {

    loadRepository(
        repositoryGUID: string,
        context: IContext
    ): Promise<void>

}
