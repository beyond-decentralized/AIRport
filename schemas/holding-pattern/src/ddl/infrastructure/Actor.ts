import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
} from '@airport/tarmaq-entity'
import {
	Terminal,
	UserAccount
} from '@airport/travel-document-checkpoint/dist/app/bundle'
import { DdlApplication } from '@airport/airspace/dist/app/bundle';
import { Actor_GUID, Actor_LocalId, IActor } from '@airport/ground-control';


@Entity()
export class Actor
	implements IActor {

	@Id()
	@GeneratedValue()
	@DbNumber()
	@Column({ name: 'ACTOR_LID', nullable: false })
	_localId: Actor_LocalId

	@Column({ name: 'GUID', nullable: false })
	@DbString()
	GUID: Actor_GUID

	@ManyToOne()
	@JoinColumn({ name: 'USER_ACCOUNT_LID', nullable: false })
	userAccount: UserAccount

	@ManyToOne()
	@JoinColumn({ name: 'TERMINAL_LID', nullable: false })
	terminal: Terminal

	@ManyToOne()
	@JoinColumn({ name: "DB_APPLICATION_INDEX" })
	application: DdlApplication

	// This should be tracked in RepositoryTransactionHistory - keeping actors focused on Apps
	// @ManyToOne()
	// @JoinColumn({ name: 'CLIENT_LID', nullable: true })
	// client?: Client

}
