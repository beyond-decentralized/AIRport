import { IEntityVDescriptor } from '@airport/airbridge-validate';
import { ClientVDescriptor } from './vclient';
import { TypeVDescriptor } from '../type/vtype';
export interface ClientTypeVDescriptor extends IEntityVDescriptor {
    client?: ClientVDescriptor;
    type?: TypeVDescriptor;
}
//# sourceMappingURL=vclienttype.d.ts.map