import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from "@airport/tarmaq-entity";
import { IRepositoryReference } from "@airport/ground-control";
import { Repository } from "./Repository";

@Entity()
@Table({
	name: "REPOSITORY_REFERENCES"
})
export class RepositoryReference
	implements IRepositoryReference {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'REFERENCING_REPOSITORY_LID',
		referencedColumnName: 'REPOSITORY_LID'
	})
	referencingRepository?: Repository

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'REFERENCED_REPOSITORY_LID',
		referencedColumnName: 'REPOSITORY_LID'
	})
	referencedRepository?: Repository

}
