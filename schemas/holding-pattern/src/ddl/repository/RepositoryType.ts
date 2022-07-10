import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from "@airport/tarmaq-entity";
import {
	Type
} from "@airport/travel-document-checkpoint";
import { Repository } from "./Repository";

@Entity()
@Table({
	name: "REPOSITORY_TYPES"
})
export class RepositoryType {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'REPOSITORY_LID',
		referencedColumnName: 'REPOSITORY_LID'
	})
	repository: Repository

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'TYPE_ID',
		referencedColumnName: 'TYPE_ID'
	})
	type: Type

}
