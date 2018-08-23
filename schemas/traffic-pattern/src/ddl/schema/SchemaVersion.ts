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
}                         from '@airport/air-control'
import {
	SchemaVersionId,
	SchemaVersionInteger,
	SchemaVersionMajor,
	SchemaVersionMinor,
	SchemaVersionPatch,
	SchemaVersionString
}                         from '@airport/ground-control'
import {ISchema}          from '../../generated/schema/qschema'
import {ISchemaEntity}    from '../../generated/schema/qschemaentity'
import {ISchemaReference} from '../../generated/schema/qschemareference'
import {ISchemaVersion}   from '../../generated/schema/qschemaversion'


@Entity()
@Table({name: 'SCHEMA_VERSIONS'})
export class SchemaVersion
	implements ISchemaVersion {

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
	schema: ISchema

	@OneToMany({mappedBy: 'schemaVersion'})
	entities: ISchemaEntity[]

	@OneToMany({mappedBy: 'ownSchemaVersion'})
	references: ISchemaReference[]

	@OneToMany({mappedBy: 'referencedSchemaVersion'})
	referencedBy: ISchemaReference[]

}