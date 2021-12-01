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
	ApplicationName,
	ApplicationScope,
	ApplicationStatus
} from '@airport/ground-control';
import type { JsonApplicationWithLastIds } from '@airport/security-check';
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

	// FIXME: keep track of applications by signature also
	// FIXME: revisit application tracking when versioning is implemented
	// better to track everything by names
	// FIXME: once versioned should be in application version (if still needed)
	@Column({ name: 'JSON_APPLICATION', nullable: false })
	@Json()
	jsonApplication: JsonApplicationWithLastIds

}
