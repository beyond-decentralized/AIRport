import { IEntityVDescriptor } from '@airbridge/validate';
import { RepositoryVDescriptor } from './vrepository';
import { Repository } from '../../ddl/repository/Repository';
import { TypeVDescriptor, Type } from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
export interface RepositoryTypeVDescriptor<T> extends IEntityVDescriptor<T> {
    repository?: RepositoryVDescriptor<Repository>;
    type?: TypeVDescriptor<Type>;
}
//# sourceMappingURL=vrepositorytype.d.ts.map