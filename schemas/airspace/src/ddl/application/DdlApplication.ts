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
	DbApplication_Index,
	DbApplication_FullName,
	ApplicationStatus,
	DbApplication_Name,
	DbApplication_Scope,
	DbApplication,
	DbApplication_PublicSigningKey
} from '@airport/ground-control';
import { DdlDomain } from './DdlDomain';
import { DdlApplicationCurrentVersion } from './DdlApplicationCurrentVersion';
import { DdlApplicationVersion } from './DdlApplicationVersion';

@Entity()
@Table({
	name: 'APPLICATIONS'
})
export class DdlApplication
	implements DbApplication {

	@Id()
	@DbNumber()
	@Column({ name: 'DB_APPLICATION_INDEX', nullable: false })
	index: DbApplication_Index

	@Column({ name: 'SCOPE', nullable: false })
	@DbString()
	scope: DbApplication_Scope;

	@Column({ name: 'APPLICATION_NAME', nullable: false })
	@DbString()
	name: DbApplication_Name;

	@Column({ name: 'APPLICATION_FULL_NAME', nullable: false })
	@DbString()
	fullName: DbApplication_FullName;

	@Column({ name: 'STATUS', nullable: false })
	@DbString()
	status: ApplicationStatus;

	@Column({ name: 'PUBLIC_SIGNING_KEY', nullable: false })
	@DbString()
	publicSigningKey: DbApplication_PublicSigningKey

	@ManyToOne()
	@JoinColumn({ name: 'DB_DOMAIN_LID', referencedColumnName: 'DB_DOMAIN_LID', nullable: false })
	domain: DdlDomain;

	@OneToMany({ mappedBy: 'application' })
	versions: DdlApplicationVersion[] = [];

	@OneToMany({ mappedBy: 'application' })
	currentVersion: DdlApplicationCurrentVersion[] = [];

}
