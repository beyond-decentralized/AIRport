import { DbEntity } from "../application/DbEntity";
import { SQLDataType } from "../core/field/QueryClause";

export interface JsonClientQueryParameter {
    type: SQLDataType
}

export interface JsonClientQuery {
    parameters: JsonClientQueryParameter[]
    queryName: string;
}

export interface IClientQuery {
    query: JsonClientQuery
    dbEntity: DbEntity
}
