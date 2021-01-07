import {
	IEntitySelectProperties,
	RawEntityQuery
} from '@airport/air-control';

export class DaoQueryDecorators<EntitySelect extends IEntitySelectProperties> {

	Graph(
		callback: (...args: any[]) => RawEntityQuery<EntitySelect>
	): PropertyDecorator {
		return function(
			target: any,
			propertyKey: string
		) {
			// No runtime logic required.
		};
	}

	Tree(
		callback: { (...args: any[]): RawEntityQuery<IEntitySelectProperties> },
	): PropertyDecorator {
		return function(
			target: any,
			propertyKey: string
		) {
			// No runtime logic required.
		};
	}
}
