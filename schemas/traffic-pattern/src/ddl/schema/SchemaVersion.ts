import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	SchemaVersionId,
	SchemaVersionMajor,
	SchemaVersionMinor,
	SchemaVersionPatch,
	SchemaVersionString,
	Table
}                         from "@airport/air-control";
import {ISchema}          from "../../generated/schema/qschema";
import {ISchemaEntity}    from "../../generated/schema/qschemaentity";
import {ISchemaReference} from "../../generated/schema/qschemareference";
import {ISchemaVersion}   from "../../generated/schema/qschemaversion";


@Entity()
@Table({name: "SCHEMA_VERSIONS"})
export class SchemaVersion
	implements ISchemaVersion {

	@Id()
	@GeneratedValue()
	@DbNumber()
	id: SchemaVersionId;

	@Column({name: "VERSION_STRING"})
	versionString: SchemaVersionString;

	@Column({name: "MAJOR_VERSION"})
	@DbNumber()
	majorVersion: SchemaVersionMajor;

	@Column({name: "MINOR_VERSION"})
	@DbNumber()
	minorVersion: SchemaVersionMinor;

	@Column({name: "PATCH_VERSION"})
	@DbNumber()
	patchVersion: SchemaVersionPatch;

	@ManyToOne()
	@JoinColumn({name: "SCHEMA_INDEX", referencedColumnName: "INDEX"})
	schema: ISchema;

	@OneToMany({mappedBy: 'schemaVersion'})
	entities: ISchemaEntity[];

	@OneToMany({mappedBy: 'ownSchemaVersion'})
	references: ISchemaReference[];

	@OneToMany({mappedBy: 'referencedSchemaVersion'})
	referencedBy: ISchemaReference[];

}