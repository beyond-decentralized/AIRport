import { IEntityVDescriptor } from '@airport/airbridge-validate';
import { RepositoryVDescriptor } from './vrepository';
import { TypeVDescriptor } from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
export interface RepositoryTypeVDescriptor extends IEntityVDescriptor {
    repository?: RepositoryVDescriptor;
    type?: TypeVDescriptor;
}
//# sourceMappingURL=vrepositorytype.d.ts.map