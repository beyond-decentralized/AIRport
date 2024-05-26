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
	Application_Scope,
	IApplication,
	Application_PublicSigningKey
} from '@airport/ground-control';
import { DdlDomain } from '../DdlDomain';
import { DdlApplicationCurrentVersion } from './DdlApplicationCurrentVersion';
import { DdlApplicationVersion } from './DdlApplicationVersion';

@Entity()
@Table({
	name: 'APPLICATIONS'
})
export class DdlApplication
	implements IApplication {

	@Id()
	@DbNumber()
	@Column({ name: 'DB_APPLICATION_INDEX', nullable: false })
	index: Application_Index

	@Column({ name: 'SCOPE', nullable: false })
	@DbString()
	scope: Application_Scope;

	@Column({ name: 'APPLICATION_NAME', nullable: false })
	@DbString()
	name: Application_Name;

	@Column({ name: 'APPLICATION_FULL_NAME', nullable: false })
	@DbString()
	fullName: Application_FullName;

	@Column({ name: 'STATUS', nullable: false })
	@DbString()
	status: ApplicationStatus;

	@Column({ name: 'PUBLIC_SIGNING_KEY', nullable: false })
	@DbString()
	publicSigningKey: Application_PublicSigningKey

	@ManyToOne()
	@JoinColumn({ name: 'DB_DOMAIN_LID', nullable: false })
	domain: DdlDomain;

	@OneToMany({ mappedBy: 'application' })
	versions: DdlApplicationVersion[] = [];

	@OneToMany({ mappedBy: 'application' })
	currentVersion: DdlApplicationCurrentVersion[] = [];

}
