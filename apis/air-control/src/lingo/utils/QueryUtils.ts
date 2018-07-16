import {JSONBaseOperation}   from "@airport/ground-control";
import {IFieldColumnAliases} from "../core/entity/Aliases";

export interface IQueryUtils {

	whereClauseToJSON(
		whereClause: JSONBaseOperation,
		columnAliases: IFieldColumnAliases<any>
	): JSONBaseOperation;

}
