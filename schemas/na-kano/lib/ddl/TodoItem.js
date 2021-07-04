var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, Entity, ManyToOne, Table } from "@airport/air-control";
import { RepositoryEntity } from "@airport/holding-pattern";
let TodoItem = class TodoItem extends RepositoryEntity {
};
__decorate([
    Column({ name: 'ASSIGNED_TO' })
], TodoItem.prototype, "assignedTo", void 0);
__decorate([
    ManyToOne()
], TodoItem.prototype, "todoList", void 0);
TodoItem = __decorate([
    Entity(),
    Table({ name: 'TODO_ITEM' })
], TodoItem);
export { TodoItem };
//# sourceMappingURL=TodoItem.js.map