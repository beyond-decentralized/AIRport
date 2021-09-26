import { ITerminalRepository } from '../terminal/terminalrepository';
import { IAgtRepositoryTransactionBlock } from '../synchronization/agtrepositorytransactionblock';
export interface IRepository {
    id: number;
    lastUpdateTime?: Date;
    name?: string;
    status?: string;
    terminalRepositories?: ITerminalRepository[];
    repositoryTransactionBlocks?: IAgtRepositoryTransactionBlock[];
}
//# sourceMappingURL=repository.d.ts.map