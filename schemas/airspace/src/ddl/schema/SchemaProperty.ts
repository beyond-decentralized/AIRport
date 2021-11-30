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
		{name: 'SCHEMA_ENTITY_ID', referencedColumnName: 'ID', nullable: false}
	)
	entity: SchemaEntity

	@OneToMany({mappedBy: 'property'})
	propertyColumns: SchemaPropertyColumn[] = []

	@OneToMany({mappedBy: 'property'})
	relation: SchemaRelation[] = []

}
