import { DI } from "@airport/di";
import { SYNC_OUT_DATA_SERIALIZER } from "../../../tokens";
export class SyncOutDataSerializer {
    serialize(repositoryTransactionHistories) {
        return [];
    }
}
DI.set(SYNC_OUT_DATA_SERIALIZER, SyncOutDataSerializer);
//# sourceMappingURL=SyncOutDataSerializer.js.map