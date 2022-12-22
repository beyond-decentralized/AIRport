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
import { Application } from '@airport/airspace/dist/app/bundle';

export type Actor_LocalId = number;
export type Actor_GUID = string;

@Entity()
export class Actor {

	@Id()
	@GeneratedValue()
	@DbNumber()
	@Column({ name: 'ACTOR_LID' })
	_localId?: Actor_LocalId

	@Column({ name: 'GUID', nullable: false })
	@DbString()
	GUID?: Actor_GUID

	@ManyToOne()
	@JoinColumn({
		name: 'USER_ACCOUNT_GUID',
		referencedColumnName: 'GUID',
		nullable: false
	})
	userAccount: UserAccount

	@ManyToOne()
	@JoinColumn({
		name: 'TERMINAL_GUID',
		referencedColumnName: 'GUID',
		nullable: false
	})
	terminal?: Terminal

	@ManyToOne()
	@JoinColumn({
		name: "APPLICATION_INDEX",
		referencedColumnName: "APPLICATION_INDEX"
	})
	application?: Application

	// This should be tracked in RepositoryTransactionHistory - keeping actors focused on Apps
	// @ManyToOne()
	// @JoinColumn({
	// 	name: 'CLIENT_LID',
	// 	referencedColumnName: 'CLIENT_LID',
	// 	nullable: true
	// })
	// client?: Client

}
