import { IDailyArchiveLog, IRepository } from '@airport/guideway';
export interface IDailyArchive {
    dailyArchiveLog: IDailyArchiveLog;
    repositoryData?: string;
    repository?: IRepository;
}
