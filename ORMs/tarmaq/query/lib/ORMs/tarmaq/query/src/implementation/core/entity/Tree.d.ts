import { JSONViewJoinRelation } from "@airport/ground-control";
import { IFieldColumnAliases } from "../../../definition/core/entity/Aliases";
import { IQEntityDriver, IQEntityInternal } from "../../../definition/core/entity/Entity";
import { RawTreeQuery } from "../../../definition/query/facade/TreeQuery";
import { FieldColumnAliases } from "./Aliases";
import { QEntityDriver } from "./Entity";
import { IQueryUtils } from "../../../definition/utils/IQueryUtils";
import { IFieldUtils } from "../../../definition/utils/IFieldUtils";
import { IRelationManager } from "../../../definition/core/entity/IRelationManager";
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