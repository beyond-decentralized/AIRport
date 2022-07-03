import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from "@airport/air-traffic-control";
import {
	Client,
	Type
} from "@airport/travel-document-checkpoint";
import { Repository } from "./Repository";

@Entity()
@Table({
	name: "REPOSITORY_CLIENTS"
})
export class RepositoryClient {

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
		name: 'CLIENT_LID',
		referencedColumnName: 'CLIENT_LID'
	})
	client: Client

}
