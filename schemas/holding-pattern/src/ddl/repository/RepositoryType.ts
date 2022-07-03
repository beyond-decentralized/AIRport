import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from "@airport/air-traffic-control";
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
		name: 'TYPE_LID',
		referencedColumnName: 'TYPE_LID'
	})
	type: Type

}
