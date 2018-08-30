import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
}                           from '@airport/air-control'
import {
	TerminalId,
	TerminalName,
	TerminalPassword,
	TerminalSecondId
}                           from '@airport/arrivals-n-departures'
import {AgtSharingMessage}  from '../synchronization/AgtSharingMessage'
import {User}               from '../user/User'
import {TerminalRepository} from './TerminalRepository'

export type TerminalLastPollConnectionDatetime = number;
export type TerminalLastSseConnectionDatetime = number;

/**
 * Represents the client-side terminal.
 */
@Entity()
@Table({name: 'AGT_TERMINALS'})
export class Terminal {

	@Id()
	@DbNumber()
	@GeneratedValue()
	id: TerminalId

	@Column({name: 'NAME', nullable: false})
	@DbString()
	name: TerminalName

	@DbNumber()
	@Column({name: 'SECOND_ID', nullable: false})
	secondId: TerminalSecondId

	@Column({name: 'PASSWORD', nullable: false})
	@DbString()
	password: TerminalPassword

	@Column({name: 'LAST_RECENT_CONNECTION_DATETIME', nullable: false})
	@DbNumber()
	lastPollConnectionDatetime: TerminalLastPollConnectionDatetime

	@Column({name: 'LAST_ARCHIVE_CONNECTION_DATETIME'})
	@DbNumber()
	lastSseConnectionDatetime: TerminalLastSseConnectionDatetime

	@ManyToOne()
	@JoinColumn(
		{name: 'USER_ID', referencedColumnName: 'ID', nullable: false}
	)
	user: User

	@OneToMany()
	terminalRepositories: TerminalRepository[]

	@OneToMany()
	sharingMessages: AgtSharingMessage[]

}