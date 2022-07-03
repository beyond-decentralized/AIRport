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
import { Continent } from '../locality/Continent'
import { Country } from '../locality/Country'
import { MetroArea } from '../locality/MetroArea'
import { State } from '../locality/State'
import { User } from '../User'
import { TerminalType } from './TerminalType'

export type Terminal_LocalId = number;
export type Terminal_IsLocal = boolean;
export type Terminal_GUID = string;

@Entity()
@Table({
	name: 'TERMINALS',
	indexes: (t: Terminal) => [{
		property: t.GUID,
		unique: true
	}]
})
export class Terminal {

	@Id()
	@GeneratedValue()
	@DbNumber()
	@Column({ name: 'TERMINAL_LID' })
	_localId: Terminal_LocalId

	@Column({ name: 'GUID', nullable: false })
	@DbString()
	GUID: Terminal_GUID

	@ManyToOne()
	@JoinColumn({
		name: 'OWNER_USER_LID',
		referencedColumnName: 'OWNER_USER_LID', nullable: true
	})
	owner?: User

	@Column({ name: 'IS_LOCAL', nullable: false })
	@DbBoolean()
	isLocal: Terminal_IsLocal = false

	@ManyToOne()
	@JoinColumn({
		name: 'CONTINENT_LID',
		referencedColumnName: 'CONTINENT_LID', nullable: true
	})
	continent?: Continent

	@ManyToOne()
	@JoinColumn({
		name: 'COUNTRY_LID',
		referencedColumnName: 'COUNTRY_LID', nullable: true
	})
	country?: Country

	@OneToMany({ mappedBy: 'terminal' })
	terminalTypes: TerminalType[]

	@ManyToOne()
	@JoinColumn({
		name: 'STATE_LID',
		referencedColumnName: 'STATE_LID', nullable: true
	})
	state?: State

	@ManyToOne()
	@JoinColumn({
		name: 'METRO_AREA_LID',
		referencedColumnName: 'METRO_AREA_LID', nullable: true
	})
	metroArea?: MetroArea

}
