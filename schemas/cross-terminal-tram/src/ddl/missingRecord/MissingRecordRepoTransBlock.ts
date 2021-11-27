import {
	Entity,
	JoinColumn,
	ManyToOne,
	Table
}                                   from '@airport/air-control'
import {RepositoryTransactionBlock} from '../repositoryTransactionBlock/RepositoryTransactionBlock'
import {MissingRecord}              from './MissingRecord'

@Entity()
@Table({name: 'MISSING_RECORD_REPO_TRANS_BLOCKS'})
export class MissingRecordRepoTransBlock {

	@ManyToOne()
	@JoinColumn({name: 'MISSING_RECORD_ID', referencedColumnName: 'ID'})
	missingRecord: MissingRecord

	@ManyToOne()
	@JoinColumn({name: 'REPOSITORY_TRANSACTION_BLOCK_ID', referencedColumnName: 'ID'})
	repositoryTransactionBlock: RepositoryTransactionBlock

}