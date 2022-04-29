import {JSONBaseOperation}   from "@airport/ground-control";
import {IFieldColumnAliases} from "../core/entity/Aliases";
import {IFieldUtils}         from './FieldUtils'

export interface IQueryUtils {

	whereClauseToJSON(
		whereClause: JSONBaseOperation,
		columnAliases: IFieldColumnAliases<any>
	): JSONBaseOperation;

}
