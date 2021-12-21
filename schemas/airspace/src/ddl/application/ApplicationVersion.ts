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
} from '@airport/air-control'
import {
	ApplicationVersionId,
	ApplicationVersionInteger,
	ApplicationVersionMajor,
	ApplicationVersionMinor,
	ApplicationVersionPatch,
	ApplicationVersionString
} from '@airport/ground-control'
import { Application } from './Application'
import { ApplicationEntity } from './ApplicationEntity'
import { ApplicationReference } from './ApplicationReference'
import { IApplicationEntity } from '../../generated/application/applicationentity';
import { IApplicationReference } from '../../generated/application/applicationreference';
import { JsonApplicationWithLastIds } from '@airport/security-check'


@Entity()
@Table({ name: 'APPLICATION_VERSIONS' })
export class ApplicationVersion {

	@DbNumber()
	@Id()
	@SequenceGenerator({ allocationSize: 100 })
	id: ApplicationVersionId

	@Column({ name: 'INTEGER_VERSION', nullable: false })
	@DbNumber()
	integerVersion: ApplicationVersionInteger

	@Column({ name: 'VERSION_STRING', nullable: false })
	@DbString()
	versionString: ApplicationVersionString

	@Column({ name: 'MAJOR_VERSION', nullable: false })
	@DbNumber()
	majorVersion: ApplicationVersionMajor

	@Column({ name: 'MINOR_VERSION', nullable: false })
	@DbNumber()
	minorVersion: ApplicationVersionMinor

	@Column({ name: 'PATCH_VERSION', nullable: false })
	@DbNumber()
	patchVersion: ApplicationVersionPatch

	// FIXME: keep track of applications by signature also
	// FIXME: revisit application tracking when versioning is implemented
	// better to track everything by names
	@Column({ name: 'JSON_APPLICATION', nullable: false })
	@Json()
	jsonApplication: JsonApplicationWithLastIds

	@ManyToOne()
	@JoinColumn({ name: 'APPLICATION_INDEX', nullable: false })
	application: Application

	@OneToMany({ mappedBy: 'applicationVersion' })
	entities: ApplicationEntity[] = []

	@OneToMany({ mappedBy: 'ownApplicationVersion' })
	references: ApplicationReference[] = []

	@OneToMany({ mappedBy: 'referencedApplicationVersion' })
	referencedBy: ApplicationReference[] = []

	@Transient()
	entityMapByName?: { [entityName: string]: IApplicationEntity } = {}

	@Transient()
	referencesMapByName?: { [fullApplicationName: string]: IApplicationReference } = {}

	@Transient()
	referencedByMapByName?: { [fullApplicationName: string]: IApplicationReference } = {}

}
