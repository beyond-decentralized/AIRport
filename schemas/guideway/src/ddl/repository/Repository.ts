import {
	Column,
	DbDate,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	OneToMany,
	Table
}                                      from '@airport/air-control'
import {AgtRepositoryId}               from '@airport/arrivals-n-departures'
import {AgtRepositoryTransactionBlock} from '../synchronization/AgtRepositoryTransactionBlock'
import {TerminalRepository}            from '../terminal/TerminalRepository'
import {RepositoryStatus}              from './RepositoryStatus'

export type RepositoryLastUpdateDatetime = Date;
export type RepositoryName = string;

@Entity()
@Table({name: 'AGT_REPOSITORIES'})
export class Repository {

	@Id()
	@DbNumber()
	@GeneratedValue()
	id: AgtRepositoryId

	@Column({name: 'LAST_UPDATE_DATETIME', nullable: false})
	@DbDate()
	lastUpdateTime: RepositoryLastUpdateDatetime

	// NOTE: needed to for archiving purposes - name of the directory of daily records in month
	@DbString()
	@Column({name: 'NAME', nullable: false})
	name: RepositoryName

	@Column({name: 'STATUS', nullable: false})
	@DbString()
	status: RepositoryStatus

	@OneToMany()
	terminalRepositories: TerminalRepository[]

	@OneToMany()
	repositoryTransactionBlocks: AgtRepositoryTransactionBlock[]

}