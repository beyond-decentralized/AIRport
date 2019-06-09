import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema, EntityId } from '@airport/ground-control';
import { QAgt } from './qagt';
import { QTerminal } from './qterminal';
import { QTerminalAgt } from './qterminalagt';
import { QUser } from './quser';
import { QUserTerminal } from './quserterminal';
import { QUserTerminalAgt } from './quserterminalagt';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    Agt: QAgt;
    Terminal: QTerminal;
    TerminalAgt: QTerminalAgt;
    User: QUser;
    UserTerminal: QUserTerminal;
    UserTerminalAgt: QUserTerminalAgt;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
export declare function diSet(dbEntityId: EntityId): boolean;
