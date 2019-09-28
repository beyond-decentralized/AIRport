import { ISharingNode } from './sharingnode';
import { IRepositoryTransactionBlock } from '../repositorytransactionblock/repositorytransactionblock';
export interface ISharingNodeRepoTransBlock {
    sharingNode: ISharingNode;
    repositoryTransactionBlock: IRepositoryTransactionBlock;
    syncStatus?: number;
}
