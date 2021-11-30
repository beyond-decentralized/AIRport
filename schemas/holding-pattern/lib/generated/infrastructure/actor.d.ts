import { IUser, ITerminal } from '@airport/travel-document-checkpoint';
import { ISchema } from '@airport/airspace';
import { IRepositoryActor } from '../repository/repositoryactor';
export interface IActor {
    id: number;
    uuId?: string;
    user?: IUser;
    terminal?: ITerminal;
    schema?: ISchema;
    repositoryActors?: IRepositoryActor[];
}
//# sourceMappingURL=actor.d.ts.map