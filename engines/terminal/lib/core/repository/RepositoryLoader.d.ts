import { IRepositoryLoader } from "@airport/air-control";
import { IContext } from "@airport/di";
import { ITransactionContext } from "@airport/terminal-map";
export declare class RepositoryLoader implements IRepositoryLoader {
    loadRepository(repositorySource: string, repositoryUuId: string, context: IContext & ITransactionContext): Promise<void>;
}
//# sourceMappingURL=RepositoryLoader.d.ts.map