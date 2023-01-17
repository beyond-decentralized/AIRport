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
	ApplicationEntity_TableConfiguration,
	Transient
} from '@airport/tarmaq-entity'
import {
	ApplicationEntity_LocalId,
	ApplicationEntity_IsLocal,
	ApplicationEntity_IsAirEntity,
	ApplicationEntity_Name,
	ApplicationEntity_TableIndex
} from '@airport/ground-control'
import { ApplicationColumn } from './ApplicationColumn'
import { ApplicationOperation } from './ApplicationOperation'
import { ApplicationProperty } from './ApplicationProperty'
import { ApplicationRelation } from './ApplicationRelation'
import { ApplicationVersion } from './ApplicationVersion'
import { VersionedApplicationObject } from './VersionedApplicationObject'
import { IApplicationColumn } from '../../generated/entity/application/IApplicationColumn';
import { IApplicationProperty } from '../../generated/entity/application/IApplicationProperty';

@Entity()
@Table({
	name: 'APPLICATION_ENTITIES',
	// indexes: (se: ApplicationEntity) => [{
	// 	property: se.applicationVersion
	// }]
})
export class ApplicationEntity
	extends VersionedApplicationObject {

	//
	// Id columns
	//
	@DbNumber()
	@Id()
	@Column({ name: 'APPLICATION_ENTITY_LID', nullable: false })
	_localId: ApplicationEntity_LocalId

	//
	// Non-Id columns
	//
	@Column({ name: 'TABLE_INDEX', nullable: false })
	@DbNumber()
	index?: ApplicationEntity_TableIndex

	@Column({ name: 'IS_LOCAL', nullable: false })
	@DbBoolean()
	isLocal?: ApplicationEntity_IsLocal

	@Column({ name: 'IS_AIR_ENTITY', nullable: false })
	@DbBoolean()
	isAirEntity?: ApplicationEntity_IsAirEntity

	@Column({ name: 'NAME', nullable: false })
	@DbString()
	name?: ApplicationEntity_Name

	@Column({ name: 'TABLE_CONFIGURATION', nullable: false })
	@Json()
	tableConfig?: ApplicationEntity_TableConfiguration

	//
	// Non-Id relations
	//

	@ManyToOne()
	@JoinColumn({
		name: 'APPLICATION_VERSION_LID',
		referencedColumnName: 'APPLICATION_VERSION_LID', nullable: false
	})
	applicationVersion?: ApplicationVersion

	//
	// One-to-Many's
	//

	@OneToMany({ mappedBy: 'entity' })
	columns?: ApplicationColumn[] = []

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
	// idColumns: IApplicationColumn[];

	@OneToMany({ mappedBy: 'entity' })
	operations?: ApplicationOperation[] = []

	@OneToMany({ mappedBy: 'entity' })
	properties?: ApplicationProperty[] = []

	@OneToMany({ mappedBy: 'entity' })
	relations?: ApplicationRelation[] = []

	@OneToMany({ mappedBy: 'relationEntity' })
	relationReferences?: ApplicationRelation[] = []

	@Transient()
	columnMap?: { [name: string]: IApplicationColumn } = {}

	@Transient()
	idColumns?: IApplicationColumn[] = []

	@Transient()
	idColumnMap?: { [name: string]: IApplicationColumn } = {}

	@Transient()
	propertyMap?: { [name: string]: IApplicationProperty } = {}

}
