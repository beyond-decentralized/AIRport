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
import {CascadeType}        from "@airport/ground-control";
import {IActor,}            from "../../generated/infrastructure/qactor";
import {IActorApplication,} from "../../generated/infrastructure/qactorapplication";
import {IUser}              from "../../generated/infrastructure/quser";
import {IRepositoryActor,}  from "../../generated/repository/qrepositoryactor";
import {Terminal}           from "./Terminal";

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
	@JoinColumn({name: "TERMINAL_ID", referencedColumnName: "ID"})
	terminal: Terminal;

	@Column({name: "RANDOM_ID"})
	@DbNumber()
	randomId: ActorRandomId;

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'actor'})
	actorApplications: IActorApplication[] = [];

	@OneToMany({cascade: CascadeType.ALL, mappedBy: "ACTOR_ID"})
	repositoryActor: IRepositoryActor[];
}