import { UserId, Terminal_UuId } from '../ddl/ddl';
import { BaseTerminalDao, IBaseTerminalDao, ITerminal } from '../generated/generated';
export interface ITerminalDao extends IBaseTerminalDao {
    findMapByIds(ownerUniqueIds: UserId[], uuIds: Terminal_UuId[]): Promise<Map<UserId, Map<Terminal_UuId, ITerminal>>>;
    findByIds(ownerIds: UserId[], uuIds: Terminal_UuId[]): Promise<ITerminal[]>;
}
export declare class TerminalDao extends BaseTerminalDao implements ITerminalDao {
    findMapByIds(ownerIds: UserId[], uuIds: Terminal_UuId[]): Promise<Map<UserId, Map<Terminal_UuId, ITerminal>>>;
    findByIds(ownerIds: UserId[], uuIds: Terminal_UuId[]): Promise<ITerminal[]>;
}
//# sourceMappingURL=TerminalDao.d.ts.map