var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, Entity, GeneratedValue, Id, Table } from '@airport/air-control';
let SecurityQuestion = class SecurityQuestion {
};
__decorate([
    Id(),
    GeneratedValue()
], SecurityQuestion.prototype, "id", void 0);
__decorate([
    Column({ name: 'QUESTION', nullable: false })
], SecurityQuestion.prototype, "question", void 0);
SecurityQuestion = __decorate([
    Entity(),
    Table({ name: "AGT_SECURITY_QUESTIONS" })
], SecurityQuestion);
export { SecurityQuestion };
//# sourceMappingURL=SecurityQuestion.js.map