var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { EntityGraphResultParser } from './EntityGraphResultParser';
import { EntityTreeResultParser } from './EntityTreeResultParser';
let ObjectResultParserFactory = class ObjectResultParserFactory {
    getObjectResultParser(queryResultType, config, rootDbEntity) {
        switch (queryResultType) {
            case QueryResultType.ENTITY_GRAPH:
            case QueryResultType.MAPPED_ENTITY_GRAPH:
                return new EntityGraphResultParser(config, rootDbEntity, this.applicationUtils, this.entityStateManager, this.utils);
            case QueryResultType.ENTITY_TREE:
            case QueryResultType.MAPPED_ENTITY_TREE:
                return new EntityTreeResultParser(this.applicationUtils, this.entityStateManager, this.utils);
            default:
                throw new Error(`ObjectQueryParser not supported for QueryResultType: ${queryResultType}`);
        }
    }
};
__decorate([
    Inject()
], ObjectResultParserFactory.prototype, "applicationUtils", void 0);
__decorate([
    Inject()
], ObjectResultParserFactory.prototype, "entityStateManager", void 0);
__decorate([
    Inject()
], ObjectResultParserFactory.prototype, "utils", void 0);
ObjectResultParserFactory = __decorate([
    Injected()
], ObjectResultParserFactory);
export { ObjectResultParserFactory };
//# sourceMappingURL=ObjectResultParserFactory.js.map