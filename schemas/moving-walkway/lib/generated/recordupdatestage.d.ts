import { ISchemaVersion, ISchemaEntity, ISchemaColumn } from '@airport/traffic-pattern';
import { IRepository, IActor } from '@airport/holding-pattern';
export interface IRecordUpdateStage {
    id: number;
    actorRecordId?: number;
    updatedValue?: any;
    schemaVersion?: ISchemaVersion;
    entity?: ISchemaEntity;
    repository?: IRepository;
    actor?: IActor;
    column?: ISchemaColumn;
}
//# sourceMappingURL=recordupdatestage.d.ts.map