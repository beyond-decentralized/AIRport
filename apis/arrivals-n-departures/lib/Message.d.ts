import { IActor, RepositoryTransactionHistory } from "@airport/holding-pattern";
import { ITerminal, IUser } from "@airport/travel-document-checkpoint";
import { ISchema, ISchemaVersion } from "@airport/traffic-pattern";
export interface TerminalMessage {
    actors: IActor[];
    schemaVersions: ISchemaVersion[];
    schemas: ISchema[];
    history: RepositoryTransactionHistory;
    syncTimestamp: number;
    users: IUser[];
    terminals: ITerminal[];
}
//# sourceMappingURL=Message.d.ts.map