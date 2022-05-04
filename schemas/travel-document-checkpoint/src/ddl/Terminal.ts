import {
	Column,
	DbBoolean,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
} from '@airport/air-traffic-control'
import { TerminalAgt } from './TerminalAgt'
import { User } from './User'
import { UserTerminal } from './UserTerminal'
import { UserTerminalAgt } from './UserTerminalAgt'

export type TmTerminal_Id = number;
export type Terminal_IsLocal = boolean;
export type Terminal_UuId = string;

/**
 * 
 * DEPRECATED - syncing will now be done via IPFS/Peergos
 * 
 */
@Entity()
@Table({
	name: 'TERMINAL',
	indexes: (t: Terminal) => [{
		property: t.uuId,
		unique: true
	}]
})
export class Terminal {

	@Id()
	@GeneratedValue()
	@DbNumber()
	id: TmTerminal_Id

	@Column({ name: 'UUID', nullable: false })
	@DbString()
	uuId: Terminal_UuId

	@ManyToOne()
	@JoinColumn({ name: 'OWNER_USER_ID', referencedColumnName: 'ID' })
	owner: User

	@Column({ name: 'IS_LOCAL', nullable: false })
	@DbBoolean()
	isLocal: Terminal_IsLocal = false

	// @OneToMany({ mappedBy: 'terminal' })
	// terminalAgts: TerminalAgt[]

	// @OneToMany({ mappedBy: 'terminal' })
	// userTerminal: UserTerminal[]

	// @OneToMany({ mappedBy: 'terminal' })
	// userTerminalAgt: UserTerminalAgt[]

}
