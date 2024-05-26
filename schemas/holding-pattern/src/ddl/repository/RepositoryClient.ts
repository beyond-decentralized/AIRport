import { IRepositoryClient } from "@airport/ground-control";
import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from "@airport/tarmaq-entity";
import {
	Client
} from "@airport/travel-document-checkpoint/dist/app/bundle";
import { Repository } from "./Repository";

@Entity()
@Table({
	name: "REPOSITORY_CLIENTS"
})
export class RepositoryClient
	implements IRepositoryClient {

	@Id()
	@ManyToOne()
	@JoinColumn({ name: 'REPOSITORY_LID' })
	repository: Repository

	@Id()
	@ManyToOne()
	@JoinColumn({ name: 'CLIENT_LID' })
	client: Client

}
