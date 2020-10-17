import { IRepository } from '../repository/repository';
import { IUser } from './user';
export interface IUserRepository {
    repository: IRepository;
    user: IUser;
    permission?: number;
}
//# sourceMappingURL=userrepository.d.ts.map