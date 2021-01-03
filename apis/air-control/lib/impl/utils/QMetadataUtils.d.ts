import { DbEntity, JSONBaseOperation } from '@airport/ground-control';
import { IAirportDatabase } from '../../lingo/AirportDatabase';
import { IQEntityInternal } from '../../lingo/core/entity/Entity';
import { IQOperableFieldInternal } from '../../lingo/core/field/OperableField';
import { IQMetadataUtils } from '../../lingo/utils/QMetadataUtils';
export declare class QMetadataUtils implements IQMetadataUtils {
    getAllColumns(qEntity: IQEntityInternal<any>): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    getAllNonGeneratedColumns(qEntity: IQEntityInternal<any>): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    getDbEntity<IQE extends IQEntityInternal<any>>(qEntity: IQE): DbEntity;
    getNewEntity(qEntity: IQEntityInternal<any>, airDb: IAirportDatabase): any;
}
//# sourceMappingURL=QMetadataUtils.d.ts.map