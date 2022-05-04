import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	JoinColumns,
	ManyToOne,
	Table
}                    from '@airport/air-traffic-control'
import {Agt}         from './Agt'
import {Terminal}    from './Terminal'
import {TerminalAgt} from './TerminalAgt'
import {User}        from './User'

export type UserTerminalAgtPassword = number;

export type UserTerminalAgtId = number;
export type UserTerminalAgtAgtId = number;

/**
 * DEPRECATED - syncing will now be done via IPFS/Peergos
 * 
 * User needs some sort of password that can be used to verify that
 * a given user is indeed making changes (instead of another one).
 *
 * The password should be AGT specific and Terminal specific
 * to reduce security risks.
 *
 * The password is generated as soon as a user is verified with
 * a terminal and then subsequently registered with an AGT (on
 * the next transaction)
 *
 * Registration is made using an already known to AGT Terminal
 * Id and password, to verify that is indeed coming from the
 * specified terminal.
 *
 * FIXME: additional credentials are needed for User-Agt registration
 * see of OpenConnect can provide something verifiable with the
 * provider
 */
@Entity()
@Table({name: 'USER_TERMINAL_AGT'})
export class UserTerminalAgt {

	@Id()
	@DbNumber()
	@GeneratedValue()
	id: UserTerminalAgtId

	@Id()
	@Column({name: 'AGT_ID'})
	@DbNumber()
	@GeneratedValue()
	agtId: UserTerminalAgtAgtId

	password: UserTerminalAgtPassword

	@ManyToOne()
	@JoinColumn({name: 'USER_ID', referencedColumnName: 'ID'})
	user: User

	@ManyToOne()
	@JoinColumn({name: 'TERMINAL_ID', referencedColumnName: 'ID'})
	terminal: Terminal

	@ManyToOne()
	@JoinColumn({name: 'AGT_ID', referencedColumnName: 'ID'})
	agt: Agt

	@ManyToOne()
	@JoinColumns([
		{name: 'AGT_ID'},
		{name: 'TERMINAL_ID'}
	])
	terminalAgt: TerminalAgt

}
