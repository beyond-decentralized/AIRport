import { IEntityVDescriptor } from '@airport/airbridge-validate';
import { DatabaseVDescriptor } from './vdatabase';
import { Database } from '../../ddl/database/Database';
import { TypeVDescriptor } from '../type/vtype';
import { Type } from '../../ddl/type/Type';
export interface DatabaseTypeVDescriptor<T> extends IEntityVDescriptor<T> {
    database?: DatabaseVDescriptor<Database>;
    type?: TypeVDescriptor<Type>;
}
//# sourceMappingURL=vdatabasetype.d.ts.map