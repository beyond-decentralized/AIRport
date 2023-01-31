import { QueryField, Repository_GUID, Repository_LocalId } from "@airport/ground-control";
import { IEntityAliases } from "../core/entity/IAliases";
import { IQOrderableField } from "../core/field/IQFieldInternal";
import { RawFieldQuery } from "../query/facade/RawFieldQuery";
import { IQueryUtils } from './IQueryUtils'

export interface IFieldUtils {

	getFieldQueryJson<IQF extends IQOrderableField<IQF>>(
		fieldSubQuery: RawFieldQuery<IQF>,
		entityAliases: IEntityAliases,
		trackedRepoGUIDSet: Set<Repository_GUID>,
		trackedRepoLocalIdSet: Set<Repository_LocalId>,
		queryUtils: IQueryUtils
	): QueryField;

}
