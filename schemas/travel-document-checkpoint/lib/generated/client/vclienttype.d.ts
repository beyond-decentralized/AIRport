import { IEntityVDescriptor } from '@airbridge/validate';
import { ClientVDescriptor } from './vclient';
import { Client } from '../../ddl/client/Client';
import { TypeVDescriptor } from '../type/vtype';
import { Type } from '../../ddl/type/Type';
export interface ClientTypeVDescriptor<T> extends IEntityVDescriptor<T> {
    client?: ClientVDescriptor<Client>;
    type?: TypeVDescriptor<Type>;
}
//# sourceMappingURL=vclienttype.d.ts.map