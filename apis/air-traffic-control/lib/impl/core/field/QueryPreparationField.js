/**
 * Created by papa on 1/5/21.
 */
export class QQueryPreparationField extends Proxy {
    constructor() {
        super({}, {
            get: function (target, prop, receiver) {
                return new QQueryPreparationField();
            }
        });
    }
}
//# sourceMappingURL=QueryPreparationField.js.map