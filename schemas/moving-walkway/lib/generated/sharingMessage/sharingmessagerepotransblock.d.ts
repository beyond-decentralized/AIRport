import { ISharingMessage } from './sharingmessage';
import { IRepositoryTransactionBlock } from '../repositorytransactionblock/repositorytransactionblock';
export interface ISharingMessageRepoTransBlock {
    sharingMessage: ISharingMessage;
    repositoryTransactionBlock: IRepositoryTransactionBlock;
}
