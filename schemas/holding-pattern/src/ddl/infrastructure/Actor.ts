import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany
}                         from '@airport/air-control'
import {CascadeType}      from '@airport/ground-control'
import {
	Terminal,
	User
}                         from '@airport/travel-document-checkpoint'
import {RepositoryActor}  from '../repository/RepositoryActor'
import {ActorApplication} from './ActorApplication'

export type ActorId = number;
export type ActorRandomId = number;

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

	@Column({name: 'RANDOM_ID', nullable: false})
	@DbNumber()
	randomId: ActorRandomId

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'actor'})
	actorApplications: ActorApplication[] = []

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'ACTOR_ID'})
	repositoryActor: RepositoryActor[]

}
