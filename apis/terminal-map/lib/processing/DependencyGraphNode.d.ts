import { DbEntity } from '@airport/ground-control';
import { IRepositoryEntity } from '@airport/holding-pattern';
export interface IDependencyGraphNode<E extends IRepositoryEntity> {
    circleTraversedFor: {
        [entityOUId: number]: boolean;
    };
    dbEntity: DbEntity;
    dependsOnByOUID: IDependencyGraphNode<any>[];
    dependsOn: IDependencyGraphNode<any>[];
    entity: E;
    isCreate: boolean;
    isDelete: boolean;
}
export interface IOperationNode<E extends IRepositoryEntity> {
    dbEntity: DbEntity;
    entities: E[];
    isCreate: boolean;
    isDelete: boolean;
}
//# sourceMappingURL=DependencyGraphNode.d.ts.map