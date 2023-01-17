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
	ApplicationVersion_VersionString
} from '@airport/ground-control'
import { Application } from './Application'
import { ApplicationEntity } from './ApplicationEntity'
import { ApplicationReference } from './ApplicationReference'
import { IApplicationEntity } from '../../generated/entity/application/IApplicationEntity';
import { IApplicationReference } from '../../generated/entity/application/IApplicationReference';
import { JsonApplicationWithLastIds } from '@airport/apron'


@Entity()
@Table({ name: 'APPLICATION_VERSIONS' })
export class ApplicationVersion {

	@DbNumber()
	@Id()
	@SequenceGenerator({ allocationSize: 100 })
	@Column({ name: 'APPLICATION_VERSION_LID', nullable: false })
	_localId: ApplicationVersion_LocalId

	@Column({ name: 'INTEGER_VERSION', nullable: false })
	@DbNumber()
	integerVersion?: ApplicationVersion_IntegerVersion

	@Column({ name: 'VERSION_STRING', nullable: false })
	@DbString()
	versionString?: ApplicationVersion_VersionString

	@Column({ name: 'MAJOR_VERSION', nullable: false })
	@DbNumber()
	majorVersion?: ApplicationVersion_MajorVersion

	@Column({ name: 'MINOR_VERSION', nullable: false })
	@DbNumber()
	minorVersion?: ApplicationVersion_MinorVersion

	@Column({ name: 'PATCH_VERSION', nullable: false })
	@DbNumber()
	patchVersion?: ApplicationVersion_PatchVersion

	// FIXME: keep track of applications by signature also
	// FIXME: revisit application tracking when versioning is implemented
	// better to track everything by names
	@Column({ name: 'JSON_APPLICATION', nullable: false })
	@Json()
	jsonApplication?: JsonApplicationWithLastIds

	@ManyToOne()
	@JoinColumn({ name: 'APPLICATION_INDEX', nullable: false })
	application?: Application

	@OneToMany({ mappedBy: 'applicationVersion' })
	entities?: ApplicationEntity[] = []

	@OneToMany({ mappedBy: 'ownApplicationVersion' })
	references?: ApplicationReference[] = []

	@OneToMany({ mappedBy: 'referencedApplicationVersion' })
	referencedBy?: ApplicationReference[] = []

	@Transient()
	entityMapByName?: { [entityName: string]: IApplicationEntity } = {}

	@Transient()
	referencesMapByName?: { [fullApplication_Name: string]: IApplicationReference } = {}

	@Transient()
	referencedByMapByName?: { [fullApplication_Name: string]: IApplicationReference } = {}

}
