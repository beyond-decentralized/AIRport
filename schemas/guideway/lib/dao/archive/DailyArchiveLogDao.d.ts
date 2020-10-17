import { DailyArchiveLogValues } from '../../ddl/ddl';
import { BaseDailyArchiveLogDao } from '../../generated/generated';
export interface IDailyArchiveLogDao {
    insertValues(dailyArchiveLogValues: DailyArchiveLogValues[]): Promise<number>;
}
export declare class DailyArchiveLogDao extends BaseDailyArchiveLogDao implements IDailyArchiveLogDao {
    insertValues(values: DailyArchiveLogValues[]): Promise<number>;
}
//# sourceMappingURL=DailyArchiveLogDao.d.ts.map