import {
	IDao,
	IEntityCascadeGraph
} from '@airport/air-traffic-control'

export const Persist = function <IEntityGraph extends IEntityCascadeGraph>(
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

export const Delete = function() {
	return function (
		target: IDao<any,
			any,
			any,
			any,
			any,
			any,
			any,
			any>,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}

export const Query = function() {
	return function (
		target: IDao<any,
			any,
			any,
			any,
			any,
			any,
			any,
			any>,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}
