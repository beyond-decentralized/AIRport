var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected, IOC } from '@airport/direction-indicator';
import { OperationCategory, SqlOperator } from '@airport/ground-control';
import { AND, ENTITY_UTILS, OR, QEntity, QOperableField, wrapPrimitive } from '@airport/tarmaq-query';
let QueryUtils = class QueryUtils {
    equals(entityOrId, toObject // | IQRelation<IQ>
    ) {
        if (!entityOrId) {
            throw new Error(`null entity/Id is passed into 'equals' method`);
        }
        const { qActor, qRepository } = this.entityUtils.ensureRepositoryAndActorJoin(toObject);
        if (entityOrId instanceof QEntity) {
            const relationIdEntities = this.entityUtils
                .ensureRepositoryAndActorJoin(entityOrId);
            return AND(qRepository.GUID.equals(relationIdEntities.qRepository.repository.GUID), qActor.GUID.equals(relationIdEntities.qActor.actor.GUID), toObject._actorRecordId.equals(entityOrId._actorRecordId));
        }
        else {
            let entityId = this.validateEntityId(entityOrId);
            return AND(qRepository.GUID.equals(entityId.repository.GUID), qActor.GUID.equals(entityId.actor.GUID), toObject._actorRecordId.equals(entityId._actorRecordId));
        }
    }
    in(entitiesOrIds, toObject // | IQRelation<IQ>
    ) {
        if (!entitiesOrIds || !entitiesOrIds.length) {
            throw new Error(`null entity/Id array is passed into 'in' method`);
        }
        let entityIds = entitiesOrIds.map(entityOrId => this.validateEntityId(entityOrId));
        const { qActor, qRepository } = this.entityUtils.ensureRepositoryAndActorJoin(toObject);
        const equalOperations = [];
        for (const entityId of entityIds) {
            equalOperations.push(AND(qRepository.GUID.equals(entityId.repository.GUID), qActor.GUID.equals(entityId.actor.GUID), toObject._actorRecordId.equals(entityId._actorRecordId)));
        }
        return OR(...equalOperations);
    }
    validateEntityId(entityId) {
        if (typeof entityId === 'string') {
            return this.airEntityUtils.parseEGUID(entityId);
        }
        else {
            if (!entityId.repository
                || !entityId.repository.GUID
                || typeof entityId.repository.GUID !== 'string'
                || !entityId.actor
                || !entityId.actor.GUID
                || typeof entityId.actor.GUID !== 'number'
                || !entityId._actorRecordId
                || typeof entityId._actorRecordId !== 'number') {
                throw new Error(`Passed in AirEntity does not have
				the necessary fields to query by id.  Expecting:
					interface AnInterface extends AirEntity {
						repository: {
							GUID: string
						},
						actor: {
							GUID: string
						},
						_actorRecordId: number
					}
					`);
            }
            return entityId;
        }
    }
    whereClauseToJSON(whereClause, columnAliases) {
        if (!whereClause) {
            return null;
        }
        let operation = whereClause;
        let jsonOperation = {
            c: operation.c,
            o: operation.o
        };
        switch (operation.c) {
            case OperationCategory.LOGICAL:
                let logicalOperation = operation;
                let jsonLogicalOperation = jsonOperation;
                switch (operation.o) {
                    case SqlOperator.NOT:
                        jsonLogicalOperation.v = this.whereClauseToJSON(logicalOperation.v, columnAliases);
                        break;
                    case SqlOperator.AND:
                    case SqlOperator.OR:
                        jsonLogicalOperation.v = logicalOperation.v.map((value) => this.whereClauseToJSON(value, columnAliases));
                        break;
                    default:
                        throw new Error(`Unsupported logical operation '${operation.o}'`);
                }
                break;
            case OperationCategory.FUNCTION:
                // TODO: verify that cast of Q object is valid
                let functionOperation = operation;
                let query = functionOperation.getQuery();
                let jsonQuery = IOC.getSync(ENTITY_UTILS).getTreeQuery(query, columnAliases.entityAliases).toJSON(this, this.fieldUtils, this.relationManager);
                jsonOperation = functionOperation.toJSON(jsonQuery);
                break;
            case OperationCategory.BOOLEAN:
            case OperationCategory.DATE:
            case OperationCategory.NUMBER:
            case OperationCategory.STRING:
            case OperationCategory.UNTYPED:
                let valueOperation = operation;
                // All Non logical or exists operations are value operations (equals, IS_NULL, LIKE,
                // etc.)
                let jsonValueOperation = jsonOperation;
                jsonValueOperation.l = this.convertLRValue(valueOperation.l, columnAliases);
                let rValue = valueOperation.r;
                if (rValue instanceof Array) {
                    jsonValueOperation.r = rValue.map((anRValue) => {
                        return this.convertLRValue(anRValue, columnAliases);
                    });
                }
                else {
                    jsonValueOperation.r = this.convertLRValue(rValue, columnAliases);
                }
                break;
        }
        return jsonOperation;
    }
    convertLRValue(value, columnAliases) {
        value = wrapPrimitive(value);
        switch (typeof value) {
            case 'undefined':
                throw new Error(`'undefined' is not a valid L or R value`);
            default:
                if (value instanceof QOperableField) {
                    return value.toJSON(columnAliases, false, this, this.fieldUtils, this.relationManager);
                } // Must be a Field Query
                else {
                    let rawFieldQuery = value;
                    return this.fieldUtils.getFieldQueryJson(rawFieldQuery, columnAliases.entityAliases, this);
                }
        }
    }
};
__decorate([
    Inject()
], QueryUtils.prototype, "entityUtils", void 0);
__decorate([
    Inject()
], QueryUtils.prototype, "fieldUtils", void 0);
__decorate([
    Inject()
], QueryUtils.prototype, "relationManager", void 0);
__decorate([
    Inject()
], QueryUtils.prototype, "airEntityUtils", void 0);
QueryUtils = __decorate([
    Injected()
], QueryUtils);
export { QueryUtils };
//# sourceMappingURL=QueryUtils.js.map