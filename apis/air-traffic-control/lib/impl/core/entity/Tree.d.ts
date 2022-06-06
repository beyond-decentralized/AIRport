import { JSONViewJoinRelation } from "@airport/ground-control";
import { IFieldColumnAliases } from "../../../lingo/core/entity/Aliases";
import { IQEntityDriver, IQEntityInternal } from "../../../lingo/core/entity/Entity";
import { RawTreeQuery } from "../../../lingo/query/facade/TreeQuery";
import { IFieldUtils } from "../../../lingo/utils/FieldUtils";
import { IQueryUtils } from "../../../lingo/utils/QueryUtils";
import { FieldColumnAliases } from "./Aliases";
import { QEntityDriver } from "./Entity";
import type { IRelationManager } from "./RelationManager";
export declare function QTree(fromClausePosition: number[], subQuery: RawTreeQuery<any>): void;
export interface IQTreeDriver extends IQEntityDriver {
    subQuery: RawTreeQuery<any>;
}
export declare class QTreeDriver extends QEntityDriver implements IQTreeDriver {
    subQuery: RawTreeQuery<any>;
    getInstance(): IQEntityInternal;
    getJoinRelationJson(jsonRelation: JSONViewJoinRelation, columnAliases: IFieldColumnAliases<any>, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JSONViewJoinRelation;
    getRootRelationJson(jsonRelation: JSONViewJoinRelation, columnAliases: FieldColumnAliases, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JSONViewJoinRelation;
}
//# sourceMappingURL=Tree.d.ts.map