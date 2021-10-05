import { IUser, ITerminal } from '@airport/travel-document-checkpoint';
import { IApplication } from '@airport/territory';
import { IRepositoryActor } from '../repository/repositoryactor';
export interface IActor {
    id: number;
    uuId?: string;
    user?: IUser;
    terminal?: ITerminal;
    application?: IApplication;
    repositoryActor?: IRepositoryActor[];
}
//# sourceMappingURL=actor.d.ts.map