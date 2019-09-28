import { IAgtSharingMessage } from './agtsharingmessage';
import { IAgtRepositoryTransactionBlock } from './agtrepositorytransactionblock';
export interface ISyncLog {
    sharingMessage: IAgtSharingMessage;
    repositoryTransactionBlock: IAgtRepositoryTransactionBlock;
}
