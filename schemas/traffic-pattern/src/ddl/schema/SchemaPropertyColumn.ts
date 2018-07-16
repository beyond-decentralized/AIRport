import { Entity, Id, JoinColumns, ManyToOne, Table } from "@airport/air-control";
import { SchemaColumn } from "./SchemaColumn";
import { SchemaProperty } from "./SchemaProperty";
import { ISchemaColumn } from "../../generated/schema/qschemacolumn";
import { ISchemaProperty } from "../../generated/schema/qschemaproperty";

/**
 * Many-to-Many between Columns and properties
 */
@Entity()
@Table({
	name: "SCHEMA_COLUMN_PROPERTIES"
})
export class SchemaPropertyColumn {

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "SCHEMA_VERSION_ID"},
		{name: "TABLE_INDEX"},
		{name: "COLUMN_INDEX", referencedColumnName: "INDEX"}
	])
	column: ISchemaColumn;

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "SCHEMA_VERSION_ID"},
		{name: "TABLE_INDEX"},
		{name: "PROPERTY_INDEX", referencedColumnName: "INDEX"}
	])
	property: ISchemaProperty;

}