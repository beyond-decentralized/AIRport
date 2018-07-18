import { Column, DbNumber, Entity, Id, OneToMany, Table } from '@airport/air-control';
import { SQLDataType } from "@airport/ground-control";
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
	index: number;

	@Id()
	@Column({name: "TABLE_INDEX"})
	tableIndex: number;

	@Id()
	@Column({name: "SCHEMA_VERSION_ID"})
	schemaVersionId: number;

	@OneToMany({mappedBy: "column"})
	propertyColumns: ISchemaPropertyColumn[];

	/**
	 * Index of the ID (within the entity)
	 */
	@Column({name: "ID_INDEX"})
	idIndex: number;

	@Column({name: "IS_GENERATED"})
	isGenerated: boolean;

	name: string;

	@OneToMany({mappedBy: "manyColumn"})
	manyRelationColumns: ISchemaRelationColumn[];

	@OneToMany({mappedBy: "oneColumn"})
	oneRelationColumns: ISchemaRelationColumn[];

	@DbNumber()
	type: SQLDataType;

}