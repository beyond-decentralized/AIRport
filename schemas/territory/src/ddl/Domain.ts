import {
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	OneToMany,
	Table,
	Transient
}                    from '@airport/air-control'
import {
	DbDomain,
	DbSchema,
	DomainId,
	DomainName,
}                    from '@airport/ground-control'
import {Application} from './Application'

@Entity()
@Table({name: 'DOMAINS'})
export class Domain
	implements DbDomain {

	@Id()
	@DbNumber()
	id: DomainId

	@DbString()
	name: DomainName

	@OneToMany({mappedBy: 'domain'})
	applications: Application[]

	@Transient()
	schemas: DbSchema[]

}
