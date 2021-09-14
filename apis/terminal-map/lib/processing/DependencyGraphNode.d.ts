import { DbEntity } from '@airport/ground-control';
export interface IDependencyGraphNode<E> {
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
export interface IOperationNode<E> {
    dbEntity: DbEntity;
    entities: E[];
    isCreate: boolean;
    isDelete: boolean;
}
//# sourceMappingURL=DependencyGraphNode.d.ts.map