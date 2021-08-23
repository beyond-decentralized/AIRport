import {
    EntityId,
    PortableQuery,
    SchemaIndex
} from "@airport/ground-control";
import { IContext } from "@airport/di";
import {
    IActor,
    RepositoryEntity,
    RepositoryId
} from "@airport/holding-pattern";
import { ITransaction } from "../transaction/ITransaction";

export interface IDeleteManager {

    deleteWhere(
        portableQuery: PortableQuery,
        actor: IActor,
        transaction: ITransaction,
        context?: IContext,
    ): Promise<number>

}

export type RecordsToDelete =
    Map<SchemaIndex, Map<EntityId, Map<RepositoryId, RepositoryEntity[]>>>