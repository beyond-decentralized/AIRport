import { IRepository } from '../repository/repository';
import { ITerminalRepository } from '../terminal/terminalrepository';
import { ITerminal } from '../terminal/terminal';
import { IServer } from '../server/server';
import { ISyncLog } from './synclog';
export interface IAgtRepositoryTransactionBlock {
    id: number;
    archivingStatus?: number;
    addDatetime?: number;
    tmRepositoryTransactionBlockId?: number;
    contents?: string;
    repository?: IRepository;
    terminalRepositories?: ITerminalRepository[];
    terminal?: ITerminal;
    archivingServer?: IServer;
    syncLogs?: ISyncLog[];
}
