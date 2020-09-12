import { DbEntity, JSONBaseOperation } from '@airport/ground-control';
import { IQEntityInternal } from '../core/entity/Entity';
import { IQOperableFieldInternal } from '../core/field/OperableField';
export interface IQMetadataUtils {
    getAllColumns(qEntity: IQEntityInternal): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    getAllNonGeneratedColumns(qEntity: IQEntityInternal): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    getDbEntity<IQE extends IQEntityInternal>(qEntity: IQE): DbEntity;
}
//# sourceMappingURL=QMetadataUtils.d.ts.map