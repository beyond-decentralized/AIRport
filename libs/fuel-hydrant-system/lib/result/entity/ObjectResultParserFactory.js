import { QueryResultType } from '@airport/ground-control';
import { EntityGraphResultParser } from './EntityGraphResultParser';
import { EntityTreeResultParser } from './EntityTreeResultParser';
export class ObjectResultParserFactory {
    getObjectResultParser(queryResultType, config, rootDbEntity) {
        switch (queryResultType) {
            case QueryResultType.ENTITY_GRAPH:
            case QueryResultType.MAPPED_ENTITY_GRAPH:
                return new EntityGraphResultParser(config, rootDbEntity);
            case QueryResultType.ENTITY_TREE:
            case QueryResultType.MAPPED_ENTITY_TREE:
                return new EntityTreeResultParser();
            default:
                throw new Error(`ObjectQueryParser not supported for QueryResultType: ${queryResultType}`);
        }
    }
}
//# sourceMappingURL=ObjectResultParserFactory.js.map