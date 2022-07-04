import { IContext } from '@airport/direction-indicator';
import { User_LocalId, Terminal_GUID } from '../ddl/ddl';
import { BaseTerminalDao, IBaseTerminalDao, ITerminal } from '../generated/generated';
export interface ITerminalDao extends IBaseTerminalDao {
    findByOwnerIdsAndGUIDs(ownerIds: User_LocalId[], GUIDs: Terminal_GUID[]): Promise<ITerminal[]>;
    findByGUIDs(GUIDs: Terminal_GUID[]): Promise<ITerminal[]>;
    insert(terminals: ITerminal[], context: IContext): Promise<void>;
}
export declare class TerminalDao extends BaseTerminalDao implements ITerminalDao {
    findByOwnerIdsAndGUIDs(ownerIds: User_LocalId[], GUIDs: Terminal_GUID[]): Promise<ITerminal[]>;
    findByGUIDs(GUIDs: Terminal_GUID[]): Promise<ITerminal[]>;
    insert(terminals: ITerminal[], context: IContext): Promise<void>;
}
//# sourceMappingURL=TerminalDao.d.ts.map