import { ITerminal, ITerminalDao } from "@airport/holding-pattern";
import { IUtils } from "@airport/air-control";
import { IDataToTM } from "../SyncInUtils";
import { UserCheckResults } from "./SyncInUserChecker";
export interface TerminalCheckResults {
    mapByMessageIndex: ITerminal[];
    consistentMessages: IDataToTM[];
    inconsistentMessages: IDataToTM[];
}
export interface ISyncInTerminalChecker {
}
export declare class SyncInTerminalChecker implements ISyncInTerminalChecker {
    private terminalDao;
    private utils;
    constructor(terminalDao: ITerminalDao, utils: IUtils);
    ensureTerminalsAndGetAsMaps(dataMessages: IDataToTM[], localTerminal: ITerminal, userCheckResults: UserCheckResults): Promise<TerminalCheckResults>;
    private recordTerminalCredentials;
    private areTerminalIdsConsistentInMessageData;
    private addMissingTerminals;
}
