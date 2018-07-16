import {
	Column,
	Entity,
	Id,
	JoinColumn,
	JoinColumns,
	Json,
	ManyToOne,
	OneToMany,
	Table,
	TableConfiguration
}                        from '@airport/air-control';
import {DbNumber}        from "@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators";
import {CascadeType}     from '@airport/ground-control';
import {ISchemaColumn}   from "../../generated/schema/qschemacolumn";
import {ISchemaEntity}   from "../../generated/schema/qschemaentity";
import {ISchemaProperty} from "../../generated/schema/qschemaproperty";
import {ISchemaRelation} from "../../generated/schema/qschemarelation";
import {SchemaVersion}   from "./SchemaVersion";


export type SchemaEntityIndex = number;

@Entity()
@Table({
	name: "SCHEMA_ENTITIES"
})
export class SchemaEntity
	implements ISchemaEntity {

	//
	// Id columns
	//
	@Id()
	@DbNumber()
	index: SchemaEntityIndex;

	//
	// Id Relations
	//
	@Id()
	@ManyToOne()
	@JoinColumn({name: "SCHEMA_VERSION_ID", referencedColumnName: "ID"})
	schemaVersion: SchemaVersion;

	//
	// Non-Id columns
	//
	@Column({name: "IS_LOCAL"})
	isLocal: boolean;

	@Column({name: "IS_REPOSITORY_ENTITY"})
	isRepositoryEntity: boolean;

	name: string;

	@Json()
	tableConfig: TableConfiguration;

	//
	// Non-Id relations
	//

	//
	// One-to-Many's
	//

	@OneToMany()
	@JoinColumns([
		{name: "SCHEMA_VERSION_ID"},
		{name: "TABLE_INDEX", referencedColumnName: "INDEX"}
	])
	columns: ISchemaColumn[];

	// TODO: implement if needed
	// @OneToMany()
	// @JoinColumns([
	// 	{name: "SCHEMA_VERSION_ID"},
	// 	{name: "TABLE_INDEX", referencedColumnName: "INDEX"}
	// ])
	// @WhereJoinTable((
	// 	otm: QSchemaEntity,
	// 	mto: QSchemaColumn
	// ) => mto.idIndex.isNotNull())
	// idColumns: ISchemaColumn[];

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'entity'})
	properties: ISchemaProperty[];

	@OneToMany()
	@JoinColumns([
		{name: "SCHEMA_VERSION_ID"},
		{name: "TABLE_INDEX", referencedColumnName: "INDEX"}
	])
	relations: ISchemaRelation[];

}