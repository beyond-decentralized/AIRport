import { IEntityVDescriptor } from '@airport/airbridge-validate';
import { RepositoryVDescriptor } from './vrepository';
import { ClientVDescriptor } from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
export interface RepositoryClientVDescriptor extends IEntityVDescriptor {
    repository?: RepositoryVDescriptor;
    client?: ClientVDescriptor;
}
//# sourceMappingURL=vrepositoryclient.d.ts.map