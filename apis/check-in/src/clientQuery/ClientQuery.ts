import {
    DbEntity,
    SQLDataType
} from "@airport/ground-control";

export interface IJsonClientQueryParameter {
    type: SQLDataType
}

export interface IJsonClientQuery {
    parameters: IJsonClientQueryParameter[]
    queryName: string;
}

export interface IClientQuery {
    jsonQuery: IJsonClientQuery
    dbEntity: DbEntity
}
