import { IContext } from '@airport/direction-indicator';
import { User_Id, Terminal_UuId } from '../ddl/ddl';
import { BaseTerminalDao, IBaseTerminalDao, ITerminal } from '../generated/generated';
export interface ITerminalDao extends IBaseTerminalDao {
    findByOwnerIdsAndUuIds(ownerIds: User_Id[], uuIds: Terminal_UuId[]): Promise<ITerminal[]>;
    findByUuIds(uuIds: Terminal_UuId[]): Promise<ITerminal[]>;
    insert(terminals: ITerminal[], context: IContext): Promise<void>;
}
export declare class TerminalDao extends BaseTerminalDao implements ITerminalDao {
    findByOwnerIdsAndUuIds(ownerIds: User_Id[], uuIds: Terminal_UuId[]): Promise<ITerminal[]>;
    findByUuIds(uuIds: Terminal_UuId[]): Promise<ITerminal[]>;
    insert(terminals: ITerminal[], context: IContext): Promise<void>;
}
//# sourceMappingURL=TerminalDao.d.ts.map