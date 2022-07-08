import { IActor, IRepository, RecordHistory_ActorRecordId } from '@airport/holding-pattern';
import { IApplicationColumn, IApplicationEntity, IApplicationVersion } from '@airport/airspace';
export declare type RecordUpdateStage_LocalId = number;
/**
 * Used to temporarily store updates during application remotely synced updates
 * to the local terminal.  Values are deleted right after the remote sync updates
 * are applied.
 */
export declare class RecordUpdateStage {
    _localId: RecordUpdateStage_LocalId;
    applicationVersion: IApplicationVersion;
    entity: IApplicationEntity;
    repository: IRepository;
    actor: IActor;
    _actorRecordId: RecordHistory_ActorRecordId;
    column: IApplicationColumn;
    updatedValue: any;
}
//# sourceMappingURL=RecordUpdateStage.d.ts.map