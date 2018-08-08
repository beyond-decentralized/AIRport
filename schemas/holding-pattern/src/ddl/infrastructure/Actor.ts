import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany
}                           from '@airport/air-control'
import {CascadeType}        from '@airport/ground-control'
import {
	Terminal,
	User
}                           from '@airport/travel-document-checkpoint'
import {IActor,}            from '../../generated/infrastructure/qactor'
import {IActorApplication,} from '../../generated/infrastructure/qactorapplication'
import {IRepositoryActor,}  from '../../generated/repository/qrepositoryactor'

export type ActorId = number;
export type ActorRandomId = number;

@Entity()
export class Actor
	implements IActor {

	@Id()
	@GeneratedValue()
	@DbNumber()
	id: ActorId

	@ManyToOne()
	@JoinColumn({name: 'USER_ID', referencedColumnName: 'ID'})
	user: User

	@ManyToOne()
	@JoinColumn({name: 'TERMINAL_ID', referencedColumnName: 'ID'})
	terminal: Terminal

	@Column({name: 'RANDOM_ID'})
	@DbNumber()
	randomId: ActorRandomId

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'actor'})
	actorApplications: IActorApplication[] = []

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'ACTOR_ID'})
	repositoryActor: IRepositoryActor[]
}