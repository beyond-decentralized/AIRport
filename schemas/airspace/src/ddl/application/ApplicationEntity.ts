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
import {ApplicationColumn}          from './ApplicationColumn'
import {ApplicationOperation}       from './ApplicationOperation'
import {ApplicationProperty}        from './ApplicationProperty'
import {ApplicationRelation}        from './ApplicationRelation'
import {ApplicationVersion}         from './ApplicationVersion'
import {VersionedApplicationObject} from './VersionedApplicationObject'
import { IApplicationColumn } from '../../generated/application/applicationcolumn';
import { IApplicationProperty } from '../../generated/application/applicationproperty';

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
	@JoinColumn({name: 'APPLICATION_VERSION_ID', referencedColumnName: 'ID', nullable: false})
	applicationVersion: ApplicationVersion

	//
	// One-to-Many's
	//

	@OneToMany({mappedBy: 'entity'})
	columns: ApplicationColumn[] = []

	// TODO: implement if needed
	// @OneToMany()
	// @JoinColumns([
	// 	{name: "APPLICATION_VERSION_ID"},
	// 	{name: "TABLE_INDEX", referencedColumnName: "INDEX"}
	// ])
	// @WhereJoinTable((
	// 	otm: QApplicationEntity,
	// 	mto: QApplicationColumn
	// ) => mto.idIndex.isNotNull())
	// idColumns: IApplicationColumn[];

	@OneToMany({mappedBy: 'entity'})
	operations?: ApplicationOperation[] = []

	@OneToMany({mappedBy: 'entity'})
	properties: ApplicationProperty[] = []

	@OneToMany({mappedBy: 'entity'})
	relations: ApplicationRelation[] = []

	@OneToMany({mappedBy: 'relationEntity'})
	relationReferences: ApplicationRelation[] = []

	@Transient()
	columnMap?: { [name: string]: IApplicationColumn } = {}

	@Transient()
	idColumns: IApplicationColumn[] = []

	@Transient()
	idColumnMap?: { [name: string]: IApplicationColumn } = {}

	@Transient()
	propertyMap: { [name: string]: IApplicationProperty } = {}

}
