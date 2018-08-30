import {
	Column,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                         from "@airport/air-control";
import {IActor,}          from "../../generated/infrastructure/qactor";
import {IRepository,}     from "../../generated/repository/qrepository";
import {IRepositoryActor} from "../../generated/repository/qrepositoryactor";

/**
 * Created by Papa on 12/18/2016.
 */

/**
 * A record of device+datatabase that adds to a repository
 */
@Entity()
@Table({name: "REPOSITORY_ACTORS"})
export class RepositoryActor
	implements IRepositoryActor {

	@Column({name: "ID"})
	@GeneratedValue()
	@Id()
	id: number;

	@ManyToOne()
	@JoinColumn({name: "ACTOR_ID", referencedColumnName: "ID",
		nullable: false})
	actor: IActor;

	@Id()
	@ManyToOne()
	@JoinColumn({name: "REPOSITORY_ID", referencedColumnName: "ID",
		nullable: false})
	repository: IRepository;

}
