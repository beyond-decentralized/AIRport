import { BaseTerminalRunDao, IBaseTerminalRunDao, TerminalRunECreateProperties } from '../generated/generated';
export interface ITerminalRunDao extends IBaseTerminalRunDao {
    create<EntityInfo extends TerminalRunECreateProperties[] | TerminalRunECreateProperties>(entityInfo: EntityInfo): Promise<number>;
}
export declare class TerminalRunDao extends BaseTerminalRunDao implements ITerminalRunDao {
}
