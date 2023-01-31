import {
	DbEntity,
	QueryBaseOperation
} from '@airport/ground-control'
import { IQEntityInternal, IQOperableFieldInternal } from '@airport/tarmaq-query'

export interface IQMetadataUtils {

	getAllColumns(
		qEntity: IQEntityInternal
	): IQOperableFieldInternal<any, QueryBaseOperation, any, any>[]

	getAllNonGeneratedColumns(
		qEntity: IQEntityInternal
	): IQOperableFieldInternal<any, QueryBaseOperation, any, any>[]

	getAllInsertableColumns(
		qEntity: IQEntityInternal
	): IQOperableFieldInternal<any, QueryBaseOperation, any, any>[]

	getDbEntity<IQE extends IQEntityInternal>(
		qEntity: IQE
	): DbEntity

}
