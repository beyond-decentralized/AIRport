import { ColumnConfiguration }    from '../../lingo/core/entity/metadata/ColumnDecorators';
import { PropertyDecorator }      from '../../lingo/core/metadata/decorators';
import { PreparedQueryDecorator } from '../../lingo/query/PreparedQuery';

export interface ColumnDecorator {
	(columnConfiguration: ColumnConfiguration): PropertyDecorator;
}

export const PreparedQuery: PreparedQueryDecorator = function() {
	return function(
		target: any,
		methodName: string,
		methodDescriptor: any
	) {
		// No runtime logic required.
	};
};