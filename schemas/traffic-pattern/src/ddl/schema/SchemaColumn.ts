import { Column, DbNumber, Entity, Id, OneToMany, Table } from '@airport/air-control';
import {
	ColumnIndex,
	ColumnName,
	IdColumnOnlyIndex,
	SchemaColumnAllocationSize,
	SchemaColumnIsGenerated,
	SchemaVersionId,
	SQLDataType,
	TableIndex
} from '@airport/ground-control'
import { ISchemaColumn } from "../../generated/schema/qschemacolumn";
import { ISchemaRelationColumn } from "../../generated/schema/qschemarelationcolumn";
import { ISchemaPropertyColumn } from "../../generated/schema/qschemapropertycolumn";

@Entity()
@Table({
	name: "SCHEMA_COLUMNS"
})
export class SchemaColumn
	implements ISchemaColumn {

	/**
	 * Overall column index (within the entity).
	 */
	@Id()
	index: ColumnIndex;

	@Id()
	@Column({name: "TABLE_INDEX"})
	tableIndex: TableIndex;

	@Id()
	@Column({name: "SCHEMA_VERSION_ID"})
	schemaVersionId: SchemaVersionId;

	@OneToMany({mappedBy: "column"})
	propertyColumns: ISchemaPropertyColumn[];

	/**
	 * Index of the ID (within the entity)
	 */
	@Column({name: "ID_INDEX"})
	idIndex: IdColumnOnlyIndex;

	@Column({name: "IS_GENERATED"})
	isGenerated: SchemaColumnIsGenerated;

	@Column({name: "ALLOCATION_SIZE"})
	allocationSize: SchemaColumnAllocationSize;

	name: ColumnName;

	@OneToMany({mappedBy: "manyColumn"})
	manyRelationColumns: ISchemaRelationColumn[];

	@OneToMany({mappedBy: "oneColumn"})
	oneRelationColumns: ISchemaRelationColumn[];

	@DbNumber()
	type: SQLDataType;

}