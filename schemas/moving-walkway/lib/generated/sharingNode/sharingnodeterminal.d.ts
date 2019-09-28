import { ISharingNode } from './sharingnode';
import { ITerminal } from '@airport/travel-document-checkpoint';
export interface ISharingNodeTerminal {
    sharingNode: ISharingNode;
    terminal: ITerminal;
    agtTerminalId?: number;
    agtTerminalPassword?: string;
    terminalSyncStatus?: number;
}
