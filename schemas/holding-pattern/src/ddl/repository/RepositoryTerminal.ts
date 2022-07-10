import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from "@airport/tarmaq-entity";
import {
	Terminal,
	Type
} from "@airport/travel-document-checkpoint";
import { Repository } from "./Repository";

@Entity()
@Table({
	name: "REPOSITORY_TERMINALS"
})
export class RepositoryTerminal {

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
		name: 'TERMINAL_LID',
		referencedColumnName: 'TERMINAL_LID'
	})
	terminal: Terminal

}
