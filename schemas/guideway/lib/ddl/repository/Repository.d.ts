import { AgtRepositoryId } from "@airport/arrivals-n-departures";
import { TerminalRepository } from "../terminal/TerminalRepository";
import { AgtRepositoryTransactionBlock } from "../synchronization/AgtRepositoryTransactionBlock";
import { RepositoryStatus } from "./RepositoryStatus";
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
