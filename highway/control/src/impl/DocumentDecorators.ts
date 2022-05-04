import {PropertyDecorator}     from '@airport/air-traffic-control'
import {DocumentConfiguration} from '../lingo/DocumentDecorators'

export function Document<T>(
	documentConfiguration?: DocumentConfiguration<T>
): PropertyDecorator {
	return function (constructor: { new(): Object }) {
		// No runtime logic required.
	}
}
