import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	Table
}                           from "@airport/air-control";
import {
	TerminalId,
	TerminalPassword
}                           from "@airport/arrivals-n-departures";
import {AgtSharingMessage}  from "../synchronization/AgtSharingMessage";
import {User}               from "../user/User";
import {TerminalRepository} from "./TerminalRepository";

export type TerminalLastPollConnectionDatetime = number;
export type TerminalLastSseConnectionDatetime = number;

/**
 * Represents the client-side terminal.
 */
@Entity()
@Table({name: "AGT_TERMINALS"})
export class Terminal {

	@Id()
	@DbNumber()
	@GeneratedValue()
	id: TerminalId;

	@DbString()
	password: TerminalPassword;

	@Column({name: "LAST_RECENT_CONNECTION_DATETIME"})
	@DbNumber()
	lastPollConnectionDatetime: TerminalLastPollConnectionDatetime;

	@Column({name: "LAST_ARCHIVE_CONNECTION_DATETIME"})
	@DbNumber()
	lastSseConnectionDatetime: TerminalLastSseConnectionDatetime;

	@ManyToOne()
	@JoinColumn(
		{name: "USER_ID", referencedColumnName: 'ID'}
	)
	user: User;

	@OneToMany()
	terminalRepositories: TerminalRepository[];

	@OneToMany()
	sharingMessages: AgtSharingMessage[];

}