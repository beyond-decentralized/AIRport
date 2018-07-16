import { IUtils } from "@airport/air-control";
import { BaseLogEntryValueDao, IBaseLogEntryValueDao } from "../generated/baseDaos";
export interface ILogEntryValueDao extends IBaseLogEntryValueDao {
}
export declare class LogEntryValueDao extends BaseLogEntryValueDao implements ILogEntryValueDao {
    constructor(utils: IUtils);
}
