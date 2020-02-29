var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, Table } from "@airport/air-control";
/**
 * Created by Papa on 12/18/2016.
 */
/**
 * A record of device+datatabase that adds to a repository
 */
let RepositoryActor = class RepositoryActor {
};
__decorate([
    Column({ name: "ID" }),
    GeneratedValue(),
    Id()
], RepositoryActor.prototype, "id", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: "ACTOR_ID", referencedColumnName: "ID",
        nullable: false })
], RepositoryActor.prototype, "actor", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: "REPOSITORY_ID", referencedColumnName: "ID",
        nullable: false })
], RepositoryActor.prototype, "repository", void 0);
RepositoryActor = __decorate([
    Entity(),
    Table({ name: "REPOSITORY_ACTORS" })
], RepositoryActor);
export { RepositoryActor };
//# sourceMappingURL=RepositoryActor.js.map