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
	Table
} from '@airport/air-traffic-control'
import { ClientType } from '../client/ClientType';
import { Continent } from '../locality/Continent';
import { Country } from '../locality/Country';
import { MetroArea } from '../locality/MetroArea';
import { State } from '../locality/State';
import { User } from '../User'
import { TerminalType } from './TerminalType';

export type TmTerminal_Id = number;
export type Terminal_IsLocal = boolean;
export type Terminal_GUID = string;

@Entity()
@Table({
	name: 'TERMINAL',
	indexes: (t: Terminal) => [{
		property: t.GUID,
		unique: true
	}]
})
export class Terminal {

	@Id()
	@GeneratedValue()
	@DbNumber()
	id: TmTerminal_Id

	@Column({ name: 'GUID', nullable: false })
	@DbString()
	GUID: Terminal_GUID

	@ManyToOne()
	@JoinColumn({ name: 'TERMINAL_TYPE_ID', referencedColumnName: 'ID' })
	terminalType: TerminalType

	@ManyToOne()
	@JoinColumn({ name: 'OWNER_USER_ID', referencedColumnName: 'ID', nullable: true })
	owner?: User

	@Column({ name: 'IS_LOCAL', nullable: false })
	@DbBoolean()
	isLocal: Terminal_IsLocal = false

	@ManyToOne()
	@JoinColumn({ name: 'CONTINENT_ID', referencedColumnName: 'ID', nullable: true })
	continent?: Continent

	@ManyToOne()
	@JoinColumn({ name: 'COUNTRY_ID', referencedColumnName: 'ID', nullable: true })
	country?: Country

	@ManyToOne()
	@JoinColumn({ name: 'STATE_ID', referencedColumnName: 'ID', nullable: true })
	state?: State

	@ManyToOne()
	@JoinColumn({ name: 'METRO_AREA_ID', referencedColumnName: 'ID', nullable: true })
	metroArea?: MetroArea

}
