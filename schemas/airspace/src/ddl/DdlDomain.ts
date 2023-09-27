import {
	Column,
	DbNumber,
	DbString,
	Entity,
	Id,
	OneToMany,
	Table,
} from '@airport/tarmaq-entity'
import {
	IDomain,
	Domain_LocalId,
	Domain_Name,
} from '@airport/ground-control'
import { DdlApplication } from './application/DdlApplication'

@Entity()
@Table({ name: 'DB_DOMAINS' })
export class DdlDomain
	implements IDomain {

	@Id()
	@DbNumber()
	@Column({ name: 'DB_DOMAIN_LID', nullable: false })
	_localId: Domain_LocalId

	@DbString()
	@Column({ name: 'DOMAIN_NAME', nullable: false })
	name: Domain_Name

	@OneToMany({ mappedBy: 'domain' })
	applications?: DdlApplication[]

}
