import { IEntityVDescriptor } from '@airport/airbridge-validate';
import { ApplicationVDescriptor } from '@airport/airspace';
import { RepositoryVDescriptor } from './vrepository';
export interface RepositoryApplicationVDescriptor extends IEntityVDescriptor {
    application?: ApplicationVDescriptor;
    repository?: RepositoryVDescriptor;
}
//# sourceMappingURL=vrepositoryapplication.d.ts.map