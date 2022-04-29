import { IRepositoryLoader } from "@airport/air-control";
import { IContext } from "@airport/direction-indicator";
import { ISynchronizationAdapterLoader, ISynchronizationInManager } from "@airport/ground-transport";
import { IRepositoryDao } from "@airport/holding-pattern";
import { ITransactionContext } from "@airport/terminal-map";
export declare class RepositoryLoader implements IRepositoryLoader {
    repositoryDao: IRepositoryDao;
    synchronizationAdapterLoader: ISynchronizationAdapterLoader;
    synchronizationInManager: ISynchronizationInManager;
    loadRepository(repositorySource: string, repositoryUuId: string, context: IContext & ITransactionContext): Promise<void>;
}
//# sourceMappingURL=RepositoryLoader.d.ts.map