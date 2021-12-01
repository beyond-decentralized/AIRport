import {
	DbString,
	Id,
	JoinColumn,
	ManyToOne
}                                   from "@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators";
import {
	Entity,
	Table
}                                   from "@airport/air-control/lib/impl/core/entity/metadata/EntityDecorators";
import {Application}                     from "@airport/traffic-pattern";
import {ApplicationChangeStatus}         from "../values/ApplicationChangeStatus";
import {RepositoryTransactionBlock} from "./RepositoryTransactionBlock";


@Entity()
@Table({name: "REPO_TRANS_BLOCK_SCHEMAS_TO_CHANGE"})
export class RepoTransBlockApplicationToChange {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: "SHARING_MESSAGE_ID", referencedColumnName: "ID"
	})
	repositoryTransactionBlock: RepositoryTransactionBlock;

	@DbString()
	status: ApplicationChangeStatus;

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: "SCHEMA_INDEX"
	})
	application: Application;

}
