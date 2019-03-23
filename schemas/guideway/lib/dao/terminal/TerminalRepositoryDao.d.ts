import { AgtRepositoryId, TerminalId } from '@airport/arrivals-n-departures';
import { TerminalRepositoryPermission } from '../../ddl/ddl';
import { BaseTerminalRepositoryDao } from '../../generated/generated';
export interface ITerminalRepositoryDao {
    findByTerminalIdInAndRepositoryIdIn(terminalIds: TerminalId[], repositoryIds: AgtRepositoryId[]): Promise<Map<TerminalId, Map<AgtRepositoryId, TerminalRepositoryPermission>>>;
}
export declare class TerminalRepositoryDao extends BaseTerminalRepositoryDao implements ITerminalRepositoryDao {
    findByTerminalIdInAndRepositoryIdIn(terminalIds: TerminalId[], repositoryIds: AgtRepositoryId[]): Promise<Map<TerminalId, Map<AgtRepositoryId, TerminalRepositoryPermission>>>;
}
