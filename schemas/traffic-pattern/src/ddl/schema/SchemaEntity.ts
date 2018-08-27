import {
	Column,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	Json,
	ManyToOne,
	OneToMany,
	Table,
	TableConfiguration,
	Transient
}                              from '@airport/air-control'
import {DbNumber}              from '@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators'
import {
	CascadeType,
	EntityName,
	TableIndex
}                              from '@airport/ground-control'
import {SchemaColumn}          from './SchemaColumn'
import {SchemaProperty}        from './SchemaProperty'
import {SchemaRelation}        from './SchemaRelation'
import {SchemaVersion}         from './SchemaVersion'
import {VersionedSchemaObject} from './VersionedSchemaObject'

export type SchemaEntityId = number

@Entity()
@Table({
	name: 'SCHEMA_ENTITIES'
})
export class SchemaEntity
	extends VersionedSchemaObject {

	//
	// Id columns
	//
	@Id()
	@GeneratedValue()
	id: SchemaEntityId

	//
	// Non-Id columns
	//
	@DbNumber()
	index: TableIndex

	@Column({name: 'IS_LOCAL'})
	isLocal: boolean

	@Column({name: 'IS_REPOSITORY_ENTITY'})
	isRepositoryEntity: boolean

	name: EntityName

	@Json()
	tableConfig: TableConfiguration

	//
	// Non-Id relations
	//

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'SCHEMA_VERSION_ID', referencedColumnName: 'ID'})
	schemaVersion: SchemaVersion

	//
	// One-to-Many's
	//

	@OneToMany({mappedBy: 'entity'})
	columns: SchemaColumn[]

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
	properties: SchemaProperty[]

	@OneToMany()
	@JoinColumn({name: 'SCHEMA_RELATION_ID', referencedColumnName: 'ID'})
	relations: SchemaRelation[]

	@Transient()
	columnMap?: { [name: string]: SchemaColumn }

	@Transient()
	idColumns: SchemaColumn[]

	@Transient()
	idColumnMap?: { [name: string]: SchemaColumn }

	@Transient()
	propertyMap: { [name: string]: SchemaProperty }

}