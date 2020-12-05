import { DI } from '@airport/di';
import { OPERATION_SERIALIZER } from '../tokens';
export class OperationSerializer {
    serialize(entity) {
        const operation = {
            lookupTable
        };
        // TODO: add support for non-create operations
        return null;
    }
    doSerialize(entity, operation) {
        return null;
    }
}
DI.set(OPERATION_SERIALIZER, OperationSerializer);
//# sourceMappingURL=OperationSerializer.js.map