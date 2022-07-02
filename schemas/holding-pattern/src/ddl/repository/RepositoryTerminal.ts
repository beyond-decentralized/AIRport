import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from "@airport/air-traffic-control";
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
	@JoinColumn({ name: 'REPOSITORY_ID', referencedColumnName: 'ID' })
	repository: Repository

	@Id()
	@ManyToOne()
	@JoinColumn({ name: 'TERMINAL_ID', referencedColumnName: 'ID' })
	terminal: Terminal

}
