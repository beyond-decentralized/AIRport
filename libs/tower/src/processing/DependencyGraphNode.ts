export interface IDependencyGraphNode<E> {
	dependsOn: IDependencyGraphNode<any>[]
	entities: E[]
}
