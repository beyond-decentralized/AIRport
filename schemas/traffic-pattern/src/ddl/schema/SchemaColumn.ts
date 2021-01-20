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
}                                from '@airport/air-control';
import {
	ColumnId,
	ColumnIndex,
	ColumnName,
	ColumnNotNull,
	ColumnPrecision,
	ColumnScale,
	IdColumnOnlyIndex,
	SchemaColumnAllocationSize,
	SchemaColumnIsGenerated,
	SQLDataType
}                                from '@airport/ground-control';
import { SchemaEntity }          from './SchemaEntity';
import { SchemaPropertyColumn }  from './SchemaPropertyColumn';
import { SchemaRelationColumn }  from './SchemaRelationColumn';
import { VersionedSchemaObject } from './VersionedSchemaObject';

@Entity()
@Table({
	name: 'SCHEMA_COLUMNS'
})
export class SchemaColumn
	extends VersionedSchemaObject {

	@DbNumber()
	@Id()
	id: ColumnId;

	/**
	 * Overall column index (within the entity).
	 */
	// FIXME: disallow SQL keywords in names (for columns, etc.), like 'INDEX', etc.
	@Column({ name: 'COLUMN_INDEX', nullable: false })
	@DbNumber()
	index: ColumnIndex;

	/**
	 * Index of the ID (within the entity)
	 */
	@Column({ name: 'ID_INDEX' })
	@DbNumber()
	idIndex?: IdColumnOnlyIndex;

	@Column({ name: 'IS_GENERATED', nullable: false })
	@DbBoolean()
	isGenerated: SchemaColumnIsGenerated;

	@Column({ name: 'ALLOCATION_SIZE' })
	@DbNumber()
	allocationSize?: SchemaColumnAllocationSize;

	@Column({ name: 'NAME', nullable: false })
	@DbString()
	name: ColumnName;

	@Column({ name: 'NOT_NULL', nullable: false })
	@DbBoolean()
	notNull: ColumnNotNull;

	@Column({ name: 'PRECISION' })
	@DbNumber()
	precision: ColumnPrecision;

	@Column({ name: 'SCALE' })
	@DbNumber()
	scale: ColumnScale;

	@Column({ name: 'TYPE', nullable: false })
	@DbNumber()
	type: SQLDataType;

	@ManyToOne()
	@JoinColumn({ name: 'SCHEMA_ENTITY_ID', referencedColumnName: 'ID', nullable: false })
	entity: SchemaEntity;

	@OneToMany({ mappedBy: 'column' })
	propertyColumns: SchemaPropertyColumn[] = [];

	@OneToMany({ mappedBy: 'manyColumn' })
	manyRelationColumns: SchemaRelationColumn[] = [];

	@OneToMany({ mappedBy: 'oneColumn' })
	oneRelationColumns: SchemaRelationColumn[] = [];

}
