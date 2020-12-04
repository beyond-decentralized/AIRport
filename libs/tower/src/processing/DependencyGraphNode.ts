import {DbEntity} from '@airport/ground-control'

export interface IDependencyGraphNode<E> {
	dbEntity: DbEntity
	dependsOn: IDependencyGraphNode<any>[]
	entity: E
	isCreate: boolean
	isDelete: boolean
}

export interface IOperationNode<E> {
	dbEntity: DbEntity
	entities: E[]
}
