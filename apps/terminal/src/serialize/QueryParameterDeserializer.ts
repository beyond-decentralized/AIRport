import {
    IClientQuery,
    IJsonClientQueryParameter,
    IQueryParameterDeserializer,
    QUERY_PARAMETER_DESERIALIZER
} from "@airport/check-in";
import { DI } from "@airport/di";
import {
    SQLDataType
} from "@airport/ground-control";
import {
    EntityState,
    IEntityStateManager
} from "@airport/pressurization";

export class QueryParameterDeserializer
    implements IQueryParameterDeserializer {

    deserialize(
        parameters: any[],
        query: IClientQuery,
        entityStateManager: IEntityStateManager
    ): any[] {
        if (parameters.length !== query.jsonQuery.parameters.length) {
            throw new Error(`Wrong number of parameters for ${query.dbEntity.name}.${query.jsonQuery.queryName}
            Received:  ${parameters.length}
            Expecting: ${query.jsonQuery.parameters.length}
            `)
        }

        const deserializedParameters = []

        for (let i = 0; i < parameters.length; i++) {
            const deserializedParameter = this.deserializeParameter(
                parameters[i], query.jsonQuery.parameters[i], i + 1,
                query, entityStateManager)
            deserializedParameters.push(deserializedParameter)
        }

        return deserializedParameters
    }

    private deserializeParameter(
        parameter: any,
        jsonQueryParameter: IJsonClientQueryParameter,
        parameterIndex: number,
        query: IClientQuery,
        entityStateManager: IEntityStateManager
    ): boolean | Date | number | string {
        switch (jsonQueryParameter.type) {
            case SQLDataType.BOOLEAN:
                this.checkTypeOfParameter(parameter, 'boolean', parameterIndex, query)
                break;
            case SQLDataType.DATE:
                if (!(parameter instanceof Object)
                    || parameter[entityStateManager.getStateFieldName()] !== EntityState.RESULT_DATE
                    || !parameter.value) {
                    throw new Error(`Invalid Serialized Date format for:
                    ${query.dbEntity.name}.${query.jsonQuery.queryName}
                    parameter #: ${parameterIndex}
        got: ${JSON.stringify(parameter)}
                    `)
                }
                try {
                    return new Date(parameter)
                } catch (e) {
                    throw new Error(`Invalid Serialized Date format for:
                    ${query.dbEntity.name}.${query.jsonQuery.queryName}
                    parameter #: ${parameterIndex}
        got: ${JSON.stringify(parameter)}
                    `);
                }
                break;
            case SQLDataType.NUMBER:
                this.checkTypeOfParameter(parameter, 'number', parameterIndex, query)
                break;
            case SQLDataType.STRING:
                this.checkTypeOfParameter(parameter, 'string', parameterIndex, query)
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

    private checkTypeOfParameter(
        parameter: any,
        expectedParameterType: string,
        parameterIndex: number,
        query: IClientQuery
    ) {
        const typeOfParameter = typeof parameter
        if (typeOfParameter !== expectedParameterType) {
            throw new Error(`Expecting a '${expectedParameterType}' parameter for:
            ${query.dbEntity.name}.${query.jsonQuery.queryName}
            parameter #: ${parameterIndex}
got: ${typeOfParameter}
            `);
        }

    }

}
DI.set(QUERY_PARAMETER_DESERIALIZER, QueryParameterDeserializer)
