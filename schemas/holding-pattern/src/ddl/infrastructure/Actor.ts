import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany
}                         from '@airport/air-control'
import {
	Terminal,
	User
}                         from '@airport/travel-document-checkpoint'
import {RepositoryActor}  from '../repository/RepositoryActor'
import {ActorApplication} from './ActorApplication'

export type ActorId = number;
export type ActorUuId = string;

@Entity()
export class Actor {

	@Id()
	@GeneratedValue()
	@DbNumber()
	id: ActorId

	@ManyToOne()
	@JoinColumn({name: 'USER_ID', referencedColumnName: 'ID',
		nullable: false})
	user: User

	@ManyToOne()
	@JoinColumn({name: 'TERMINAL_ID', referencedColumnName: 'ID',
		nullable: false})
	terminal: Terminal

	@Column({name: 'UU_ID', nullable: false})
	@DbString()
	uuId: ActorUuId

	@OneToMany({mappedBy: 'actor'})
	actorApplications: ActorApplication[] = []

	@OneToMany({mappedBy: 'ACTOR_ID'})
	repositoryActor: RepositoryActor[]

}
