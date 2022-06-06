var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected, IOC } from '@airport/direction-indicator';
import { OperationCategory, SqlOperator } from '@airport/ground-control';
import { QOperableField } from '../core/field/OperableField';
import { wrapPrimitive } from '../core/field/WrapperFunctions';
import { and } from '../core/operation/LogicalOperation';
import { ENTITY_UTILS } from '../../core-tokens';
let QueryUtils = class QueryUtils {
    equals(entityOrIdOrUuId, toObject) {
        if (!entityOrIdOrUuId) {
            throw new Error(`null entity/Id/UuId is passed into equals method`);
        }
        let entityId;
        let entityUuId;
        let entityOrId = entityOrIdOrUuId;
        if (typeof entityOrIdOrUuId === 'string') {
            if (entityOrIdOrUuId.split('-').length == 3) {
                entityId = this.repositoryEntityUtils.parseId(entityOrIdOrUuId);
            }
            else {
                entityUuId = this.repositoryEntityUtils.parseId(entityOrIdOrUuId);
            }
        }
        else if (entityOrId.repository.uuId
            && entityOrId.actor.uuId) {
            entityUuId = entityOrIdOrUuId;
        }
        else {
            entityId = entityOrIdOrUuId;
        }
        if (entityId) {
            return and(toObject.repository.id.equals(entityId.repository.id), toObject.actor.id.equals(entityId.actor.id), toObject.actorRecordId.equals(entityId.actorRecordId));
        }
        else {
            return and(toObject.repository.id.equals(entityUuId.repository.uuId), toObject.actor.id.equals(entityUuId.actor.uuId), toObject.actorRecordId.equals(entityUuId.actorRecordId));
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
                // All Non logical or exists operations are value operations (eq, isNull, like,
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
], QueryUtils.prototype, "fieldUtils", void 0);
__decorate([
    Inject()
], QueryUtils.prototype, "relationManager", void 0);
__decorate([
    Inject()
], QueryUtils.prototype, "repositoryEntityUtils", void 0);
QueryUtils = __decorate([
    Injected()
], QueryUtils);
export { QueryUtils };
//# sourceMappingURL=QueryUtils.js.map