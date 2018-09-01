import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	SequenceGenerator,
	Table,
	Transient
}                        from '@airport/air-control'
import {
	SchemaVersionId,
	SchemaVersionInteger,
	SchemaVersionMajor,
	SchemaVersionMinor,
	SchemaVersionPatch,
	SchemaVersionString
}                        from '@airport/ground-control'
import {
	ISchemaEntity,
	ISchemaReference
}                        from '../..'
import {Schema}          from './Schema'
import {SchemaEntity}    from './SchemaEntity'
import {SchemaReference} from './SchemaReference'


@Entity()
@Table({name: 'SCHEMA_VERSIONS'})
export class SchemaVersion {

	@Id()
	@GeneratedValue()
	@SequenceGenerator({allocationSize: 100})
	@DbNumber()
	id: SchemaVersionId

	@Column({name: 'INTEGER_VERSION', nullable: false})
	integerVersion: SchemaVersionInteger

	@Column({name: 'VERSION_STRING', nullable: false})
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
	@JoinColumn({name: 'SCHEMA_INDEX', referencedColumnName: 'INDEX', nullable: false})
	schema: Schema

	@OneToMany({mappedBy: 'schemaVersion'})
	entities: SchemaEntity[]

	@OneToMany({mappedBy: 'ownSchemaVersion'})
	references: SchemaReference[]

	@OneToMany({mappedBy: 'referencedSchemaVersion'})
	referencedBy: SchemaReference[]

	@Transient()
	entityMapByName?: { [entityName: string]: ISchemaEntity };

	@Transient()
	referencesMapByName?: { [schemaName: string]: ISchemaReference };

	@Transient()
	referencedByMapByName?: { [schemaName: string]: ISchemaReference };

}