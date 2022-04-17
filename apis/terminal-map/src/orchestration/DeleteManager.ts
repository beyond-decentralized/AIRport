import {
    EntityId,
    PortableQuery,
    ApplicationIndex,
    IRootTransaction
} from "@airport/ground-control";
import { IContext } from "@airport/di";
import type {
    IActor,
    RepositoryEntity,
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
    Map<ApplicationIndex, Map<EntityId, Map<Repository_Id, RepositoryEntity[]>>>