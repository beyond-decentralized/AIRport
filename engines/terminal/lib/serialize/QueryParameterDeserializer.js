var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
import { SQLDataType } from "@airport/ground-control";
// TODO: figure out if this is needed - originally written for deserializing
// Client-side query parameters.  Since then moved to Isolates and generic
// API calls.  Probably should be used in go-tower to deserialize all of the
// method argiments passed it (and won't be tied to a query of any kind, API
// interface is generic, unless already known to contain entity objects.)
let QueryParameterDeserializer = class QueryParameterDeserializer {
    deserialize(parameters, query, entityStateManager) {
        if (parameters.length !== query.jsonQuery.parameters.length) {
            throw new Error(`Wrong number of parameters for ${query.dbEntity.name}.${query.jsonQuery.queryName}
            Received:  ${parameters.length}
            Expecting: ${query.jsonQuery.parameters.length}
            `);
        }
        const deserializedParameters = [];
        for (let i = 0; i < parameters.length; i++) {
            const deserializedParameter = this.deserializeParameter(parameters[i], query.jsonQuery.parameters[i], i + 1, query, entityStateManager);
            deserializedParameters.push(deserializedParameter);
        }
        return deserializedParameters;
    }
    deserializeParameter(parameter, jsonQueryParameter, parameterIndex, query, entityStateManager) {
        switch (jsonQueryParameter.type) {
            case SQLDataType.BOOLEAN:
                this.checkTypeOfParameter(parameter, 'boolean', parameterIndex, query);
                break;
            case SQLDataType.DATE:
                if (!(parameter instanceof Object)
                    || parameter[entityStateManager.getStateFieldName()] !== EntityState.RESULT_DATE
                    || !parameter.value) {
                    throw new Error(`Invalid Serialized Date format for:
                    ${query.dbEntity.name}.${query.jsonQuery.queryName}
                    parameter #: ${parameterIndex}
        got: ${JSON.stringify(parameter)}
                    `);
                }
                try {
                    return new Date(parameter);
                }
                catch (e) {
                    throw new Error(`Invalid Serialized Date format for:
                    ${query.dbEntity.name}.${query.jsonQuery.queryName}
                    parameter #: ${parameterIndex}
        got: ${JSON.stringify(parameter)}
                    `);
                }
                break;
            case SQLDataType.NUMBER:
                this.checkTypeOfParameter(parameter, 'number', parameterIndex, query);
                break;
            case SQLDataType.STRING:
                this.checkTypeOfParameter(parameter, 'string', parameterIndex, query);
                break;
            default:
                throw new Error(`Unsupported parameter type for:
                ${query.dbEntity.name}.${query.jsonQuery.queryName}
                parameter #: ${parameterIndex}
    got: ${jsonQueryParameter.type}
                `);
        }
        return parameter;
    }
    checkTypeOfParameter(parameter, expectedParameterType, parameterIndex, query) {
        const typeOfParameter = typeof parameter;
        if (typeOfParameter !== expectedParameterType) {
            throw new Error(`Expecting a '${expectedParameterType}' parameter for:
            ${query.dbEntity.name}.${query.jsonQuery.queryName}
            parameter #: ${parameterIndex}
got: ${typeOfParameter}
            `);
        }
    }
};
QueryParameterDeserializer = __decorate([
    Injected()
], QueryParameterDeserializer);
export { QueryParameterDeserializer };
//# sourceMappingURL=QueryParameterDeserializer.js.map