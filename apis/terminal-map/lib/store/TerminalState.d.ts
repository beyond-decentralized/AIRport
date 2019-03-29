import { ISharingNode, SharingNodeSyncFrequency } from '@airport/moving-walkway';
import { IDomain } from '@airport/territory';
import { ISchema } from '@airport/traffic-pattern';
import { ITerminal } from '@airport/travel-document-checkpoint';
export interface ITerminalState {
    terminal: ITerminal;
    nodesBySyncFrequency: Map<SharingNodeSyncFrequency, ISharingNode[]>;
    domains: IDomain[];
    schemas: ISchema[];
}
