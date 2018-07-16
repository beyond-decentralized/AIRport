import { IAirportDatabase, IUtils } from "@airport/air-control";
import { TerminalId, AgtRepositoryId } from "@airport/arrivals-n-departures";
import { TerminalRepositoryPermission } from "../../ddl/ddl";
import { BaseTerminalRepositoryDao } from "../../generated/generated";
export interface ITerminalRepositoryDao {
    findByTerminalIdInAndRepositoryIdIn(terminalIds: TerminalId[], repositoryIds: AgtRepositoryId[]): Promise<Map<TerminalId, Map<AgtRepositoryId, TerminalRepositoryPermission>>>;
}
export declare class TerminalRepositoryDao extends BaseTerminalRepositoryDao implements ITerminalRepositoryDao {
    private airportDb;
    constructor(airportDb: IAirportDatabase, utils: IUtils);
    findByTerminalIdInAndRepositoryIdIn(terminalIds: TerminalId[], repositoryIds: AgtRepositoryId[]): Promise<Map<TerminalId, Map<AgtRepositoryId, TerminalRepositoryPermission>>>;
}
