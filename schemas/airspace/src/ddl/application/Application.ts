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
	Table
} from '@airport/air-control';
import {
	PackageName,
	ApplicationIndex,
	FullApplicationName,
	ApplicationScope,
	ApplicationStatus,
	ApplicationName
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
	index: ApplicationIndex;

	@ManyToOne()
	@JoinColumn({ name: 'DOMAIN_ID', referencedColumnName: 'ID', nullable: false })
	domain: Domain;

	@Column({ name: 'SCOPE', nullable: false })
	@DbString()
	scope: ApplicationScope;

	@Column({ name: 'APPLICATION_NAME', nullable: false })
	@DbString()
	name: ApplicationName;

	@Column({ name: 'FULL_APPLICATION_NAME', nullable: false })
	@DbString()
	fullName: FullApplicationName;

	// @ManyToOne()
	// @JoinColumn({ name: 'PACKAGE_ID', referencedColumnName: 'ID', nullable: false })
	// package: Package;

	@Column({ name: 'PACKAGE_NAME', nullable: false })
	@DbString()
	packageName: PackageName;

	@Column({ name: 'STATUS', nullable: false })
	@DbString()
	status: ApplicationStatus;

	@Column({ name: 'SIGNATURE', nullable: false })
	@DbString()
	signature: string;

	@OneToMany({ mappedBy: 'application' })
	versions: ApplicationVersion[] = [];

	@OneToMany({ mappedBy: 'application' })
	currentVersion: ApplicationCurrentVersion[] = [];

}
