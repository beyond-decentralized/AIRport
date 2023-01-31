import { JSONRelationType, JSONViewJoinRelation, Repository_GUID, Repository_LocalId } from "@airport/ground-control";
import { IFieldColumnAliases } from "../../../definition/core/entity/Aliases";
import { RawTreeQuery } from "../../../definition/query/facade/TreeQuery";
import { FieldColumnAliases } from "./Aliases";
import { IQueryUtils } from "../../../definition/utils/IQueryUtils";
import { IFieldUtils } from "../../../definition/utils/IFieldUtils";
import { IRelationManager } from "../../../definition/core/entity/IRelationManager";
import { QEntityDriver } from "./QEntityDriver";
import { IDependencyInjectionToken, InversionOfControl } from "@airport/direction-indicator";
import { IEntityUtils } from "../../../definition/utils/IEntityUtils";
import { IQEntityDriver, IQEntityInternal } from "../../../definition/core/entity/IQEntityDriver";
import { QEntity } from "./QEntity";

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

globalThis.extend(QEntity, QTree, qTreeMethods)

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
        trackedRepoGUIDSet: Set<Repository_GUID>,
        trackedRepoLocalIdSet: Set<Repository_LocalId>,
        queryUtils: IQueryUtils,
        fieldUtils: IFieldUtils,
        relationManager: IRelationManager
    ): JSONViewJoinRelation {
        jsonRelation = <JSONViewJoinRelation>super.getJoinRelationJson(
            jsonRelation, columnAliases,
            trackedRepoGUIDSet, trackedRepoLocalIdSet,
            queryUtils, fieldUtils, relationManager)
        jsonRelation.rt = JSONRelationType.SUB_QUERY_JOIN_ON
        jsonRelation.subQuery =
            // Removes circular dependency at code initialization time 
            (globalThis.IOC as InversionOfControl).getSync(
                globalThis.ENTITY_UTILS as IDependencyInjectionToken<IEntityUtils>
            ).getTreeQuery(
                this.subQuery, columnAliases.entityAliases)
                .toJSON(queryUtils, fieldUtils, relationManager)

        return jsonRelation
    }

    getRootRelationJson(
        jsonRelation: JSONViewJoinRelation,
        columnAliases: FieldColumnAliases,
        trackedRepoGUIDSet: Set<Repository_GUID>,
        trackedRepoLocalIdSet: Set<Repository_LocalId>,
        queryUtils: IQueryUtils,
        fieldUtils: IFieldUtils,
        relationManager: IRelationManager
    ): JSONViewJoinRelation {
        jsonRelation = <JSONViewJoinRelation>super.getJoinRelationJson(
            jsonRelation, columnAliases,
            trackedRepoGUIDSet, trackedRepoLocalIdSet,
            queryUtils, fieldUtils, relationManager)
        jsonRelation.rt = JSONRelationType.SUB_QUERY_ROOT
        jsonRelation.subQuery =
            // Removes circular dependency at code initialization time 
            (globalThis.IOC as InversionOfControl).getSync(
                globalThis.ENTITY_UTILS as IDependencyInjectionToken<IEntityUtils>
            ).getTreeQuery(
                this.subQuery, columnAliases.entityAliases)
                .toJSON(queryUtils, fieldUtils, relationManager)

        return jsonRelation
    }

}
