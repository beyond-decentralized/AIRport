import { IRepository } from '../repository/repository';
import { IUser } from './user';
export interface IUserRepository {
    repository: IRepository;
    user: IUser;
    permission?: string;
}
//# sourceMappingURL=userrepository.d.ts.map