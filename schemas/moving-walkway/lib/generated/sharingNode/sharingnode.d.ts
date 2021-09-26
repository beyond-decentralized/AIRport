import { ISharingMessage } from '../sharingMessage/sharingmessage';
import { ISharingNodeRepoTransBlock } from './sharingnoderepotransblock';
export interface ISharingNode {
    id: number;
    sharingMechanism?: string;
    isActive?: boolean;
    syncFrequency?: number;
    connectionProtocol?: string;
    connectionUrl?: string;
    messages?: ISharingMessage[];
    sharingNodeRepoTransBlocks?: ISharingNodeRepoTransBlock[];
}
//# sourceMappingURL=sharingnode.d.ts.map