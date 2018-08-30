import { AgtRepositoryId } from '@airport/arrivals-n-departures';
import { AgtRepositoryTransactionBlock } from '../synchronization/AgtRepositoryTransactionBlock';
import { TerminalRepository } from '../terminal/TerminalRepository';
import { RepositoryStatus } from './RepositoryStatus';
export declare type RepositoryLastUpdateDatetime = Date;
export declare type RepositoryName = string;
export declare class Repository {
    id: AgtRepositoryId;
    lastUpdateTime: RepositoryLastUpdateDatetime;
    name: RepositoryName;
    status: RepositoryStatus;
    terminalRepositories: TerminalRepository[];
    repositoryTransactionBlocks: AgtRepositoryTransactionBlock[];
}
