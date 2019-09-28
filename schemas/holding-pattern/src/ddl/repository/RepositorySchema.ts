import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                   from "@airport/air-control";
import {
	SchemaIndex,
}                   from "@airport/ground-control";
import {Repository} from './Repository'

export type RepositorySchemaId = number;

@Entity()
@Table({
	name: "REPOSITORY_SCHEMAS"
})
export class RepositorySchema {

	@Id()
	@Column({name: "REPOSITORY_SCHEMA_ID"})
	@GeneratedValue()
	@DbNumber()
	id: RepositorySchemaId;

	@Id()
	@ManyToOne()
	@JoinColumn({name: "REPOSITORY_ID", referencedColumnName: "ID"})
	repository: Repository;

	@Column({name: "SCHEMA_INDEX", nullable: false})
	@DbNumber()
	schemaIndex: SchemaIndex;

}