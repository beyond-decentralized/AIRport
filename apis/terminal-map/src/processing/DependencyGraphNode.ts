import { DbEntity, IAirEntity } from '@airport/ground-control'

export interface IDependencyGraphNode<E extends IAirEntity> {
	circleTraversedFor: { [entityOUId: number]: boolean }
	dbEntity: DbEntity
	dependsOnByOUID: IDependencyGraphNode<any>[]
	dependsOn: IDependencyGraphNode<any>[]
	entity: E
	isCreate: boolean
	isDelete: boolean
}

export interface IOperationNode<E extends IAirEntity> {
	dbEntity: DbEntity
	entities: E[]
	isCreate: boolean
	isDelete: boolean
}