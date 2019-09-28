import { ISchemaVersion, ISchemaEntity } from '@airport/traffic-pattern';
import { IRepository, IActor } from '@airport/holding-pattern';
export interface IMissingRecord {
    id: number;
    actorRecordId?: number;
    status?: number;
    schemaVersion?: ISchemaVersion;
    entity?: ISchemaEntity;
    repository?: IRepository;
    actor?: IActor;
}
