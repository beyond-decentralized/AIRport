import {
	IDao,
	IEntityCascadeGraph
} from '@airport/air-control'

export const Operation = function <IEntityGraph extends IEntityCascadeGraph>(
	rules: IEntityGraph
) {
	return function (
		target: IDao<any,
			any,
			any,
			any,
			any,
			any,
			IEntityGraph,
			any>,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}
