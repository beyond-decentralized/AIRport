import { IActor, IRepository, RecordHistoryActorRecordId } from "@airport/holding-pattern";
import { ISchemaColumn, ISchemaEntity, ISchemaVersion } from "@airport/traffic-pattern";
/**
 * Used to temporarily store updates during application remotely synced updates
 * to the local terminal.  Values are deleted right after the remote sync updates
 * are applied.
 */
export declare class RecordUpdateStage {
    schemaVersion: ISchemaVersion;
    entity: ISchemaEntity;
    repository: IRepository;
    actor: IActor;
    actorRecordId: RecordHistoryActorRecordId;
    column: ISchemaColumn;
    updatedValue: any;
}
