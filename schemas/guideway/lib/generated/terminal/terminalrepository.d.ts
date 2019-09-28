import { ITerminal } from './terminal';
import { IRepository } from '../repository/repository';
export interface ITerminalRepository {
    terminal: ITerminal;
    repository: IRepository;
    permission?: number;
}
