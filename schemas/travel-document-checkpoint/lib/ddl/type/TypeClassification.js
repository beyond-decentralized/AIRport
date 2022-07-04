var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Id, JoinColumn, ManyToOne, Table } from '@airport/air-traffic-control';
let TypeClassification = class TypeClassification {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: 'CLASSIFICATION_ID',
        referencedColumnName: 'CLASSIFICATION_ID'
    })
], TypeClassification.prototype, "classification", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: 'TYPE_ID',
        referencedColumnName: 'TYPE_ID'
    })
], TypeClassification.prototype, "type", void 0);
TypeClassification = __decorate([
    Entity(),
    Table({
        name: 'TYPE_CLASSIFICATIONS'
    })
], TypeClassification);
export { TypeClassification };
//# sourceMappingURL=TypeClassification.js.map