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
} from '@airport/tarmaq-entity'
import {
	ApplicationProperty_LocalId,
	ApplicationProperty_Index,
	ApplicationProperty_IsId,
	ApplicationProperty_Name,
	DbProperty
} from '@airport/ground-control'
import { ApplicationEntity } from './ApplicationEntity'
import { ApplicationPropertyColumn } from './ApplicationPropertyColumn'
import { ApplicationRelation } from './ApplicationRelation'
import { VersionedApplicationObject } from './VersionedApplicationObject'

@Entity()
@Table({
	name: 'APPLICATION_PROPERTIES'
})
export class ApplicationProperty
	extends VersionedApplicationObject
	implements DbProperty {

	@DbNumber()
	@Id()
	@Column({ name: 'APPLICATION_PROPERTY_LID', nullable: false })
	_localId: ApplicationProperty_LocalId

	@DbNumber()
	@Column({ name: 'PROPERTY_INDEX', nullable: false })
	index?: ApplicationProperty_Index

	@DbString()
	@Column({ name: 'NAME', nullable: false })
	name?: ApplicationProperty_Name

	@DbBoolean()
	@Column({ name: 'IS_LID', nullable: false })
	isId?: ApplicationProperty_IsId

	@ManyToOne()
	@JoinColumn({
		name: 'APPLICATION_ENTITY_LID',
		referencedColumnName: 'APPLICATION_ENTITY_LID', nullable: false
	})
	entity?: ApplicationEntity

	@OneToMany({ mappedBy: 'property' })
	propertyColumns?: ApplicationPropertyColumn[] = []

	@OneToMany({ mappedBy: 'property' })
	relation?: ApplicationRelation[] = []

}
