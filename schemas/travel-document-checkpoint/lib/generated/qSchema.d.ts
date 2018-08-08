import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { QAgt } from './qagt';
import { QTerminal } from './qterminal';
import { QTerminalAgt } from './qterminalagt';
import { QUser } from './quser';
import { QUserTerminal } from './quserterminal';
import { QUserTerminalAgt } from './quserterminalagt';
import { IBaseAgtDmo, IBaseTerminalDmo, IBaseTerminalAgtDmo, IBaseUserDmo, IBaseUserTerminalDmo, IBaseUserTerminalAgtDmo } from './baseDmos';
import { IBaseAgtDao, IBaseTerminalDao, IBaseTerminalAgtDao, IBaseUserDao, IBaseUserTerminalDao, IBaseUserTerminalAgtDao } from './baseDaos';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    dmo: {
        Agt: IBaseAgtDmo;
        Terminal: IBaseTerminalDmo;
        TerminalAgt: IBaseTerminalAgtDmo;
        User: IBaseUserDmo;
        UserTerminal: IBaseUserTerminalDmo;
        UserTerminalAgt: IBaseUserTerminalAgtDmo;
    };
    dao: {
        Agt: IBaseAgtDao;
        Terminal: IBaseTerminalDao;
        TerminalAgt: IBaseTerminalAgtDao;
        User: IBaseUserDao;
        UserTerminal: IBaseUserTerminalDao;
        UserTerminalAgt: IBaseUserTerminalAgtDao;
    };
    Agt: QAgt;
    Terminal: QTerminal;
    TerminalAgt: QTerminalAgt;
    User: QUser;
    UserTerminal: QUserTerminal;
    UserTerminalAgt: QUserTerminalAgt;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
