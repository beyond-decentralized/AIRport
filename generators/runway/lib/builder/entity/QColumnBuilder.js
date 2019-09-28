"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Builder_1 = require("../Builder");
/**
 * Created by Papa on 4/25/2016.
 */
class QColumnBuilder {
    constructor(parentBuilder, sColumn) {
        this.parentBuilder = parentBuilder;
        this.sColumn = sColumn;
    }
    buildDefinition() {
        let column = this.sColumn;
        return `${column.name}: ${column.type};`;
    }
    build() {
        throw new Error(`Not Implemented.`);
    }
    buildInterfaceDefinition(optional = true, forInternalInterfaces = true) {
        const column = this.sColumn;
        const name = column.name;
        let type = column.type;
        if (type === 'Json') {
            type = 'string';
        }
        let operableFieldSuffix = '';
        if (forInternalInterfaces) {
            operableFieldSuffix = ' | ' + Builder_1.getColumnFieldInterface(column);
        }
        return `${name}${optional ? '?' : ''}: ${type}${operableFieldSuffix};`;
    }
}
exports.QColumnBuilder = QColumnBuilder;
//# sourceMappingURL=QColumnBuilder.js.map