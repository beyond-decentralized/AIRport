import { RepositoryTransactionBlockContents } from '@airport/arrivals-n-departures';
import { AgtRepositoryTransactionBlockId } from '@airport/guideway';
import { ArchiveInfo } from '../../../model/ArchiveInfo';
export interface IDataArchiver {
    writeData(archiveInfo: ArchiveInfo, data: [AgtRepositoryTransactionBlockId, RepositoryTransactionBlockContents][]): Promise<void>;
}
export declare class DataArchiver implements IDataArchiver {
    writeData(archiveInfo: ArchiveInfo, data: [AgtRepositoryTransactionBlockId, RepositoryTransactionBlockContents][]): Promise<void>;
}
//# sourceMappingURL=DataArchiver.d.ts.map