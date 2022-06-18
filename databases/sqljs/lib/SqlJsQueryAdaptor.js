var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SqLiteQueryAdaptor } from "@airport/sqlite";
import { Injected } from '@airport/direction-indicator';
/**
 * Created by Papa on 2/8/2017.
 */
let SqlJsQueryAdaptor = class SqlJsQueryAdaptor extends SqLiteQueryAdaptor {
    getResultCellRawValue(resultRow, columnName, index, dataType, defaultValue) {
        return resultRow[index];
    }
};
SqlJsQueryAdaptor = __decorate([
    Injected()
], SqlJsQueryAdaptor);
export { SqlJsQueryAdaptor };
//# sourceMappingURL=SqlJsQueryAdaptor.js.map