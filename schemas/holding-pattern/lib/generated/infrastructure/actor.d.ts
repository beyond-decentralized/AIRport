import { IUserAccount, ITerminal } from '@airport/travel-document-checkpoint';
import { IApplication } from '@airport/airspace';
export interface IActor {
    _localId?: number;
    GUID?: string;
    userAccount?: IUserAccount;
    terminal?: ITerminal;
    application?: IApplication;
}
//# sourceMappingURL=actor.d.ts.map