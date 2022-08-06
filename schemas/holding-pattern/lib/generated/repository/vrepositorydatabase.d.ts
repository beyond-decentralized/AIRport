import { IEntityVDescriptor } from '@airbridge/validate';
import { RepositoryVDescriptor } from './vrepository';
import { Repository } from '../../ddl/repository/Repository';
import { DatabaseVDescriptor, Database } from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
export interface RepositoryDatabaseVDescriptor<T> extends IEntityVDescriptor<T> {
    repository?: RepositoryVDescriptor<Repository>;
    database?: DatabaseVDescriptor<Database>;
}
//# sourceMappingURL=vrepositorydatabase.d.ts.map