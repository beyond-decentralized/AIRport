import {
	Column,
	DbNumber,
	DbString,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
} from '@airport/tarmaq-entity';
import {
	Application_Index,
	Application_FullName,
	ApplicationStatus,
	Application_Name,
	Application_GUID,
	Application_Scope
} from '@airport/ground-control';
import { Domain } from './Domain';
import { ApplicationCurrentVersion } from './ApplicationCurrentVersion';
import { ApplicationVersion } from './ApplicationVersion';

@Entity()
@Table({
	name: 'APPLICATIONS'
})
export class Application {

	@Id()
	@DbNumber()
	@Column({ name: 'APPLICATION_INDEX', nullable: false })
	index: Application_Index

	@Column({ name: 'GUID', nullable: false })
	@DbString()
	GUID?: Application_GUID

	@Column({ name: 'SCOPE', nullable: false })
	@DbString()
	scope?: Application_Scope;

	@Column({ name: 'APPLICATION_NAME', nullable: false })
	@DbString()
	name?: Application_Name;

	@Column({ name: 'FULL_APPLICATION_NAME', nullable: false })
	@DbString()
	fullName?: Application_FullName;

	@Column({ name: 'STATUS', nullable: false })
	@DbString()
	status?: ApplicationStatus;

	@Column({ name: 'SIGNATURE', nullable: false })
	@DbString()
	signature?: string;

	@ManyToOne()
	@JoinColumn({ name: 'DOMAIN_LID', referencedColumnName: 'DOMAIN_LID', nullable: false })
	domain?: Domain;

	@OneToMany({ mappedBy: 'application' })
	versions?: ApplicationVersion[] = [];

	@OneToMany({ mappedBy: 'application' })
	currentVersion?: ApplicationCurrentVersion[] = [];

}
