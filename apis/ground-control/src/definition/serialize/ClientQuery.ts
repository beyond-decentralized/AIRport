import { DbEntity } from "../application/Entity";
import { SQLDataType } from "../core/field/JSONClause";

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
