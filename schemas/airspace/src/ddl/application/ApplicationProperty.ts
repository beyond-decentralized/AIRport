import {
	Column,
	DbBoolean,
	DbNumber,
	DbString,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
}                              from '@airport/air-control'
import {
	PropertyId,
	PropertyIndex,
	PropertyIsId,
	PropertyName
}                              from '@airport/ground-control'
import {ApplicationEntity}          from './ApplicationEntity'
import {ApplicationPropertyColumn}  from './ApplicationPropertyColumn'
import {ApplicationRelation}        from './ApplicationRelation'
import {VersionedApplicationObject} from './VersionedApplicationObject'

@Entity()
@Table({
	name: 'APPLICATION_PROPERTIES'
})
export class ApplicationProperty
	extends VersionedApplicationObject {

	@DbNumber()
	@Id()
	id: PropertyId

	@DbNumber()
	@Column({name: 'PROPERTY_INDEX', nullable: false})
	index: PropertyIndex

	@DbString()
	@Column({name: 'NAME', nullable: false})
	name: PropertyName

	@DbBoolean()
	@Column({name: 'IS_ID', nullable: false})
	isId: PropertyIsId

	@ManyToOne()
	@JoinColumn(
		{name: 'APPLICATION_ENTITY_ID', referencedColumnName: 'ID', nullable: false}
	)
	entity: ApplicationEntity

	@OneToMany({mappedBy: 'property'})
	propertyColumns: ApplicationPropertyColumn[] = []

	@OneToMany({mappedBy: 'property'})
	relation: ApplicationRelation[] = []

}
