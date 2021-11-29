import { ISchemaVersion, ISchemaEntity } from '@airport/traffic-pattern';
import { IRepository, IActor, IRepositoryTransactionHistory } from '@airport/holding-pattern';
export interface IMissingRecord {
    id: number;
    actorRecordId?: number;
    status?: string;
    schemaVersion?: ISchemaVersion;
    entity?: ISchemaEntity;
    repository?: IRepository;
    actor?: IActor;
    repositoryTransactionHistory?: IRepositoryTransactionHistory;
}
//# sourceMappingURL=missingrecord.d.ts.map