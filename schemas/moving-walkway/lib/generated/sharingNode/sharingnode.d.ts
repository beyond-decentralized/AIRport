import { ISharingMessage } from '../sharingMessage/sharingmessage';
import { ISharingNodeRepoTransBlock } from './sharingnoderepotransblock';
export interface ISharingNode {
    id: number;
    sharingMechanism?: number;
    isActive?: boolean;
    syncFrequency?: number;
    connectionProtocol?: number;
    connectionUrl?: string;
    messages?: ISharingMessage[];
    sharingNodeRepoTransBlocks?: ISharingNodeRepoTransBlock[];
}
//# sourceMappingURL=sharingnode.d.ts.map