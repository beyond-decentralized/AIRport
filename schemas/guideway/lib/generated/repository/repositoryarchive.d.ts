import { IRepository } from './repository';
import { IArchive } from './archive';
export interface IRepositoryArchive {
    repository: IRepository;
    archive: IArchive;
}
