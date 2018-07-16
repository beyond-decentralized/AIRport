import {
	Column,
	DbNumber,
	DbSchema,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	SchemaIndex,
	Table
} from "@airport/air-control";
import {Domain}        from "@airport/territory";
import {ISchema}       from "../../generated/schema/qschema";
import {SchemaStatus}  from "./SchemaStatus";
import {SchemaVersion} from "./SchemaVersion";

export type SchemaDomain = 'private' | 'public' | null;
export type SchemaDomainName = string;
export type SchemaName = string;

@Entity()
@Table({
	name: "SCHEMAS"
})
export class Schema
	implements ISchema {

	@Id()
	@GeneratedValue()
	@DbNumber()
	index: SchemaIndex;

	@ManyToOne()
		@JoinColumn({name: "DOMAIN_ID", referencedColumnName: "ID"})
	domain: Domain;

	@Column({name: "DOMAIN_NAME"})
	@DbString()
	domainName: SchemaDomainName;

	@Column({name: "SCHEMA_NAME"})
	@DbString()
	name: SchemaName;

	@DbNumber()
	status: SchemaStatus;

	@OneToMany({mappedBy: 'schema'})
	versions: SchemaVersion[];

	@ManyToOne()
	@JoinColumn({name: "CURRENT_VERSION_ID", referencedColumnName: "ID"})
	currentVersion: SchemaVersion;

}