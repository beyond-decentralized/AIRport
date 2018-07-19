import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany
}                           from "@airport/air-control";
import {
	CascadeType
}                           from "@airport/ground-control";
import {IActor,}            from "../../generated/infrastructure/qactor";
import {IActorApplication,} from "../../generated/infrastructure/qactorapplication";
import {IDatabase,}         from "../../generated/infrastructure/qdatabase";
import {IUser}              from "../../generated/infrastructure/quser";
import {IRepositoryActor,}  from "../../generated/repository/qrepositoryactor";

export type ActorId = number;
export type ActorRandomId = number;

@Entity()
export class Actor
	implements IActor {

	@Id()
	@GeneratedValue()
	@DbNumber()
	id: ActorId;

	@ManyToOne()
	@JoinColumn({name: "USER_ID", referencedColumnName: "ID"})
	user: IUser;

	@ManyToOne()
	@JoinColumn({name: "DATABASE_ID", referencedColumnName: "ID"})
	database: IDatabase;

	@Column({name: "RANDOM_ID"})
	@DbNumber()
	randomId: ActorRandomId;

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'actor'})
	actorApplications: IActorApplication[] = [];

	@OneToMany({cascade: CascadeType.ALL, mappedBy: "ACTOR_ID"})
	repositoryActor: IRepositoryActor[];
}