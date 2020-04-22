import {
	Column,
	DbNumber,
	DbString,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	SequenceGenerator,
	Table,
	Transient
} from '@airport/air-control'
import {
	SchemaVersionId,
	SchemaVersionInteger,
	SchemaVersionMajor,
	SchemaVersionMinor,
	SchemaVersionPatch,
	SchemaVersionString
}                        from '@airport/ground-control'
import {Schema}          from './Schema'
import {SchemaEntity}    from './SchemaEntity'
import {SchemaReference} from './SchemaReference'


@Entity()
@Table({name: 'SCHEMA_VERSIONS'})
export class SchemaVersion {

	@DbNumber()
	@Id()
	@SequenceGenerator({allocationSize: 100})
	id: SchemaVersionId

	@Column({name: 'INTEGER_VERSION', nullable: false})
	@DbNumber()
	integerVersion: SchemaVersionInteger

	@Column({name: 'VERSION_STRING', nullable: false})
	@DbString()
	versionString: SchemaVersionString

	@Column({name: 'MAJOR_VERSION', nullable: false})
	@DbNumber()
	majorVersion: SchemaVersionMajor

	@Column({name: 'MINOR_VERSION', nullable: false})
	@DbNumber()
	minorVersion: SchemaVersionMinor

	@Column({name: 'PATCH_VERSION', nullable: false})
	@DbNumber()
	patchVersion: SchemaVersionPatch

	@ManyToOne()
	@JoinColumn({name: 'SCHEMA_INDEX', nullable: false})
	schema: Schema

	@OneToMany({mappedBy: 'schemaVersion'})
	entities: SchemaEntity[] = []

	@OneToMany({mappedBy: 'ownSchemaVersion'})
	references: SchemaReference[] = []

	@OneToMany({mappedBy: 'referencedSchemaVersion'})
	referencedBy: SchemaReference[] = []

	@Transient()
	entityMapByName?: { [entityName: string]: SchemaEntity } = {}

	@Transient()
	referencesMapByName?: { [schemaName: string]: SchemaReference } = {}

	@Transient()
	referencedByMapByName?: { [schemaName: string]: SchemaReference } = {}

}
