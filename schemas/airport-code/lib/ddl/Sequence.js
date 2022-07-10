var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, Entity, Id, Table } from '@airport/tarmaq-entity';
let Sequence = class Sequence {
};
__decorate([
    Id(),
    Column({ name: 'APPLICATION_INDEX', nullable: false }),
    DbNumber()
], Sequence.prototype, "applicationIndex", void 0);
__decorate([
    Id(),
    Column({ name: 'TABLE_INDEX', nullable: false }),
    DbNumber()
], Sequence.prototype, "tableIndex", void 0);
__decorate([
    Id(),
    Column({ name: 'COLUMN_INDEX', nullable: false }),
    DbNumber()
], Sequence.prototype, "columnIndex", void 0);
__decorate([
    Column({ name: 'SEQUENCE_INCREMENT_BY', nullable: false })
], Sequence.prototype, "incrementBy", void 0);
__decorate([
    Column({ name: 'CURRENT_VALUE', nullable: false })
], Sequence.prototype, "currentValue", void 0);
Sequence = __decorate([
    Entity(),
    Table({ name: 'SEQUENCES' })
], Sequence);
export { Sequence };
//# sourceMappingURL=Sequence.js.map