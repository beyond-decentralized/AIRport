import { PropertyDecorator } from '@airport/direction-indicator'
import { DocumentConfiguration } from '../lingo/DocumentDecorators'

export function Document<T>(
	documentConfiguration?: DocumentConfiguration<T>
): PropertyDecorator {
	return function (constructor: { new(): Object }) {
		// No runtime logic required.
	}
}
