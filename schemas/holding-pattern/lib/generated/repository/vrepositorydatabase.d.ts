import { IEntityVDescriptor } from '@airport/airbridge-validate';
import { RepositoryVDescriptor } from './vrepository';
import { DatabaseVDescriptor } from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
export interface RepositoryDatabaseVDescriptor extends IEntityVDescriptor {
    repository?: RepositoryVDescriptor;
    database?: DatabaseVDescriptor;
}
//# sourceMappingURL=vrepositorydatabase.d.ts.map