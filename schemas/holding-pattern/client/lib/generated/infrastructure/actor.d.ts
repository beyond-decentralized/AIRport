import { IUser, ITerminal } from '@airport/travel-document-checkpoint-runtime';
import { IApplication } from '@airport/airspace';
export interface IActor {
    id: number;
    uuId?: string;
    user?: IUser;
    terminal?: ITerminal;
    application?: IApplication;
}
//# sourceMappingURL=actor.d.ts.map