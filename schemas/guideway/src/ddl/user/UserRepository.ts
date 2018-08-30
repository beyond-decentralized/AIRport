import {
	Column,
	DbNumber,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from '@airport/air-control'
import {Repository} from "../repository/Repository";
import {UserRepositoryPermission} from "./Permission";
import {User} from "./User";

@Entity()
@Table({name: "AGT_USER_REPOSITORIES"})
export class UserRepository {

	@Id()
	@ManyToOne()
	@JoinColumn(
		{name: 'REPOSITORY_ID', referencedColumnName: 'ID'}
	)
	repository: Repository;

	@Id()
	@ManyToOne()
	@JoinColumn(
		{name: 'USER_ID', referencedColumnName: 'ID'}
	)
	user: User;

	@Column({name: 'PERMISSION', nullable: false})
	@DbNumber()
	permission: UserRepositoryPermission;

}