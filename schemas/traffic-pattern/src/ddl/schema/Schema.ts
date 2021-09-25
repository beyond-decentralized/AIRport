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
	SchemaIndex,
	SchemaName,
	SchemaScope,
	SchemaStatus
} from '@airport/ground-control';
import type { JsonSchemaWithLastIds } from '@airport/security-check';
import { Domain } from '@airport/territory';
import { SchemaCurrentVersion } from './SchemaCurrentVersion';
import { SchemaVersion } from './SchemaVersion';

@Entity()
@Table({
	name: 'SCHEMAS'
})
export class Schema {

	@Id()
	@DbNumber()
	@Column({ name: 'SCHEMA_INDEX', nullable: false })
	index: SchemaIndex;

	@ManyToOne()
	@JoinColumn({ name: 'DOMAIN_ID', referencedColumnName: 'ID', nullable: false })
	domain: Domain;

	@Column({ name: 'SCOPE', nullable: false })
	@DbString()
	scope: SchemaScope;

	@Column({ name: 'SCHEMA_NAME', nullable: false })
	@DbString()
	name: SchemaName;

	// @ManyToOne()
	// @JoinColumn({ name: 'PACKAGE_ID', referencedColumnName: 'ID', nullable: false })
	// package: Package;

	@Column({ name: 'PACKAGE_NAME', nullable: false })
	@DbString()
	packageName: PackageName;

	@Column({ name: 'STATUS', nullable: false })
	@DbNumber()
	status: SchemaStatus;

	@OneToMany({ mappedBy: 'schema' })
	versions: SchemaVersion[] = [];

	@OneToMany({ mappedBy: 'schema' })
	currentVersion: SchemaCurrentVersion[] = [];

	// FIXME: keep track of schemas by signature also
	// FIXME: revisit schema tracking when versioning is implemented
	// better to track everything by names
	// FIXME: once versioned should be in schema version (if still needed)
	@Column({ name: 'JSON_SCHEMA', nullable: false })
	@Json()
	jsonSchema: JsonSchemaWithLastIds

}
