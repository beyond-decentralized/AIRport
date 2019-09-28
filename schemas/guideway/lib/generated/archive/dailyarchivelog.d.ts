import { IRepository } from '../repository/repository';
export interface IDailyArchiveLog {
    dateNumber: number;
    repository: IRepository;
    numberOfChanges?: number;
}
