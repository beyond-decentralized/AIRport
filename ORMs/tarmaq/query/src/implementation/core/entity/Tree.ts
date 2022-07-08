import { extend, IOC } from "@airport/direction-indicator";
import { JSONRelationType, JSONViewJoinRelation } from "@airport/ground-control";
import { IFieldColumnAliases } from "../../../definition/core/entity/Aliases";
import { IQEntityDriver, IQEntityInternal } from "../../../definition/core/entity/Entity";
import { RawTreeQuery } from "../../../definition/query/facade/TreeQuery";
import { ENTITY_UTILS } from "../../../tokens";
import { FieldColumnAliases } from "./Aliases";
import { QEntity, QEntityDriver } from "./Entity";
import { IQueryUtils } from "../../../definition/utils/IQueryUtils";
import { IFieldUtils } from "../../../definition/utils/IFieldUtils";
import { IRelationManager } from "../../../definition/core/entity/IRelationManager";

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
