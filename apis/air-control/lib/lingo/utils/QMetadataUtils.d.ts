import { DbEntity, JSONBaseOperation } from '@airport/ground-control';
import { IQEntityInternal } from '../core/entity/Entity';
import { IQOperableFieldInternal } from '../core/field/OperableField';
export interface IQMetadataUtils {
    getAllColumns(qEntity: IQEntityInternal<any>): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    getAllNonGeneratedColumns(qEntity: IQEntityInternal<any>): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    getAllInsertableColumns(qEntity: IQEntityInternal<any>): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    getDbEntity<IQE extends IQEntityInternal<any>>(qEntity: IQE): DbEntity;
}
//# sourceMappingURL=QMetadataUtils.d.ts.map