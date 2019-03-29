import { IUser } from '@airport/travel-document-checkpoint';
import { RepositoryEntity } from '../repository/RepositoryEntity';
export declare abstract class ServerImmutableRepositoryEntity extends RepositoryEntity {
    user: IUser;
    createdAt: Date;
}
