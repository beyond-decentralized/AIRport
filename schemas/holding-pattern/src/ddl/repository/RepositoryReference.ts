import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from "@airport/tarmaq-entity";
import { Repository } from "./Repository";

/**
 * Created by Papa on 2/9/2017.
 */

@Entity()
@Table({
	name: "REPOSITORY_REFERENCE"
})
export class RepositoryReference {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'REFERENCING_REPOSITORY_GUID',
		referencedColumnName: 'GUID',
		nullable: false
	})
	referencingRepository: Repository

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: 'REFERENCED_REPOSITORY_GUID',
		referencedColumnName: 'GUID',
		nullable: false
	})
	referencedRepository: Repository

}
