import {
	Column,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                      from "@airport/air-control";
import {IApplication,} from "../../generated/infrastructure/qapplication";
import {IRepository,}  from "../../generated/repository/qrepository";

/**
 * Created by Papa on 12/18/2016.
 */

/**
 * A record of device+datatabase that adds to a repository
 */
@Entity()
@Table({name: "REPOSITORY_APPLICATION"})
export class RepositoryApplication {

	@Column({name: "ID"})
	@GeneratedValue()
	@Id()
	id: number;

	@ManyToOne()
	@JoinColumn({name: "APPLICATION_ID", referencedColumnName: "ID"})
	application: IApplication;

	@Id()
	@ManyToOne()
	@JoinColumn({name: "REPOSITORY_ID", referencedColumnName: "ID"})
	repository: IRepository;

}
