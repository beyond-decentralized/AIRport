import {
    ApplicationEntity_LocalId,
    PortableQuery,
    Application_Index,
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
    Map<Application_Index, Map<ApplicationEntity_LocalId, Map<Repository_LocalId, IAirEntity[]>>>