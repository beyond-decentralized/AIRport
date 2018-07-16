import {
	Column,
	DbDate,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	OneToMany,
	Table
}                                      from "@airport/air-control";
import {AgtRepositoryId}               from "@airport/arrivals-n-departures";
import {TerminalRepository}            from "../terminal/TerminalRepository";
import {AgtRepositoryTransactionBlock} from "../synchronization/AgtRepositoryTransactionBlock";
import {RepositoryStatus}              from "./RepositoryStatus";

export type RepositoryLastUpdateDatetime = Date;
export type RepositoryName = string;

@Entity()
@Table({name: "AGT_REPOSITORIES"})
export class Repository {

	@Id()
	@DbNumber()
	@GeneratedValue()
	id: AgtRepositoryId;

	@Column({name: "LAST_UPDATE_DATETIME"})
	@DbDate()
	lastUpdateTime: RepositoryLastUpdateDatetime;

	// NOTE: needed to for archiving purposes - name of the directory of daily records in month
	@DbString()
	name: RepositoryName;

	@DbNumber()
	status: RepositoryStatus;

	@OneToMany()
	terminalRepositories: TerminalRepository[];

	@OneToMany()
	repositoryTransactionBlocks: AgtRepositoryTransactionBlock[];

}