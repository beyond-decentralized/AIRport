import { IUtils } from "@airport/air-control";
import { BaseLogEntryTypeDao, IBaseLogEntryDao } from "../generated/baseDaos";
export interface ILogEntryTypeDao extends IBaseLogEntryDao {
}
export declare class LogEntryTypeDao extends BaseLogEntryTypeDao implements ILogEntryTypeDao {
    constructor(utils: IUtils);
}
