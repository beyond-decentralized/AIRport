import { IActor, IRepository, RecordHistoryActorRecordId, RepositoryTransactionHistory } from "@airport/holding-pattern";
import { ISchemaEntity, ISchemaVersion } from "@airport/traffic-pattern";
import { MissingRecordStatus } from "./MissingRecordStatus";
export declare type MissingRecordId = number;
export declare class MissingRecord {
    id: MissingRecordId;
    schemaVersion: ISchemaVersion;
    entity: ISchemaEntity;
    repository: IRepository;
    actor: IActor;
    actorRecordId: RecordHistoryActorRecordId;
    status: MissingRecordStatus;
    repositoryTransactionHistory: RepositoryTransactionHistory;
}
//# sourceMappingURL=MissingRecord.d.ts.map