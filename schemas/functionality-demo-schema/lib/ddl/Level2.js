var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, GeneratedValue, Id, JoinColumn, ManyToOne } from "@airport/air-control";
let Level2 = class Level2 {
};
__decorate([
    Id(),
    GeneratedValue()
], Level2.prototype, "id", void 0);
__decorate([
    ManyToOne({ mappedBy: 'contained' }),
    JoinColumn({ name: 'level1Id', referencedColumnName: 'id' })
], Level2.prototype, "up", void 0);
Level2 = __decorate([
    Entity()
], Level2);
export { Level2 };
//# sourceMappingURL=Level2.js.map