import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
}                              from '@airport/air-control'
import {
	ColumnIndex,
	ColumnName,
	IdColumnOnlyIndex,
	SchemaColumnAllocationSize,
	SchemaColumnIsGenerated,
	SQLDataType
}                              from '@airport/ground-control'
import {ISchemaPropertyColumn} from '../../generated/schema/qschemapropertycolumn'
import {ISchemaRelationColumn} from '../../generated/schema/qschemarelationcolumn'
import {SchemaEntity}          from './SchemaEntity'
import {VersionedSchemaObject} from './VersionedSchemaObject'

export type SchemaColumnId = number

@Entity()
@Table({
	name: 'SCHEMA_COLUMNS'
})
export class SchemaColumn
	extends VersionedSchemaObject {

	@Id()
	@GeneratedValue()
	id: SchemaColumnId

	/**
	 * Overall column index (within the entity).
	 */
	index: ColumnIndex

	@ManyToOne()
	@JoinColumn({name: 'SCHEMA_ENTITY_ID', referencedColumnName: 'ID'})
	entity: SchemaEntity

	@OneToMany({mappedBy: 'column'})
	propertyColumns: ISchemaPropertyColumn[]

	/**
	 * Index of the ID (within the entity)
	 */
	@Column({name: 'ID_INDEX'})
	idIndex: IdColumnOnlyIndex

	@Column({name: 'IS_GENERATED'})
	isGenerated: SchemaColumnIsGenerated

	@Column({name: 'ALLOCATION_SIZE'})
	allocationSize: SchemaColumnAllocationSize

	name: ColumnName

	@OneToMany({mappedBy: 'manyColumn'})
	manyRelationColumns: ISchemaRelationColumn[]

	@OneToMany({mappedBy: 'oneColumn'})
	oneRelationColumns: ISchemaRelationColumn[]

	@DbNumber()
	type: SQLDataType

}