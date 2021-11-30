import { UserId, Terminal_UuId } from '../ddl/ddl';
import { BaseTerminalDao, IBaseTerminalDao, ITerminal } from '../generated/generated';
export interface ITerminalDao extends IBaseTerminalDao {
    findByOwnerIdsAndUuIds(ownerIds: UserId[], uuIds: Terminal_UuId[]): Promise<ITerminal[]>;
    findByUuIds(uuIds: Terminal_UuId[]): Promise<ITerminal[]>;
    insert(terminals: ITerminal[]): Promise<void>;
}
export declare class TerminalDao extends BaseTerminalDao implements ITerminalDao {
    findByOwnerIdsAndUuIds(ownerIds: UserId[], uuIds: Terminal_UuId[]): Promise<ITerminal[]>;
    findByUuIds(uuIds: Terminal_UuId[]): Promise<ITerminal[]>;
    insert(terminals: ITerminal[]): Promise<void>;
}
//# sourceMappingURL=TerminalDao.d.ts.map