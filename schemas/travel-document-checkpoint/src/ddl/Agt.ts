import {
	Entity,
	GeneratedValue,
	Id,
	OneToMany,
	Table
}                        from '@airport/air-traffic-control'
import {TerminalAgt}     from './TerminalAgt'
import {UserTerminalAgt} from './UserTerminalAgt'

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

	@OneToMany({mappedBy: 'agt'})
	userTerminalAgts: UserTerminalAgt[]

}