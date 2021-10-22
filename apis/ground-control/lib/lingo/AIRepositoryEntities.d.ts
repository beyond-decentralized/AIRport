import { DbSchema } from "./schema/Schema";
export interface AIRepository {
    id: number;
    createdAt?: Date;
    uuId?: string;
    name?: string;
    url?: string;
    syncPriority?: string;
    ownerActor?: AIRActor;
    repositoryActors?: AIRepositoryActor[];
}
export interface AIRActor {
    id: number;
    uuId?: string;
    user?: AIRUser;
    application?: AIRApplication;
    repositoryActors?: AIRepositoryActor[];
}
export interface AIRUser {
    firstName?: string;
    id: number;
    lastName?: string;
    middleName?: string;
    phone?: string;
    uniqueId?: string;
}
export interface AIRApplication {
    domain?: AIRDomain;
    id: number;
    name?: string;
    signature?: string;
}
export interface AIRDomain {
    applications?: AIRApplication[];
    id: number;
    name?: string;
    schemas?: DbSchema[];
}
export interface AIRepositoryActor {
    actor?: AIRActor;
    id: number;
    repository: AIRepository;
}
//# sourceMappingURL=AIRepositoryEntities.d.ts.map