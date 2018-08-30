import {
	Column,
	DbNumber,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
}                           from "@airport/air-control";
import {
	RepositoryTransactionBlockContents,
	TmRepositoryTransactionBlockId
}                           from "@airport/arrivals-n-departures";
import {IServer}            from "../../generated/server/qserver";
import {Terminal}           from "../terminal/Terminal";
import {TerminalRepository} from "../terminal/TerminalRepository";
import {Repository}         from "../repository/Repository";
import {ArchivingStatus}    from "./ArchivingStatus";
import {SyncLog}            from "./SyncLog";

export type AgtRepositoryTransactionBlockId = number;
export type AgtRepositoryTransactionBlockAddDatetime = number;
export type AgtRepositoryTransactionBlockArchivingStatus = ArchivingStatus;
export type AgtRepositoryTransactionBlockIsRecent = boolean;

@Entity()
@Table({name: "AGT_REPOSITORY_TRANSACTION_BLOCKS"})
// TODO: partition by add date for efficient dropping of records
export class AgtRepositoryTransactionBlock {

	@Id()
	@GeneratedValue()
	@DbNumber()
	id: AgtRepositoryTransactionBlockId;

	@ManyToOne()
	@JoinColumn(
		{name: "REPOSITORY_ID", referencedColumnName: 'ID', nullable: false}
	)
	repository: Repository;

	@OneToMany()
	@JoinColumn(
		{name: "REPOSITORY_ID", nullable: false}
	)
	terminalRepositories: TerminalRepository[];

	@ManyToOne()
	@JoinColumn(
		{name: "TERMINAL_ID", referencedColumnName: 'ID', nullable: false}
	)
	terminal: Terminal;

	@ManyToOne()
	@JoinColumn(
		{name: "ARCHIVING_SERVER_ID", referencedColumnName: "ID"}
	)
	archivingServer: IServer;

	@Column({name: "ARCHIVING_STATUS", nullable: false})
	@DbNumber()
	archivingStatus: AgtRepositoryTransactionBlockArchivingStatus;

	@Column({name: "ADD_DATETIME", nullable: false})
	addDatetime: AgtRepositoryTransactionBlockAddDatetime;

	/*
	Recent status is removed - now all sync records are considered for "recent" syncing purposes.
	This assumed not to have major impact on performance because of indexing.  NOTE: this table
	should never contain more than 2 days worth of data (oscillating between half a day and a day
	and a half, depending on the archiving cycle.

	@Column({name: "IS_RECENT"})
	@DbBoolean()
	isRecent: AgtRepositoryTransactionBlockIsRecent;
*/

	@Column({name: "TM_REPOSITORY_TRANSACTION_BLOCK_ID", nullable: false})
	@DbNumber()
	tmRepositoryTransactionBlockId: TmRepositoryTransactionBlockId;

	/**
	 * In transaction data multiple transaction logs may be present and we don't want
	 * to ever receive multiple transaction log entries. Possible strategies to accomplish that:
	 *
	 * a) Keep track of which transactions log entries are in which data records
	 *
	 * PROS:
	 *
	 * 1) allows to re-send transaction data without additional computation on TM side
	 * 2) allows to re-send one message with additional transaction logs, instead of sending
	 * multiple messages
	 *
	 * CONS:
	 *
	 * 1) requires more computation and storage on the AGT side.
	 * 2) gives AGT knowledge of which and how many transaction log entries are in each
	 * message
	 *
	 *
	 * b) Allow for sending multiple transaction data records in the same message
	 *
	 * PROS:
	 *
	 * 1) no additional load on AGT
	 * 2) no need for AGT know about transaction log entries
	 * 3) still allows to resent one message with additional transaction logs
	 *
	 * CONS:
	 *
	 * No major CONS.
	 *
	 * no known const
	 *
	 */
	@Column({name: "REPOSITORY_TRANSACTION_BLOCK", nullable: false})
	contents: RepositoryTransactionBlockContents;

	@OneToMany()
	syncLogs: SyncLog[];

}