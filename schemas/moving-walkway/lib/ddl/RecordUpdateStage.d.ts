import { IActor, IRepository, RecordHistoryActorRecordId } from '@airport/holding-pattern';
import { IApplicationColumn, IApplicationEntity, IApplicationVersion } from '@airport/airspace';
export declare type RecordUpdateStageId = number;
/**
 * Used to temporarily store updates during application remotely synced updates
 * to the local terminal.  Values are deleted right after the remote sync updates
 * are applied.
 */
export declare class RecordUpdateStage {
    id: RecordUpdateStageId;
    applicationVersion: IApplicationVersion;
    entity: IApplicationEntity;
    repository: IRepository;
    actor: IActor;
    actorRecordId: RecordHistoryActorRecordId;
    column: IApplicationColumn;
    updatedValue: any;
}
//# sourceMappingURL=RecordUpdateStage.d.ts.map