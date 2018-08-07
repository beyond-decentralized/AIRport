import {
	Entity,
	JoinColumn,
	ManyToOne,
	Table
}                 from '@airport/air-control'
import {Terminal} from './Terminal'
import {User}     from './User'

@Entity()
@Table({name: 'USER_TERMINAL'})
export class UserTerminal {

	@ManyToOne()
	@JoinColumn({name: 'USER_ID', referencedColumnName: 'ID'})
	user: User

	@ManyToOne()
	@JoinColumn({name: 'TERMINAL_ID', referencedColumnName: 'ID'})
	terminal: Terminal

}