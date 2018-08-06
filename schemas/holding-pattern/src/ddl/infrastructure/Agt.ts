import {
	Entity,
	GeneratedValue,
	Id,
	OneToMany,
	Table
}                    from '@airport/air-control'
import {TerminalAgt} from './TerminalAgt'

export type AgtId = number;
export type AgtAddress = string;

@Entity()
@Table()
export class Agt {

	@Id()
	@GeneratedValue()
	id: AgtId

	address: AgtAddress

	@OneToMany({mappedBy: 'agt'})
	terminalAgts: TerminalAgt[]

}