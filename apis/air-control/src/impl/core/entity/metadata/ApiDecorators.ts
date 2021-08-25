import { APIDecorator } from "../../../../lingo/core/entity/metadata/ApiDecorators"

export const API: APIDecorator = function () {
	return function (
		targetObject: any,
		propertyKey: string
	) {
		// No runtime logic required.
	}
}