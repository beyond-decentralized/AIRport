var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Y } from '@airport/air-control';
import { Document } from 'src/impl/DocumentDecorators';
import { vespa } from 'src/impl/vespa/VespaDecorators';
export class Factor {
}
let Thread = class Thread {
};
__decorate([
    Document({
        test: 'hello'
    })
], Thread.prototype, "data", void 0);
__decorate([
    vespa.Attribute({
        fastSearch: true
    }),
    vespa.Indexing({
        index: Y
    })
], Thread.prototype, "name", void 0);
Thread = __decorate([
    vespa.Entity()
], Thread);
let Default = class Default {
};
Default = __decorate([
    vespa.Default(),
    vespa.Fieldset(Thread, {
        fields: {
            name: Y
        }
    })
], Default);
//# sourceMappingURL=vespa.js.map