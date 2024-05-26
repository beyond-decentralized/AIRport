import { IRepositoryTerminal } from "@airport/ground-control";
import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from "@airport/tarmaq-entity";
import {
	Terminal
} from "@airport/travel-document-checkpoint/dist/app/bundle";
import { Repository } from "./Repository";

@Entity()
@Table({
	name: "REPOSITORY_TERMINALS"
})
export class RepositoryTerminal
	implements IRepositoryTerminal {

	@Id()
	@ManyToOne()
	@JoinColumn({ name: 'REPOSITORY_LID' })
	repository: Repository

	@Id()
	@ManyToOne()
	@JoinColumn({ name: 'TERMINAL_LID' })
	terminal: Terminal

}
