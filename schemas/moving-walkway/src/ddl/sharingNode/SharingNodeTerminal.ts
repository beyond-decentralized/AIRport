import {DbString} from '@airport/air-control'
import {
	Column,
	DbNumber,
	Id,
	JoinColumn,
	ManyToOne
}                 from "@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators";
import {
	Entity,
	Table
}                 from "@airport/air-control/lib/impl/core/entity/metadata/EntityDecorators";
import {
	TerminalPassword,
	TerminalId
}                           from "@airport/arrivals-n-departures";
import {TerminalSyncStatus} from "@airport/ground-control";
import {ITerminal}          from '@airport/travel-document-checkpoint'
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
	@DbNumber()
	agtTerminalId: TerminalId;

	@Column({name: "TERMINAL_PASSWORD"})
	@DbString()
	agtTerminalPassword: TerminalPassword;

	@Column({name: "TERMINAL_SYNC_STATUS"})
	@DbString()
	terminalSyncStatus: TerminalSyncStatus;

}