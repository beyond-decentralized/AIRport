import {
	DbNumber,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                                 from "@airport/air-control";
import {Repository}               from "../repository/Repository";
import {UserRepositoryPermission} from "../user/Permission";
import {Terminal}                 from "./Terminal";

export type TerminalRepositoryPermission = UserRepositoryPermission;

/**
 * Records all Repositories that a given terminal subscribes too.
 */
@Entity()
@Table({name: "AGT_TERMINAL_REPOSITORIES"})
export class TerminalRepository {

	@Id()
	@ManyToOne()
	@JoinColumn(
		{name: "TERMINAL_ID", referencedColumnName: 'ID'}
	)
	terminal: Terminal;

	@Id()
	@ManyToOne()
	@JoinColumn(
		{name: "REPOSITORY_ID", referencedColumnName: 'ID'}
	)
	repository: Repository;

	@DbNumber()
	permission: TerminalRepositoryPermission;

}