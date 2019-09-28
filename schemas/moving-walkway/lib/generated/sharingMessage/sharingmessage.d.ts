import { ISharingNode } from '../sharingnode/sharingnode';
import { ISharingMessageRepoTransBlock } from './sharingmessagerepotransblock';
export interface ISharingMessage {
    id: number;
    sharingNode: ISharingNode;
    origin?: number;
    agtSharingMessageId?: number;
    syncTimestamp?: Date;
    sharingMessageRepoTransBlocks?: ISharingMessageRepoTransBlock[];
}
