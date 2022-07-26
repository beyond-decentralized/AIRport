import { IEntityVDescriptor } from '@airport/airbridge-validate';
import { DatabaseVDescriptor } from './vdatabase';
import { TypeVDescriptor } from '../type/vtype';
export interface DatabaseTypeVDescriptor extends IEntityVDescriptor {
    database?: DatabaseVDescriptor;
    type?: TypeVDescriptor;
}
//# sourceMappingURL=vdatabasetype.d.ts.map