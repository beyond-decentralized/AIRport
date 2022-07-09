var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { FieldQuery, SheetQuery, TreeQuery } from '@airport/tarmaq-query';
import { Lookup } from './Lookup';
/**
 * Created by Papa on 11/12/2016.
 */
let NonEntityFind = class NonEntityFind extends Lookup {
    field(rawFieldQuery, context) {
        return this.find(rawFieldQuery, QueryResultType.FIELD, FieldQuery, context);
    }
    sheet(rawSheetQuery, cursorSize, callback, context) {
        if (cursorSize || callback) {
            throw new Error(`Implement!`);
        }
        return this.find(rawSheetQuery, QueryResultType.SHEET, SheetQuery, context);
    }
    tree(rawTreeQuery, context) {
        return this.find(rawTreeQuery, QueryResultType.TREE, TreeQuery, context);
    }
    find(rawNonEntityQuery, queryResultType, QueryClass, context) {
        return this.lookup(rawNonEntityQuery, queryResultType, false, false, QueryClass, this.ensureContext(context));
    }
};
NonEntityFind = __decorate([
    Injected()
], NonEntityFind);
export { NonEntityFind };
//# sourceMappingURL=NonEntityFind.js.map