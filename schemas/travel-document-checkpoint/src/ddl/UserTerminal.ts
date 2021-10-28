import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                 from '@airport/air-control'
import {Terminal} from './Terminal'
import {User}     from './User'

/**
 * 
 * DEPRECATED - syncing will now be done via IPFS/Peergos
 * 
 */
@Entity()
@Table({name: 'USER_TERMINAL'})
export class UserTerminal {

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'USER_ID', referencedColumnName: 'ID'})
	user: User

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'TERMINAL_ID', referencedColumnName: 'ID'})
	terminal: Terminal

}
