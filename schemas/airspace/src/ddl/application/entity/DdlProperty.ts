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
	DbProperty_LocalId,
	DbProperty_Index,
	DbProperty_IsId,
	DbProperty_Name,
	DbProperty
} from '@airport/ground-control'
import { DdlEntity } from './DdlEntity'
import { DdlPropertyColumn } from './DdlPropertyColumn'
import { DdlRelation } from './DdlRelation'
import { DdlVersionedObject } from '../../DdlVersionedObject'

@Entity()
@Table({
	name: 'DB_PROPERTIES'
})
export class DdlProperty
	extends DdlVersionedObject
	implements DbProperty {

	@DbNumber()
	@Id()
	@Column({ name: 'DB_PROPERTY_LID', nullable: false })
	_localId: DbProperty_LocalId

	@DbNumber()
	@Column({ name: 'PROPERTY_INDEX', nullable: false })
	index: DbProperty_Index

	@DbString()
	@Column({ name: 'NAME', nullable: false })
	name: DbProperty_Name

	@DbBoolean()
	@Column({ name: 'IS_LID', nullable: false })
	isId: DbProperty_IsId

	@ManyToOne()
	@JoinColumn({ name: 'DB_ENTITY_LID', nullable: false })
	entity: DdlEntity

	@OneToMany({ mappedBy: 'property' })
	propertyColumns: DdlPropertyColumn[] = []

	@OneToMany({ mappedBy: 'property' })
	relation?: DdlRelation[] = []

}
