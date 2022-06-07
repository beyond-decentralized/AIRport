import {
    EntityId,
    PortableQuery,
    ApplicationIndex,
    IRootTransaction
} from "@airport/ground-control";
import { IContext } from "@airport/direction-indicator";
import type {
    IActor,
    AirEntity,
    Repository_Id
} from "@airport/holding-pattern";
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
    Map<ApplicationIndex, Map<EntityId, Map<Repository_Id, AirEntity[]>>>