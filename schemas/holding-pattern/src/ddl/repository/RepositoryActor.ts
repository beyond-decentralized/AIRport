import {
	Column,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from "@airport/air-control";
import {
	Actor
} from '../infrastructure/Actor'
import {
	Repository
} from '../repository/Repository'

/**
 * Created by Papa on 12/18/2016.
 */

/**
 * A record of device+datatabase that adds to a repository
 */
@Entity()
@Table({name: "REPOSITORY_ACTORS"})
export class RepositoryActor {

	@Column({name: "ID"})
	@GeneratedValue()
	@Id()
	id: number;

	@ManyToOne()
	@JoinColumn({name: "ACTOR_ID", referencedColumnName: "ID",
		nullable: false})
	actor: Actor;

	@Id()
	@ManyToOne()
	@JoinColumn({name: "REPOSITORY_ID", referencedColumnName: "ID",
		nullable: false})
	repository: Repository;

}
