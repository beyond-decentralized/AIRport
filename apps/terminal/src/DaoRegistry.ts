import { DI } from "@airport/di";
import {
    DbEntity,
    PortableQuery
} from "@airport/ground-control";
import { DAO_REGISTRY } from "./tokens";

export interface IDaoRegistry {

    findOperation(
        daoName: string,
        methodName: string
    ): IDaoOperation

}

export enum DaoOperationType {
    ADD_REPOSITORY,
    FIND,
    FIND_ONE,
    SAVE,
    SEARCH,
    SEARCH_ONE,
}

export interface IDaoOperation {
    dbEntity: DbEntity,
    queryReference: IQueryReference
    type: DaoOperationType
}

export interface IQueryReference {
    portableQuery: PortableQuery,
    parameterAliasesByPosition: string[]
}

export class DaoRegistry {

    findOperation(
        daoName: string,
        methodName: string
    ): IDaoOperation {
        throw new Error('TODO: implement');
    }
}
DI.set(DAO_REGISTRY, DaoRegistry)
