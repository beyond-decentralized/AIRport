import { DbEntity, SQLDataType } from "@airport/ground-control";

export interface IJsonQueryParameter {
    type: SQLDataType
}

export interface IJsonQuery {
    parameters: IJsonQueryParameter[]
    queryName: string;
}

export interface IQuery {
    jsonQuery: IJsonQuery
    dbEntity: DbEntity
}

export interface IQueryDeserializer {

    deserialize(
        parameters: any[],
        query: IQuery
    ): any[]

}

export class QueryDeserializer
    implements IQueryDeserializer {

    deserialize(
        parameters: any[],
        query: IQuery
    ): any[] {
        if(parameters.length !== query.jsonQuery.parameters.length) {
            throw new Error(`Wrong number of parameters for ${query.dbEntity.name}.${query.jsonQuery.queryName}
            Received:  ${parameters.length}
            Expecting: ${query.jsonQuery.parameters.length}
            `)
        }

        const deserializedParameters = []

        for(let i = 0; i < parameters.length; i++) {
            deserializedParameters.push(parameters[i], )
        }
        
        return parameters.map(parameter -> this.deserializeParameter(
            para
        ))
    }

    private deserializeParameter() {

    }

}