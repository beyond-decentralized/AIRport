import { IActor, IRepository, RecordHistoryActorRecordId } from "@airport/holding-pattern";
import { ISchema, ISchemaColumn, ISchemaEntity } from "@airport/traffic-pattern";
/**
 * Used to temporarily store updates during application remotely synced updates
 * to the local database.  Values are deleted right after the remote sync updates
 * are applied.
 */
export declare class RecordUpdateStage {
    schema: ISchema;
    entity: ISchemaEntity;
    repository: IRepository;
    actor: IActor;
    actorRecordId: RecordHistoryActorRecordId;
    column: ISchemaColumn;
    updatedValue: any;
}
