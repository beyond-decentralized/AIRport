import { QueryRelationType, QueryViewJoinRelation, Repository_GUID, Repository_LocalId } from "@airport/ground-control";
import { IFieldColumnAliases } from "../../../definition/core/entity/IAliases";
import { RawTreeQuery } from "../../../definition/query/facade/RawTreeQuery";
import { FieldColumnAliases } from "./aliases";
import { IQueryUtils } from "../../../definition/utils/IQueryUtils";
import { IFieldUtils } from "../../../definition/utils/IFieldUtils";
import { IQueryRelationManager } from "../../../definition/core/entity/IQueryRelationManager";
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

    getJoinRelationQuery(
        queryRelation: QueryViewJoinRelation,
        columnAliases: IFieldColumnAliases<any>,
        trackedRepoGUIDSet: Set<Repository_GUID>,
        trackedRepoLocalIdSet: Set<Repository_LocalId>,
        queryUtils: IQueryUtils,
        fieldUtils: IFieldUtils,
        queryRelationManager: IQueryRelationManager
    ): QueryViewJoinRelation {
        queryRelation = <QueryViewJoinRelation>super.getJoinRelationQuery(
            queryRelation, columnAliases,
            trackedRepoGUIDSet, trackedRepoLocalIdSet,
            queryUtils, fieldUtils, queryRelationManager)
        queryRelation.relationType = QueryRelationType.SUB_QUERY_JOIN_ON
        queryRelation.subQuery =
            // Removes circular dependency at code initialization time 
            (globalThis.IOC as InversionOfControl).getSync(
                globalThis.ENTITY_UTILS as IDependencyInjectionToken<IEntityUtils>
            ).getTreeQuery(
                this.subQuery, columnAliases.entityAliases)
                .toQuery(queryUtils, fieldUtils, queryRelationManager)

        return queryRelation
    }

    getRootRelationQuery(
        queryRelation: QueryViewJoinRelation,
        columnAliases: FieldColumnAliases,
        trackedRepoGUIDSet: Set<Repository_GUID>,
        trackedRepoLocalIdSet: Set<Repository_LocalId>,
        queryUtils: IQueryUtils,
        fieldUtils: IFieldUtils,
        queryRelationManager: IQueryRelationManager
    ): QueryViewJoinRelation {
        queryRelation = <QueryViewJoinRelation>super.getJoinRelationQuery(
            queryRelation, columnAliases,
            trackedRepoGUIDSet, trackedRepoLocalIdSet,
            queryUtils, fieldUtils, queryRelationManager)
        queryRelation.relationType = QueryRelationType.SUB_QUERY_ROOT
        queryRelation.subQuery =
            // Removes circular dependency at code initialization time 
            (globalThis.IOC as InversionOfControl).getSync(
                globalThis.ENTITY_UTILS as IDependencyInjectionToken<IEntityUtils>
            ).getTreeQuery(
                this.subQuery, columnAliases.entityAliases)
                .toQuery(queryUtils, fieldUtils, queryRelationManager)

        return queryRelation
    }

}
