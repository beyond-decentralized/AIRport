import { IUtils } from "@airport/air-control/lib/lingo/utils/Utils";
import { TerminalName, TerminalSecondId, UserId } from "../../ddl/ddl";
import { BaseTerminalDao, IBaseTerminalDao, ITerminal } from "../../generated/generated";
export interface ITerminalDao extends IBaseTerminalDao {
    findMapByIds(ownerUniqueIds: UserId[], names: TerminalName[], secondIds: TerminalSecondId[]): Promise<Map<UserId, Map<TerminalName, Map<TerminalSecondId, ITerminal>>>>;
    findByIds(ownerIds: UserId[], names: TerminalName[], secondIds: TerminalSecondId[]): Promise<ITerminal[]>;
}
export declare class TerminalDao extends BaseTerminalDao implements ITerminalDao {
    constructor(utils: IUtils);
    findMapByIds(ownerIds: UserId[], names: TerminalName[], secondIds: TerminalSecondId[]): Promise<Map<UserId, Map<TerminalName, Map<TerminalSecondId, ITerminal>>>>;
    findByIds(ownerIds: UserId[], names: TerminalName[], secondIds: TerminalSecondId[]): Promise<ITerminal[]>;
}
