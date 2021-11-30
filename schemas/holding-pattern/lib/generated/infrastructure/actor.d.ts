import { IUser, ITerminal } from '@airport/travel-document-checkpoint';
import { ISchema } from '@airport/airspace';
export interface IActor {
    id: number;
    uuId?: string;
    user?: IUser;
    terminal?: ITerminal;
    schema?: ISchema;
}
//# sourceMappingURL=actor.d.ts.map