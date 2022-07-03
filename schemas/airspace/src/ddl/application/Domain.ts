import {
	Column,
	DbNumber,
	DbString,
	Entity,
	Id,
	OneToMany,
	Table,
} from '@airport/air-traffic-control'
import {
	Domain_LocalId,
	Domain_Name,
} from '@airport/ground-control'
import { Application } from './Application'

@Entity()
@Table({ name: 'DOMAINS' })
export class Domain {

	@Id()
	@DbNumber()
	@Column({ name: 'DOMAIN_LID' })
	_localId: Domain_LocalId

	@DbString()
	name: Domain_Name

	@OneToMany({ mappedBy: 'domain' })
	applications: Application[]

}
