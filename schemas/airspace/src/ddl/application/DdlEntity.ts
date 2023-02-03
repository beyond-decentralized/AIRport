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
	DbEntity_TableConfiguration,
	Transient
} from '@airport/tarmaq-entity'
import {
	DbEntity_LocalId,
	DbEntity_IsLocal,
	DbEntity_IsAirEntity,
	DbEntity_Name,
	DbEntity_TableIndex,
	DbProperty,
	DbColumn,
	DbEntity
} from '@airport/ground-control'
import { DdlColumn } from './DdlColumn'
import { DdlProperty } from './DdlProperty'
import { DdlRelation } from './DdlRelation'
import { DdlApplicationVersion } from './DdlApplicationVersion'
import { DdlVersionedObject } from './DdlVersionedObject'

@Entity()
@Table({
	name: 'DB_ENTITIES',
	// indexes: (se: ApplicationEntity) => [{
	// 	property: se.applicationVersion
	// }]
})
export class DdlEntity
	extends DdlVersionedObject
	implements DbEntity {

	//
	// Id columns
	//
	@DbNumber()
	@Id()
	@Column({ name: 'DB_ENTITY_LID', nullable: false })
	_localId: DbEntity_LocalId

	//
	// Non-Id columns
	//
	@Column({ name: 'TABLE_INDEX', nullable: false })
	@DbNumber()
	index: DbEntity_TableIndex

	@Column({ name: 'IS_LOCAL', nullable: false })
	@DbBoolean()
	isLocal: DbEntity_IsLocal

	@Column({ name: 'IS_AIR_ENTITY', nullable: false })
	@DbBoolean()
	isAirEntity: DbEntity_IsAirEntity

	@Column({ name: 'NAME', nullable: false })
	@DbString()
	name: DbEntity_Name

	@Column({ name: 'TABLE_CONFIGURATION', nullable: false })
	@Json()
	tableConfig?: DbEntity_TableConfiguration

	//
	// Non-Id relations
	//

	@ManyToOne()
	@JoinColumn({
		name: 'DB_APPLICATION_VERSION_LID',
		referencedColumnName: 'DB_APPLICATION_VERSION_LID', nullable: false
	})
	applicationVersion: DdlApplicationVersion

	//
	// One-to-Many's
	//

	@OneToMany({ mappedBy: 'entity' })
	columns: DdlColumn[] = []

	// TODO: implement if needed
	// @OneToMany()
	// @JoinColumns([
	// 	{name: "APPLICATION_VERSION_LID"},
	// 	{name: "TABLE_INDEX", referencedColumnName: "INDEX"}
	// ])
	// @WhereJoinTable((
	// 	otm: QAppEntity,
	// 	mto: QAppColumn
	// ) => mto.idIndex.IS_NOT_NULL())
	// idColumns: ApplicationColumn[];

	@OneToMany({ mappedBy: 'entity' })
	properties: DdlProperty[] = []

	@OneToMany({ mappedBy: 'entity' })
	relations?: DdlRelation[] = []

	@OneToMany({ mappedBy: 'relationEntity' })
	relationReferences?: DdlRelation[] = []

	@Transient()
	columnMap?: { [name: string]: DbColumn } = {}

	@Transient()
	idColumns?: DbColumn[] = []

	@Transient()
	idColumnMap?: { [name: string]: DbColumn } = {}

	@Transient()
	propertyMap?: { [name: string]: DbProperty } = {}

}
