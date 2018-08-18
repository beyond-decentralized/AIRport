import { ISharingNode, SharingNodeSyncFrequency } from '@airport/moving-walkway';
import { IDomain } from '@airport/territory';
import { ITerminal } from '@airport/travel-document-checkpoint';
export interface ITerminalState {
    terminal: ITerminal;
    nodesBySyncFrequency: Map<SharingNodeSyncFrequency, ISharingNode[]>;
    domains: IDomain[];
}
