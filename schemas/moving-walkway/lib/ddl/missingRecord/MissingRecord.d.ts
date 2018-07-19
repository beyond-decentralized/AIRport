import { IActor, IRepository, RecordHistoryActorRecordId } from "@airport/holding-pattern";
import { ISchema, ISchemaEntity } from "@airport/traffic-pattern";
import { MissingRecordStatus } from "./MissingRecordStatus";
export declare type MissingRecordId = number;
export declare class MissingRecord {
    id: MissingRecordId;
    schema: ISchema;
    entity: ISchemaEntity;
    repository: IRepository;
    actor: IActor;
    actorRecordId: RecordHistoryActorRecordId;
    status: MissingRecordStatus;
}
