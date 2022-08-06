import { IEntityVDescriptor } from '@airbridge/validate';
import { TerminalVDescriptor } from './vterminal';
import { Terminal } from '../../ddl/terminal/Terminal';
import { TypeVDescriptor } from '../type/vtype';
import { Type } from '../../ddl/type/Type';
export interface TerminalTypeVDescriptor<T> extends IEntityVDescriptor<T> {
    terminal?: TerminalVDescriptor<Terminal>;
    type?: TypeVDescriptor<Type>;
}
//# sourceMappingURL=vterminaltype.d.ts.map