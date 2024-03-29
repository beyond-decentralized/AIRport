import {
    Injected
} from '@airport/direction-indicator'
import {
    IClientQuery,
    IEntityStateManager,
    JsonClientQueryParameter,
    IQueryParameterDeserializer,
    SQLDataType
} from "@airport/ground-control";

// TODO: figure out if this is needed - originally written for deserializing
// Client-side query parameters.  Since then moved to Isolates and generic
// API calls.  Probably should be used in go-tower to deserialize all of the
// method argiments passed it (and won't be tied to a query of any kind, API
// interface is generic, unless already known to contain entity objects.)
@Injected()
export class QueryParameterDeserializer
    implements IQueryParameterDeserializer {

    deserialize(
        parameters: any[],
        query: IClientQuery,
        entityStateManager: IEntityStateManager
    ): any[] {
        if (parameters.length !== query.query.parameters.length) {
            throw new Error(`Wrong number of parameters for ${query.dbEntity.name}.${query.query.queryName}
            Received:  ${parameters.length}
            Expecting: ${query.query.parameters.length}
            `)
        }

        const deserializedParameters = []

        for (let i = 0; i < parameters.length; i++) {
            const deserializedParameter = this.deserializeParameter(
                parameters[i], query.query.parameters[i], i + 1,
                query, entityStateManager)
            deserializedParameters.push(deserializedParameter)
        }

        return deserializedParameters
    }

    private deserializeParameter(
        parameter: any,
        queryParameter: JsonClientQueryParameter,
        parameterIndex: number,
        query: IClientQuery,
        entityStateManager: IEntityStateManager
    ): boolean | Date | number | string {
        switch (queryParameter.type) {
            case SQLDataType.BOOLEAN:
                this.checkTypeOfParameter(parameter, 'boolean', parameterIndex, query)
                break;
            case SQLDataType.DATE:
                if (!(parameter instanceof Object)
                    // || parameter[entityStateManager.getStateFieldName()] !== EntityState.RESULT_DATE
                    || !parameter.value) {
                    throw new Error(`Invalid Serialized Date format for:
                    ${query.dbEntity.name}.${query.query.queryName}
                    parameter #: ${parameterIndex}
        got: ${JSON.stringify(parameter)}
                    `)
                }
                try {
                    return new Date(parameter)
                } catch (e) {
                    throw new Error(`Invalid Serialized Date format for:
                    ${query.dbEntity.name}.${query.query.queryName}
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
                ${query.dbEntity.name}.${query.query.queryName}
                parameter #: ${parameterIndex}
    got: ${queryParameter.type}
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
            ${query.dbEntity.name}.${query.query.queryName}
            parameter #: ${parameterIndex}
got: ${typeOfParameter}
            `);
        }

    }

}
