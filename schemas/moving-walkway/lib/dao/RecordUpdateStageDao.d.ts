import { IAirportDatabase, IUtils } from "@airport/air-control";
import { ColumnIndex, SchemaIndex, TableIndex } from "@airport/ground-control";
import { ActorId, RecordHistoryActorRecordId, RepositoryEntityActorRecordId, RepositoryId } from "@airport/holding-pattern";
import { SchemaEntityIndex } from "@airport/traffic-pattern";
import { BaseRecordUpdateStageDao, IBaseRecordUpdateStageDao } from "../generated/generated";
export declare type RecordUpdateStageValue = any;
export declare type RecordUpdateStageValues = [SchemaIndex, SchemaEntityIndex, RepositoryId, ActorId, RecordHistoryActorRecordId, ColumnIndex, RecordUpdateStageValue];
export interface IRecordUpdateStageDao extends IBaseRecordUpdateStageDao {
    insertValues(values: RecordUpdateStageValues[]): Promise<number>;
    updateEntityWhereIds(schemaIndex: SchemaIndex, tableIndex: TableIndex, idMap: Map<RepositoryId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>, updatedColumnIndexes: ColumnIndex[]): Promise<void>;
    delete(): Promise<number>;
}
export declare class RecordUpdateStageDao extends BaseRecordUpdateStageDao implements IRecordUpdateStageDao {
    private airportDb;
    insertValues(values: RecordUpdateStageValues[]): Promise<number>;
    constructor(airportDb: IAirportDatabase, utils: IUtils);
    updateEntityWhereIds(schemaIndex: SchemaIndex, tableIndex: TableIndex, idMap: Map<RepositoryId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>, updatedColumnIndexes: ColumnIndex[]): Promise<void>;
    delete(): Promise<number>;
}
