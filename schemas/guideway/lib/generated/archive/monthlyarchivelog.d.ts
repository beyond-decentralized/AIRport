import { IRepository } from '../repository/repository';
export interface IMonthlyArchiveLog {
    monthNumber: number;
    repository: IRepository;
    numberOfChanges?: number;
    daysWithChanges?: any;
}
//# sourceMappingURL=monthlyarchivelog.d.ts.map