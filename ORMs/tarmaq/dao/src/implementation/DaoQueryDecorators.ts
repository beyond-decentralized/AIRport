import { IEntitySelectProperties, RawLimitedEntityQuery } from "@airport/tarmaq-query";

export class DaoQueryDecorators<EntitySelect extends IEntitySelectProperties> {

	Graph(
		callback: (...args: any[]) => RawLimitedEntityQuery<EntitySelect>
	): PropertyDecorator {
		return function(
			target: any,
			propertyKey: string
		) {
			// No runtime logic required.
		};
	}

	Tree(
		callback: { (...args: any[]): RawLimitedEntityQuery<EntitySelect> },
	): PropertyDecorator {
		return function(
			target: any,
			propertyKey: string
		) {
			// No runtime logic required.
		};
	}
}
