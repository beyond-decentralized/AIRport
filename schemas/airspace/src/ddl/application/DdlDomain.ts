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
	DbDomain,
	DbDomain_LocalId,
	DbDomain_Name,
} from '@airport/ground-control'
import { DdlApplication } from './DdlApplication'

@Entity()
@Table({ name: 'DB_DOMAINS' })
export class DdlDomain
	implements DbDomain {

	@Id()
	@DbNumber()
	@Column({ name: 'DB_DOMAIN_LID', nullable: false })
	_localId: DbDomain_LocalId

	@DbString()
	@Column({ name: 'DOMAIN_NAME', nullable: false })
	name?: DbDomain_Name

	@OneToMany({ mappedBy: 'domain' })
	applications?: DdlApplication[]

}
