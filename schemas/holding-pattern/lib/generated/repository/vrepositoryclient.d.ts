import { IEntityVDescriptor } from '@airbridge/validate';
import { RepositoryVDescriptor } from './vrepository';
import { Repository } from '../../ddl/repository/Repository';
import { ClientVDescriptor, Client } from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
export interface RepositoryClientVDescriptor<T> extends IEntityVDescriptor<T> {
    repository?: RepositoryVDescriptor<Repository>;
    client?: ClientVDescriptor<Client>;
}
//# sourceMappingURL=vrepositoryclient.d.ts.map