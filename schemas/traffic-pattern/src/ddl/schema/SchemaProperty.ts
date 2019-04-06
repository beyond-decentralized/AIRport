import {
	Column,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
}                              from '@airport/air-control'
import {
	CascadeType,
	PropertyId,
	PropertyIndex,
	PropertyIsId,
	PropertyName
} from '@airport/ground-control'
import {SchemaEntity}          from './SchemaEntity'
import {SchemaPropertyColumn}  from './SchemaPropertyColumn'
import {SchemaRelation}        from './SchemaRelation'
import {VersionedSchemaObject} from './VersionedSchemaObject'

@Entity()
@Table({
	name: 'SCHEMA_PROPERTIES'
})
export class SchemaProperty
	extends VersionedSchemaObject {

	@Id()
	@GeneratedValue()
	id: PropertyId

	@Column({name: 'PROPERTY_INDEX', nullable: false})
	index: PropertyIndex

	@ManyToOne()
	@JoinColumn(
		{name: 'SCHEMA_ENTITY_ID', referencedColumnName: 'ID', nullable: false}
	)
	entity: SchemaEntity

	@Column({name: 'NAME', nullable: false})
	name: PropertyName

	@Column({name: 'IS_ID', nullable: false})
	isId: PropertyIsId

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'property'})
	propertyColumns: SchemaPropertyColumn[]

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'property'})
	relation: SchemaRelation[]

}
