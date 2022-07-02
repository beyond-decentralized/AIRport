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
import { Continent } from './locality/Continent';
import { Country } from './locality/Country';
import { MetroArea } from './locality/MetroArea';
import { State } from './locality/State';
import { User } from './User'

export type TmTerminal_Id = number;
export type Terminal_IsLocal = boolean;
export type Terminal_GUID = string;

/**
 * 
 * DEPRECATED - syncing will now be done via IPFS/Peergos
 * 
 */
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
	@JoinColumn({ name: 'OWNER_USER_ID', referencedColumnName: 'ID' })
	owner: User

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
