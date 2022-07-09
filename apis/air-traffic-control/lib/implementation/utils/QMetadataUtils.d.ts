import { DbEntity, JSONBaseOperation } from '@airport/ground-control';
import { IQEntityInternal, IQOperableFieldInternal } from '@airport/tarmaq-query';
import { IAirportDatabase } from '../../definition/AirportDatabase';
import { IQMetadataUtils } from '../../definition/utils/IQMetadataUtils';
export declare class QMetadataUtils implements IQMetadataUtils {
    getAllColumns(qEntity: IQEntityInternal): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    getAllNonGeneratedColumns(qEntity: IQEntityInternal): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    getAllInsertableColumns(qEntity: IQEntityInternal): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    getDbEntity<IQE extends IQEntityInternal>(qEntity: IQE): DbEntity;
    getNewEntity(qEntity: IQEntityInternal, airDb: IAirportDatabase): any;
}
//# sourceMappingURL=QMetadataUtils.d.ts.map