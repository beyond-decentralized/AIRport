import { IActor, RepositoryTransactionHistory } from "@airport/holding-pattern";
import { ITerminal, IUser } from "@airport/travel-document-checkpoint";
import { ISchemaVersion } from "@airport/traffic-pattern";
export interface TerminalMessage {
    actors: IActor[];
    schemaVersions: ISchemaVersion[];
    history: RepositoryTransactionHistory;
    syncTimestamp: number;
    users: IUser[];
    terminals: ITerminal[];
}
//# sourceMappingURL=Message.d.ts.map