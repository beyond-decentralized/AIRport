import { getQColumnFieldInterface } from './QCoreEntityBuilder';
/**
 * Created by Papa on 4/25/2016.
 */
export class QColumnBuilder {
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
            operableFieldSuffix = ' | ' + getQColumnFieldInterface(column);
        }
        return `${name}${optional ? '?' : ''}: ${type}${operableFieldSuffix};`;
    }
}
//# sourceMappingURL=QColumnBuilder.js.map