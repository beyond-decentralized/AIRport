import { IActor, IRepository, IRepositoryTransactionHistory } from "@airport/holding-pattern";
import { ITerminal, IUser } from "@airport/travel-document-checkpoint";
import { IApplication, IApplicationVersion } from "@airport/airspace";
export interface TerminalMessage {
    actors: IActor[];
    applicationVersions: IApplicationVersion[];
    applications: IApplication[];
    history: IRepositoryTransactionHistory;
    referencedRepositories: IRepository[];
    syncTimestamp: number;
    users: IUser[];
    terminals: ITerminal[];
}
//# sourceMappingURL=TerminalMessage.d.ts.map