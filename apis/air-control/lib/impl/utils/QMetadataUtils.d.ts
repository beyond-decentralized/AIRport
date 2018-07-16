import { DbEntity, JSONBaseOperation } from "@airport/ground-control";
import { IAirportDatabase } from "../../lingo/AirportDatabase";
import { IQEntityInternal } from "../../lingo/core/entity/Entity";
import { IQOperableFieldInternal } from "../../lingo/core/field/OperableField";
import { IQMetadataUtils } from "../../lingo/utils/QMetadataUtils";
import { IUtils } from "../../lingo/utils/Utils";
export declare class QMetadataUtils implements IQMetadataUtils {
    private airportDb;
    private utils;
    constructor(airportDb: IAirportDatabase, utils: IUtils);
    getAllColumns(qEntity: IQEntityInternal): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    getDbEntity<IQE extends IQEntityInternal>(qEntity: IQE): DbEntity;
    getNewEntity(qEntity: IQEntityInternal): any;
}
