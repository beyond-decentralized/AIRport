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
}                                      from "@airport/air-control";
import {
	AgtSharingMessageId,
	TmSharingMessageId
}                                      from "@airport/arrivals-n-departures";
import {Terminal}                      from "../..";
import {AgtSharingMessageAcknowledged} from "./AgtSharingMessageAcknowledged";
import {SyncLog}                       from "./SyncLog";

/**
 * A AgtSharingMessage record is created everytime the AGT sends a group of sync records
 * to Terminals.  Eventually, when Terminals respond with an ACK of receipt a corresponding
 * group of sync records the state of these records is updated.
 */
@Entity()
@Table({name: "AGT_SHARING_MESSAGES"})
export class AgtSharingMessage {

	@Id()
	@DbNumber()
	@GeneratedValue()
	id: AgtSharingMessageId;

	@ManyToOne()
	@JoinColumn(
		{name: "SYNCED_TERMINAL_ID", referencedColumnName: 'ID'}
	)
	terminal: Terminal;

	@Column({name: "TM_SHARING_MESSAGE_ID"})
	tmSharingMessageId: TmSharingMessageId;

	@OneToMany()
	syncLogs: SyncLog[];

	@DbNumber()
	acknowledged: AgtSharingMessageAcknowledged;

}