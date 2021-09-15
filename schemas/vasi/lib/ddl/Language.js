var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, Entity, GeneratedValue, Id, Table } from '@airport/air-control';
import { SystemGenerated } from './attributes/SystemGenerated';
let Language = class Language extends SystemGenerated {
};
__decorate([
    Id(),
    GeneratedValue(),
    Column({ name: 'LANGUAGE_ID' })
], Language.prototype, "id", void 0);
__decorate([
    Column({ name: 'LANGUAGE_NAME' })
], Language.prototype, "name", void 0);
Language = __decorate([
    Entity(),
    Table({ name: 'LANGUAGES' })
], Language);
export { Language };
//# sourceMappingURL=Language.js.map