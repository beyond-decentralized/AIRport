import {RepositoryTransactionBlockContents} from '@airport/arrivals-n-departures'
import {AgtRepositoryTransactionBlockId}    from '@airport/guideway'
import {ArchiveInfo}                        from '../../../model/ArchiveInfo'

export interface IDataArchiver {

	writeData(
		archiveInfo: ArchiveInfo,
		data: [AgtRepositoryTransactionBlockId, RepositoryTransactionBlockContents][]
	): Promise<void>;

}

export class DataArchiver
	implements IDataArchiver {


	async writeData(
		archiveInfo: ArchiveInfo,
		data: [AgtRepositoryTransactionBlockId, RepositoryTransactionBlockContents][]
	): Promise<void> {
		throw new Error(`Implement`)
	}

}
