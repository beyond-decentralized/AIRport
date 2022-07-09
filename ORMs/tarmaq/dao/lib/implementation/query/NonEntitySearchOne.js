var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { FieldQuery, SheetQuery, TreeQuery } from '@airport/tarmaq-query';
import { from } from 'rxjs';
import { Lookup } from './Lookup';
/**
 * Created by Papa on 11/12/2016.
 */
let NonEntitySearchOne = class NonEntitySearchOne extends Lookup {
    field(rawFieldQuery, context) {
        return from(this.searchOne(rawFieldQuery, QueryResultType.FIELD, FieldQuery, context));
    }
    sheet(rawSheetQuery, context) {
        return from(this.searchOne(rawSheetQuery, QueryResultType.SHEET, SheetQuery, context));
    }
    tree(rawTreeQuery, context) {
        return from(this.searchOne(rawTreeQuery, QueryResultType.TREE, TreeQuery, context));
    }
    searchOne(rawNonEntityQuery, queryResultType, QueryClass, context) {
        return this.lookup(rawNonEntityQuery, queryResultType, true, true, QueryClass, this.ensureContext(context));
    }
};
NonEntitySearchOne = __decorate([
    Injected()
], NonEntitySearchOne);
export { NonEntitySearchOne };
//# sourceMappingURL=NonEntitySearchOne.js.map