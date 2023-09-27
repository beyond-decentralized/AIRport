import {
	Column,
	DbNumber,
	DbString,
	Entity,
	Id,
	JoinColumn,
	Json,
	ManyToOne,
	OneToMany,
	SequenceGenerator,
	Table,
	Transient
} from '@airport/tarmaq-entity'
import {
	ApplicationVersion_LocalId,
	ApplicationVersion_IntegerVersion,
	ApplicationVersion_MajorVersion,
	ApplicationVersion_MinorVersion,
	ApplicationVersion_PatchVersion,
	ApplicationVersion_VersionString,
	IApplicationReference,
	DbEntity,
	IApplicationVersion,
	AppApiClass_Name,
	AppApiClass,
	DbEntity_Name,
	Application_FullName
} from '@airport/ground-control'
import { DdlApplication } from './DdlApplication'
import { DdlEntity } from './entity/DdlEntity'
import { DdlApplicationReference } from './DdlApplicationReference'
import { JsonApplicationWithLastIds } from '@airport/air-traffic-control'
import { ApplicationApiClass } from './api/ApplicationApiClass'

@Entity()
@Table({ name: 'DB_APPLICATION_VERSIONS' })
export class DdlApplicationVersion
	implements IApplicationVersion {

	@DbNumber()
	@Id()
	@SequenceGenerator({ allocationSize: 100 })
	@Column({ name: 'DB_APPLICATION_VERSION_LID', nullable: false })
	_localId: ApplicationVersion_LocalId

	@Column({ name: 'INTEGER_VERSION', nullable: false })
	@DbNumber()
	integerVersion: ApplicationVersion_IntegerVersion

	@Column({ name: 'VERSION_STRING', nullable: false })
	@DbString()
	versionString: ApplicationVersion_VersionString

	@Column({ name: 'MAJOR_VERSION', nullable: false })
	@DbNumber()
	majorVersion: ApplicationVersion_MajorVersion

	@Column({ name: 'MINOR_VERSION', nullable: false })
	@DbNumber()
	minorVersion: ApplicationVersion_MinorVersion

	@Column({ name: 'PATCH_VERSION', nullable: false })
	@DbNumber()
	patchVersion: ApplicationVersion_PatchVersion

	// FIXME: revisit application tracking when versioning is implemented
	// better to track everything by names
	@Column({ name: 'JSON_APPLICATION', nullable: false })
	@Json()
	jsonApplication: JsonApplicationWithLastIds

	@Column({ name: 'SIGNATURE', nullable: false })
	@DbString()
	signature: string;

	@ManyToOne()
	@JoinColumn({ name: 'DB_APPLICATION_INDEX', nullable: false })
	application: DdlApplication

	@OneToMany({ mappedBy: 'applicationVersion' })
	apiClasses?: ApplicationApiClass[] = []

	@OneToMany({ mappedBy: 'applicationVersion' })
	entities?: DdlEntity[] = []

	@OneToMany({ mappedBy: 'ownApplicationVersion' })
	references?: DdlApplicationReference[] = []

	@OneToMany({ mappedBy: 'referencedApplicationVersion' })
	referencedBy?: DdlApplicationReference[] = []

	@Transient()
	apiClassMapByName?: { [apiClassName: AppApiClass_Name]: AppApiClass } = {}

	@Transient()
	entityMapByName?: { [entityName: DbEntity_Name]: DbEntity } = {}

	@Transient()
	referencesMapByName?: { [fullApplication_Name: Application_FullName]: IApplicationReference } = {}

	@Transient()
	referencedByMapByName?: { [fullApplication_Name: Application_FullName]: IApplicationReference } = {}

}
