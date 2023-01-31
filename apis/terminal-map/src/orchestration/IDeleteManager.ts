import {
    DbEntity_LocalId,
    PortableQuery,
    DbApplication_Index,
    IRootTransaction,
    Repository_LocalId,
    IActor,
    IAirEntity
} from "@airport/ground-control";
import { IContext } from "@airport/direction-indicator";
import { ITransaction } from "../transaction/ITransaction";

export interface IDeleteManager {

    deleteWhere(
        portableQuery: PortableQuery,
        actor: IActor,
        transaction: ITransaction,
        rootTransaction: IRootTransaction,
        context?: IContext,
    ): Promise<number>

}

export type RecordsToDelete =
    Map<DbApplication_Index, Map<DbEntity_LocalId, Map<Repository_LocalId, IAirEntity[]>>>