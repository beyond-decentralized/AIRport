import { IUser, ITerminal } from '@airport/travel-document-checkpoint';
import { IActorApplication } from './actorapplication';
import { IRepositoryActor } from '../repository/repositoryactor';
export interface IActor {
    id: number;
    uuId?: string;
    user?: IUser;
    terminal?: ITerminal;
    actorApplications?: IActorApplication[];
    repositoryActor?: IRepositoryActor[];
}
//# sourceMappingURL=actor.d.ts.map