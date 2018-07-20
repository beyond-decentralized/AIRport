import {
	Column,
	DbNumber,
	Id,
	JoinColumn,
	ManyToOne
}                           from "@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators";
import {
	Entity,
	Table
}                           from "@airport/air-control/lib/impl/core/entity/metadata/EntityDecorators";
import {
	TerminalPassword,
	TerminalId
}                           from "@airport/arrivals-n-departures";
import {ITerminal}          from "@airport/holding-pattern";
import {TerminalSyncStatus} from "@airport/ground-control";
import {SharingNode}        from "./SharingNode";


@Entity()
@Table({name: "SHARING_NODE_TERMINAL"})
export class SharingNodeTerminal {

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: "SHARING_NODE_ID", referencedColumnName: "ID"
	})
	sharingNode: SharingNode;

	@Id()
	@ManyToOne()
	@JoinColumn({
		name: "TERMINAL_ID", referencedColumnName: "ID"
	})
	terminal: ITerminal;

	@Column({name: "AGT_TERMINAL_ID"})
	agtTerminalId: TerminalId;

	@Column({name: "TERMINAL_PASSWORD"})
	agtTerminalPassword: TerminalPassword;

	@DbNumber()
	@Column({name: "TERMINAL_SYNC_STATUS"})
	terminalSyncStatus: TerminalSyncStatus;

}