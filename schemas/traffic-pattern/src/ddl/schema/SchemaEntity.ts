import {
	Column,
	DbBoolean,
	DbNumber,
	DbString,
	Entity,
	Id,
	JoinColumn,
	Json,
	ManyToOne,
	OneToMany,
	Table,
	TableConfiguration,
	Transient
} from '@airport/air-control'
import {
	EntityId,
	EntityIsLocal,
	EntityIsRepositoryEntity,
	EntityName,
	TableIndex
}                              from '@airport/ground-control'
import {SchemaColumn}          from './SchemaColumn'
import {SchemaOperation}       from './SchemaOperation'
import {SchemaProperty}        from './SchemaProperty'
import {SchemaRelation}        from './SchemaRelation'
import {SchemaVersion}         from './SchemaVersion'
import {VersionedSchemaObject} from './VersionedSchemaObject'
import { ISchemaColumn } from '../../generated/schema/schemacolumn';
import { ISchemaProperty } from '../../generated/schema/schemaproperty';

@Entity()
@Table({
	name: 'SCHEMA_ENTITIES',
	// indexes: (se: SchemaEntity) => [{
	// 	property: se.schemaVersion
	// }]
})
export class SchemaEntity
	extends VersionedSchemaObject {

	//
	// Id columns
	//
	@DbNumber()
	@Id()
	id: EntityId

	//
	// Non-Id columns
	//
	@Column({name: 'TABLE_INDEX', nullable: false})
	@DbNumber()
	index: TableIndex

	@Column({name: 'IS_LOCAL', nullable: false})
	@DbBoolean()
	isLocal: EntityIsLocal

	@Column({name: 'IS_REPOSITORY_ENTITY', nullable: false})
	@DbBoolean()
	isRepositoryEntity: EntityIsRepositoryEntity

	@Column({name: 'NAME', nullable: false})
	@DbString()
	name: EntityName

	@Column({name: 'TABLE_CONFIGURATION', nullable: false})
	@Json()
	tableConfig: TableConfiguration

	//
	// Non-Id relations
	//

	@ManyToOne()
	@JoinColumn({name: 'SCHEMA_VERSION_ID', referencedColumnName: 'ID', nullable: false})
	schemaVersion: SchemaVersion

	//
	// One-to-Many's
	//

	@OneToMany({mappedBy: 'entity'})
	columns: SchemaColumn[] = []

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

	@OneToMany({mappedBy: 'entity'})
	operations?: SchemaOperation[] = []

	@OneToMany({mappedBy: 'entity'})
	properties: SchemaProperty[] = []

	@OneToMany({mappedBy: 'entity'})
	relations: SchemaRelation[] = []

	@OneToMany({mappedBy: 'relationEntity'})
	relationReferences: SchemaRelation[] = []

	@Transient()
	columnMap?: { [name: string]: ISchemaColumn } = {}

	@Transient()
	idColumns: ISchemaColumn[] = []

	@Transient()
	idColumnMap?: { [name: string]: ISchemaColumn } = {}

	@Transient()
	propertyMap: { [name: string]: ISchemaProperty } = {}

}
