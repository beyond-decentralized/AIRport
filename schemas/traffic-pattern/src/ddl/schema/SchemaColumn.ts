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
	ColumnId,
	ColumnIndex,
	ColumnName,
	ColumnNotNull,
	IdColumnOnlyIndex,
	SchemaColumnAllocationSize,
	SchemaColumnIsGenerated,
	SQLDataType
} from '@airport/ground-control'
import {ISchemaPropertyColumn} from '../../generated/schema/qschemapropertycolumn'
import {ISchemaRelationColumn} from '../../generated/schema/qschemarelationcolumn'
import {SchemaEntity}          from './SchemaEntity'
import {VersionedSchemaObject} from './VersionedSchemaObject'

@Entity()
@Table({
	name: 'SCHEMA_COLUMNS'
})
export class SchemaColumn
	extends VersionedSchemaObject {

	@Id()
	id: ColumnId

	/**
	 * Overall column index (within the entity).
	 */
		// FIXME: disallow SQL keywords in names (for columns, etc.), like 'INDEX', etc.
	@Column({name: 'COLUMN_INDEX', nullable: false})
	index: ColumnIndex

	@ManyToOne()
	@JoinColumn({name: 'SCHEMA_ENTITY_ID', referencedColumnName: 'ID', nullable: false})
	entity: SchemaEntity

	/**
	 * Index of the ID (within the entity)
	 */
	@Column({name: 'ID_INDEX'})
	idIndex?: IdColumnOnlyIndex

	@Column({name: 'IS_GENERATED', nullable: false})
	isGenerated: SchemaColumnIsGenerated

	@Column({name: 'ALLOCATION_SIZE'})
	allocationSize?: SchemaColumnAllocationSize

	@Column({name: 'NAME', nullable: false})
	name: ColumnName

	@Column({name: 'NOT_NULL', nullable: false})
	notNull: ColumnNotNull

	@DbNumber()
	@Column({name: 'TYPE', nullable: false})
	type: SQLDataType

	@OneToMany({mappedBy: 'column'})
	propertyColumns: ISchemaPropertyColumn[] = []

	@OneToMany({mappedBy: 'manyColumn'})
	manyRelationColumns: ISchemaRelationColumn[] = []

	@OneToMany({mappedBy: 'oneColumn'})
	oneRelationColumns: ISchemaRelationColumn[] = []

}
