import { DbEntity, JSONBaseOperation } from '@airport/ground-control';
import { IQEntityInternal, IQOperableFieldInternal } from '@airport/tarmaq-query';
export interface IQMetadataUtils {
    getAllColumns(qEntity: IQEntityInternal): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    getAllNonGeneratedColumns(qEntity: IQEntityInternal): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    getAllInsertableColumns(qEntity: IQEntityInternal): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
    getDbEntity<IQE extends IQEntityInternal>(qEntity: IQE): DbEntity;
}
//# sourceMappingURL=IQMetadataUtils.d.ts.map