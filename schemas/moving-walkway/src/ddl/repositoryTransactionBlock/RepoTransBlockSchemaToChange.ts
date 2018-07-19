import {
	DbNumber,
	Id,
	JoinColumn,
	ManyToOne
}                                   from "@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators";
import {
	Entity,
	Table
}                                   from "@airport/air-control/lib/impl/core/entity/metadata/EntityDecorators";
import {Schema}                     from "@airport/traffic-pattern";
import {SchemaChangeStatus}         from "../values/SchemaChangeStatus";
import {RepositoryTransactionBlock} from "./RepositoryTransactionBlock";


@Entity()
@Table({name: "REPO_TRANS_BLOCK_SCHEMAS_TO_CHANGE"})
export class RepoTransBlockSchemasToChange {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: "SHARING_MESSAGE_ID", referencedColumnName: "ID"
	})
	repositoryTransactionBlock: RepositoryTransactionBlock;

	@DbNumber()
	status: SchemaChangeStatus;

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: "SCHEMA_INDEX", referencedColumnName: "INDEX"
	})
	schema: Schema;

}