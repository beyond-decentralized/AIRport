import { IActor, IRepository, RepositoryTransactionHistory } from "@airport/holding-pattern";
import { ITerminal, IUser } from "@airport/travel-document-checkpoint";
import { ISchema, ISchemaVersion } from "@airport/airspace";
export interface TerminalMessage {
    actors: IActor[];
    schemaVersions: ISchemaVersion[];
    schemas: ISchema[];
    history: RepositoryTransactionHistory;
    referencedRepositories: IRepository[];
    syncTimestamp: number;
    users: IUser[];
    terminals: ITerminal[];
}
//# sourceMappingURL=TerminalMessage.d.ts.map