/**
 * Created by papa on 1/5/21.
 */

export class QQueryPreparationField {
	constructor() {
		return new Proxy(this, {
			apply: function(
				target,
				thisArg,
				argumentsList
			) {
				return new QQueryPreparationField()
			},
			get: function(
				target,
				prop,
				receiver
			) {
				return new QQueryPreparationField()
			},
			set: function(
				obj,
				prop,
				value
			) {
				// Nothing to do
				return true
			}
		})
	}
}
