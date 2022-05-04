import {
	DbNumber,
	DbString,
	Entity,
	Id,
	OneToMany,
	Table,
}                    from '@airport/air-traffic-control'
import {
	DomainId,
	DomainName,
}                    from '@airport/ground-control'
import { Application } from './Application'

@Entity()
@Table({name: 'DOMAINS'})
export class Domain {

	@Id()
	@DbNumber()
	id: DomainId

	@DbString()
	name: DomainName

	@OneToMany({mappedBy: 'domain'})
	applications: Application[]

}
