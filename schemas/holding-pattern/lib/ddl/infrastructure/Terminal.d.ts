import { IUser } from '../../generated/infrastructure/quser';
import { TerminalAgt } from './TerminalAgt';
import { TerminalName, TerminalSecondId } from '@airport/arrivals-n-departures';
export declare type TmTerminalId = number;
export declare type TerminalIsLocal = boolean;
export declare class Terminal {
    id: TmTerminalId;
    name: TerminalName;
    secondId: TerminalSecondId;
    owner: IUser;
    isLocal: TerminalIsLocal;
    terminalAgts: TerminalAgt[];
}
