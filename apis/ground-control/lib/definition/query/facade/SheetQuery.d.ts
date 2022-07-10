import { JsonNonEntityQuery } from './NonEntityQuery';
import { JSONClauseField } from "../../core/field/JSONClause";
/**
 * Sheet queries are serialized in this format.
 */
export interface JsonSheetQuery extends JsonNonEntityQuery {
    /**
     * SELECT
     */
    S: JSONClauseField[];
}
//# sourceMappingURL=SheetQuery.d.ts.map