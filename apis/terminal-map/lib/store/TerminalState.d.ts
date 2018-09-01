import { IDomain } from '@airport/territory';
import { ISchema } from '@airport/traffic-pattern';
import { ITerminal } from '@airport/travel-document-checkpoint';
export interface ITerminalState {
    terminal: ITerminal;
    domains: IDomain[];
    schemas: ISchema[];
}
