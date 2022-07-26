import { RecordUpdateStage } from '../ddl/recordupdatestage';
import { RecordUpdateStageVDescriptor } from './vrecordupdatestage';
import { SynchronizationConflict } from '../ddl/conflict/synchronizationconflict';
import { SynchronizationConflictVDescriptor } from './conflict/vsynchronizationconflict';
import { SynchronizationConflictValues } from '../ddl/conflict/synchronizationconflictvalues';
import { SynchronizationConflictValuesVDescriptor } from './conflict/vsynchronizationconflictvalues';
import { IDvo, Dvo } from '@airport/airbridge-validate';
import { ApplicationEntity_LocalId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDvo<Entity, EntityVDescriptor> extends Dvo<Entity, EntityVDescriptor> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseRecordUpdateStageDvo extends IDvo<RecordUpdateStage, RecordUpdateStageVDescriptor<RecordUpdateStage>> {
}
export declare class BaseRecordUpdateStageDvo extends SQDIDvo<RecordUpdateStage, RecordUpdateStageVDescriptor<RecordUpdateStage>> implements IBaseRecordUpdateStageDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSynchronizationConflictDvo extends IDvo<SynchronizationConflict, SynchronizationConflictVDescriptor<SynchronizationConflict>> {
}
export declare class BaseSynchronizationConflictDvo extends SQDIDvo<SynchronizationConflict, SynchronizationConflictVDescriptor<SynchronizationConflict>> implements IBaseSynchronizationConflictDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSynchronizationConflictValuesDvo extends IDvo<SynchronizationConflictValues, SynchronizationConflictValuesVDescriptor<SynchronizationConflictValues>> {
}
export declare class BaseSynchronizationConflictValuesDvo extends SQDIDvo<SynchronizationConflictValues, SynchronizationConflictValuesVDescriptor<SynchronizationConflictValues>> implements IBaseSynchronizationConflictValuesDvo {
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDvos.d.ts.map