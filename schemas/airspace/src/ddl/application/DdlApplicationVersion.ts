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
	DbApplicationVersion_LocalId,
	DbApplicationVersion_IntegerVersion,
	DbApplicationVersion_MajorVersion,
	DbApplicationVersion_MinorVersion,
	DbApplicationVersion_PatchVersion,
	DbApplicationVersion_VersionString,
	DbApplicationReference,
	DbEntity,
	DbApplicationVersion,
	AppApiClass_Name,
	AppApiClass,
	DbEntity_Name,
	DbApplication_FullName
} from '@airport/ground-control'
import { DdlApplication } from './DdlApplication'
import { DdlEntity } from './entity/DdlEntity'
import { DdlApplicationReference } from './DdlApplicationReference'
import { JsonApplicationWithLastIds } from '@airport/air-traffic-control'
import { ApplicationApiClass } from './api/ApplicationApiClass'

@Entity()
@Table({ name: 'DB_APPLICATION_VERSIONS' })
export class DdlApplicationVersion
	implements DbApplicationVersion {

	@DbNumber()
	@Id()
	@SequenceGenerator({ allocationSize: 100 })
	@Column({ name: 'DB_APPLICATION_VERSION_LID', nullable: false })
	_localId: DbApplicationVersion_LocalId

	@Column({ name: 'INTEGER_VERSION', nullable: false })
	@DbNumber()
	integerVersion: DbApplicationVersion_IntegerVersion

	@Column({ name: 'VERSION_STRING', nullable: false })
	@DbString()
	versionString: DbApplicationVersion_VersionString

	@Column({ name: 'MAJOR_VERSION', nullable: false })
	@DbNumber()
	majorVersion: DbApplicationVersion_MajorVersion

	@Column({ name: 'MINOR_VERSION', nullable: false })
	@DbNumber()
	minorVersion: DbApplicationVersion_MinorVersion

	@Column({ name: 'PATCH_VERSION', nullable: false })
	@DbNumber()
	patchVersion: DbApplicationVersion_PatchVersion

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
	referencesMapByName?: { [fullDbApplication_Name: DbApplication_FullName]: DbApplicationReference } = {}

	@Transient()
	referencedByMapByName?: { [fullDbApplication_Name: DbApplication_FullName]: DbApplicationReference } = {}

}
