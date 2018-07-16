import { Entity, Id, JoinColumns, ManyToOne, Table } from "@airport/air-control";
import { ISchemaRelationColumn } from "../../generated/schema/qschemarelationcolumn";
import { ISchemaColumn } from "../../generated/schema/qschemacolumn";
import { ISchemaRelation } from "../../generated/schema/qschemarelation";

@Entity()
@Table({
	name: "SCHEMA_RELATION_COLUMNS"
})
export class SchemaRelationColumn
	implements ISchemaRelationColumn {

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "MANY_SCHEMA_VERSION_ID", referencedColumnName: "SCHEMA_VERSION_ID"},
		{name: "MANY_TABLE_INDEX", referencedColumnName: "TABLE_INDEX"},
		{name: "MANY_COLUMN_INDEX", referencedColumnName: "INDEX"}
	])
	manyColumn: ISchemaColumn;

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "ONE_SCHEMA_VERSION_ID", referencedColumnName: "SCHEMA_VERSION_ID"},
		{name: "ONE_TABLE_INDEX", referencedColumnName: "TABLE_INDEX"},
		{name: "ONE_COLUMN_INDEX", referencedColumnName: "INDEX"}
	])
	oneColumn: ISchemaColumn;

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "MANY_SCHEMA_VERSION_ID", referencedColumnName: "SCHEMA_VERSION_ID"},
		{name: "MANY_TABLE_INDEX", referencedColumnName: "TABLE_INDEX"},
		{name: "MANY_RELATION_INDEX", referencedColumnName: "INDEX"}
	])
	manyRelation: ISchemaRelation;

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: "ONE_SCHEMA_VERSION_ID", referencedColumnName: "SCHEMA_VERSION_ID"},
		{name: "ONE_TABLE_INDEX", referencedColumnName: "TABLE_INDEX"},
		{name: "ONE_RELATION_INDEX", referencedColumnName: "INDEX"}
	])
	oneRelation: ISchemaRelation;
}