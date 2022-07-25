import { PropertyDocEntry } from '../../../parser/DocEntry';
import { IBuilder } from '../../Builder';
import { IQCoreEntityBuilder } from './QCoreEntityBuilder';
/**
 * Created by Papa on 4/25/2016.
 */
export declare class QPropertyBuilder implements IBuilder {
    private parentBuilder;
    propertyDocEntry: PropertyDocEntry;
    constructor(parentBuilder: IQCoreEntityBuilder, propertyDocEntry: PropertyDocEntry);
    buildDefinition(): string;
    build(): string;
    buildInterfaceDefinition(optional?: boolean, forInternalInterfaces?: boolean): string;
}
//# sourceMappingURL=QPropertyBuilder.d.ts.map