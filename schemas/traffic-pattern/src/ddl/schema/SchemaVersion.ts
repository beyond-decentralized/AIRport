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
	Table
}                        from '@airport/air-control'
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

	@Id()
	@GeneratedValue()
	@SequenceGenerator({allocationSize: 100})
	@DbNumber()
	id: SchemaVersionId

	@Column({name: 'INTEGER_VERSION'})
	integerVersion: SchemaVersionInteger

	@Column({name: 'VERSION_STRING'})
	versionString: SchemaVersionString

	@Column({name: 'MAJOR_VERSION'})
	@DbNumber()
	majorVersion: SchemaVersionMajor

	@Column({name: 'MINOR_VERSION'})
	@DbNumber()
	minorVersion: SchemaVersionMinor

	@Column({name: 'PATCH_VERSION'})
	@DbNumber()
	patchVersion: SchemaVersionPatch

	@ManyToOne()
	@JoinColumn({name: 'SCHEMA_INDEX', referencedColumnName: 'INDEX'})
	schema: Schema

	@OneToMany({mappedBy: 'schemaVersion'})
	entities: SchemaEntity[]

	@OneToMany({mappedBy: 'ownSchemaVersion'})
	references: SchemaReference[]

	@OneToMany({mappedBy: 'referencedSchemaVersion'})
	referencedBy: SchemaReference[]

}