import { IApplicationVersion, IApplicationEntity, IApplicationColumn } from '@airport/airspace';
import { IRepository, IActor } from '@airport/holding-pattern';
export interface IRecordUpdateStage {
    id: number;
    actorRecordId?: number;
    updatedValue?: any;
    applicationVersion?: IApplicationVersion;
    entity?: IApplicationEntity;
    repository?: IRepository;
    actor?: IActor;
    column?: IApplicationColumn;
}
//# sourceMappingURL=recordupdatestage.d.ts.map