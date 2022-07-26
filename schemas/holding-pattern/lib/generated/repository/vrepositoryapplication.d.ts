import { IEntityVDescriptor } from '@airport/airbridge-validate';
import { ApplicationVDescriptor, Application } from '@airport/airspace';
import { RepositoryVDescriptor } from './vrepository';
import { Repository } from '../../ddl/repository/Repository';
export interface RepositoryApplicationVDescriptor<T> extends IEntityVDescriptor<T> {
    application?: ApplicationVDescriptor<Application>;
    repository?: RepositoryVDescriptor<Repository>;
}
//# sourceMappingURL=vrepositoryapplication.d.ts.map