import { ITerminal } from '@airport/travel-document-checkpoint';
import { IDataToTM } from '../SyncInUtils';
import { UserCheckResults } from './SyncInUserChecker';
export interface TerminalCheckResults {
    mapByMessageIndex: ITerminal[];
    consistentMessages: IDataToTM[];
    inconsistentMessages: IDataToTM[];
}
export interface ISyncInTerminalChecker {
}
export declare class SyncInTerminalChecker implements ISyncInTerminalChecker {
    ensureTerminalsAndGetAsMaps(dataMessages: IDataToTM[], localTerminal: ITerminal, userCheckResults: UserCheckResults): Promise<TerminalCheckResults>;
    private recordTerminalCredentials;
    private areTerminalIdsConsistentInMessageData;
    private addMissingTerminals;
}
