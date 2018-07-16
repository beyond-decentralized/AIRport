import {
	DbBoolean,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                                from "@airport/air-control";
import {IActor}                  from "@airport/holding-pattern";
import {SynchronizationConflict} from "./SynchronizationConflict";

export type SynchronizationConflictPendingNotificationAcknowledged = boolean;

@Entity()
@Table({name: "SYNC_CONFLICT_PENDING_NOTIFICATION"})
export class SynchronizationConflictPendingNotification {

	@Id()
	@ManyToOne()
	@JoinColumn({name: "SYNC_CONFLICT_ID", referencedColumnName: "ID"})
	synchronizationConflict: SynchronizationConflict;

	@Id()
	@ManyToOne()
	@JoinColumn({name: "ACTOR_ID", referencedColumnName: "ID"})
	actor: IActor;

	@DbBoolean()
	acknowledged: SynchronizationConflictPendingNotificationAcknowledged;

}