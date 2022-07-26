import { IEntityVDescriptor } from '@airport/airbridge-validate';
import { TerminalVDescriptor } from './vterminal';
import { TypeVDescriptor } from '../type/vtype';
export interface TerminalTypeVDescriptor extends IEntityVDescriptor {
    terminal?: TerminalVDescriptor;
    type?: TypeVDescriptor;
}
//# sourceMappingURL=vterminaltype.d.ts.map