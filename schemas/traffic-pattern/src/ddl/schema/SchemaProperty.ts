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
	PropertyIndex,
	PropertyIsId,
	PropertyName
}                              from '@airport/ground-control'
import {SchemaEntity}          from './SchemaEntity'
import {SchemaPropertyColumn}  from './SchemaPropertyColumn'
import {SchemaRelation}        from './SchemaRelation'
import {VersionedSchemaObject} from './VersionedSchemaObject'

export type SchemaPropertyId = number

@Entity()
@Table({
	name: 'SCHEMA_PROPERTIES'
})
export class SchemaProperty
	extends VersionedSchemaObject {

	@Id()
	@GeneratedValue()
	id: SchemaPropertyId

	index: PropertyIndex

	@ManyToOne()
	@JoinColumn(
		{name: 'SCHEMA_ENTITY_ID', referencedColumnName: 'ID'}
	)
	entity: SchemaEntity

	name: PropertyName

	@Column({name: 'IS_ID'})
	isId: PropertyIsId

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'property'})
	propertyColumns: SchemaPropertyColumn[]

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'property'})
	relation: SchemaRelation[]

}