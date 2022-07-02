import { IContext } from "@airport/direction-indicator";
export interface IRepositoryLoader {
    loadRepository(repositorySource: string, repositoryGUID: string, context: IContext): Promise<void>;
}
//# sourceMappingURL=RepositoryLoader.d.ts.map