import { IOC } from "@airport/direction-indicator";
import { JSONRelationType, JSONViewJoinRelation } from "@airport/ground-control";
import { IFieldColumnAliases } from "../../../lingo/core/entity/Aliases";
import { IQEntityDriver, IQEntityInternal } from "../../../lingo/core/entity/Entity";
import { RawTreeQuery } from "../../../lingo/query/facade/TreeQuery";
import { IFieldUtils } from "../../../lingo/utils/FieldUtils";
import { IQueryUtils } from "../../../lingo/utils/QueryUtils";
import { ENTITY_UTILS } from "../../../core-tokens";
import { extend } from "../../utils/qApplicationBuilderUtils";
import { FieldColumnAliases } from "./Aliases";
import { QEntity, QEntityDriver } from "./Entity";
import type { IRelationManager } from "./RelationManager";

export function QTree(
    fromClausePosition: number[] = [],
    subQuery: RawTreeQuery<any>
) {
    (<any>QTree).base.constructor.call(this, null, fromClausePosition, null, null, QTreeDriver)
    this.__driver__.subQuery = subQuery
}
const qTreeMethods = {
    /*
    yourMethodName: function() {},
    */
}

extend(QEntity, QTree, qTreeMethods)

export interface IQTreeDriver
    extends IQEntityDriver {

    subQuery: RawTreeQuery<any>;

}

export class QTreeDriver
    extends QEntityDriver
    implements IQTreeDriver {

    subQuery: RawTreeQuery<any>

    getInstance(): IQEntityInternal {
        let instance = super.getInstance();
        (<IQTreeDriver>instance.__driver__)
            .subQuery = this.subQuery

        return instance
    }

    // getRelationPropertyName(): string {
    // 	throw new Error(`not implemented`);
    // }

    getJoinRelationJson(
        jsonRelation: JSONViewJoinRelation,
        columnAliases: IFieldColumnAliases<any>,
        queryUtils: IQueryUtils,
        fieldUtils: IFieldUtils,
        relationManager: IRelationManager
    ): JSONViewJoinRelation {
        jsonRelation = <JSONViewJoinRelation>super.getJoinRelationJson(
            jsonRelation, columnAliases,
            queryUtils, fieldUtils, relationManager)
        jsonRelation.rt = JSONRelationType.SUB_QUERY_JOIN_ON
        jsonRelation.subQuery =
            // Removes circular dependency at code initialization time 
            IOC.getSync(ENTITY_UTILS).getTreeQuery(
                this.subQuery, columnAliases.entityAliases)
                .toJSON(queryUtils, fieldUtils, relationManager)

        return jsonRelation
    }

    getRootRelationJson(
        jsonRelation: JSONViewJoinRelation,
        columnAliases: FieldColumnAliases,
        queryUtils: IQueryUtils,
        fieldUtils: IFieldUtils,
        relationManager: IRelationManager
    ): JSONViewJoinRelation {
        jsonRelation = <JSONViewJoinRelation>super.getJoinRelationJson(
            jsonRelation, columnAliases,
            queryUtils, fieldUtils, relationManager)
        jsonRelation.rt = JSONRelationType.SUB_QUERY_ROOT
        jsonRelation.subQuery =
            // Removes circular dependency at code initialization time 
            IOC.getSync(ENTITY_UTILS).getTreeQuery(
                this.subQuery, columnAliases.entityAliases)
                .toJSON(queryUtils, fieldUtils, relationManager)

        return jsonRelation
    }

}
