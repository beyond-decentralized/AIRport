var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, Entity, GeneratedValue, Id, Table } from '@airport/air-control';
import { SystemGenerated } from './attributes/SystemGenerated';
/**
 * Translation isn't necessarily from one language to another.
 *
 * You can translate to a different style for instance. You could
 * make a very technical poll more layman sounding.  Or make something
 * funny, etc.
 *
 * Internal Types like: Default, Best As voted, Best composite
 * User specified types: Funny, Abbreviated, Alegorical
 */
let TranslationType = class TranslationType extends SystemGenerated {
};
__decorate([
    Id(),
    GeneratedValue(),
    Column({ name: 'TRANSLATION_TYPE_ID' })
], TranslationType.prototype, "id", void 0);
__decorate([
    Column({ name: 'TRANSLATION_TYPE_CODE' })
], TranslationType.prototype, "code", void 0);
TranslationType = __decorate([
    Entity(),
    Table({ name: 'TRANSLATION_TYPES' })
], TranslationType);
export { TranslationType };
//# sourceMappingURL=TranslationType.js.map