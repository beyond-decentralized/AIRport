import { ITerminal, Terminal_GUID, Terminal_IsLocal, Terminal_LocalId } from '@airport/ground-control'
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
} from '@airport/tarmaq-entity'
import { Continent } from '../locality/Continent'
import { Country } from '../locality/Country'
import { MetroArea } from '../locality/MetroArea'
import { State } from '../locality/State'
import { UserAccount } from '../UserAccount'
import { TerminalType } from './TerminalType'

/**
 * AIRport terminal where the Apps execute (a browser tab, native app, etc.)
 */
@Entity()
@Table({
	name: 'TERMINALS',
	indexes: (t: Terminal) => [{
		property: t.GUID,
		unique: true
	}]
})
export class Terminal
	implements ITerminal {

	@Id()
	@GeneratedValue()
	@Column({ name: 'TERMINAL_LID', nullable: false })
	@DbNumber()
	_localId: Terminal_LocalId

	@Column({ name: 'TERMINAL_GUID', nullable: false })
	@DbString()
	GUID?: Terminal_GUID

	@ManyToOne()
	@JoinColumn({
		name: 'OWNER_USER_ACCOUNT_LID',
		referencedColumnName: 'USER_ACCOUNT_LID', nullable: true
	})
	owner?: UserAccount

	@Column({ name: 'IS_LOCAL', nullable: false })
	@DbBoolean()
	isLocal?: Terminal_IsLocal = false

	@ManyToOne()
	@JoinColumn({
		name: 'CONTINENT_ID',
		referencedColumnName: 'CONTINENT_ID', nullable: true
	})
	continent?: Continent

	@ManyToOne()
	@JoinColumn({
		name: 'COUNTRY_ID',
		referencedColumnName: 'COUNTRY_ID', nullable: true
	})
	country?: Country
	@ManyToOne()
	@JoinColumn({
		name: 'STATE_ID',
		referencedColumnName: 'STATE_ID', nullable: true
	})
	state?: State

	@ManyToOne()
	@JoinColumn({
		name: 'METRO_AREA_ID',
		referencedColumnName: 'METRO_AREA_ID', nullable: true
	})
	metroArea?: MetroArea

	@OneToMany({ mappedBy: 'terminal' })
	terminalTypes?: TerminalType[]

}
