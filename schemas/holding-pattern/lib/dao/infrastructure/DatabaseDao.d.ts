import { IUtils } from "@airport/air-control/lib/lingo/utils/Utils";
import { DatabaseName, DatabaseSecondId, UserId } from "../../ddl/ddl";
import { BaseDatabaseDao, IBaseDatabaseDao, IDatabase } from "../../generated/generated";
export interface IDatabaseDao extends IBaseDatabaseDao {
    findMapByIds(ownerUniqueIds: UserId[], names: DatabaseName[], secondIds: DatabaseSecondId[]): Promise<Map<UserId, Map<DatabaseName, Map<DatabaseSecondId, IDatabase>>>>;
    findByIds(ownerIds: UserId[], names: DatabaseName[], secondIds: DatabaseSecondId[]): Promise<IDatabase[]>;
}
export declare class DatabaseDao extends BaseDatabaseDao implements IDatabaseDao {
    constructor(utils: IUtils);
    findMapByIds(ownerIds: UserId[], names: DatabaseName[], secondIds: DatabaseSecondId[]): Promise<Map<UserId, Map<DatabaseName, Map<DatabaseSecondId, IDatabase>>>>;
    findByIds(ownerIds: UserId[], names: DatabaseName[], secondIds: DatabaseSecondId[]): Promise<IDatabase[]>;
}
