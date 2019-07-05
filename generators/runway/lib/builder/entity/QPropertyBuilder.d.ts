import { PropertyDocEntry } from '../../parser/DocEntry';
import { IQBuilder, IQCoreEntityBuilder } from '../QBuilder';
/**
 * Created by Papa on 4/25/2016.
 */
export declare class QPropertyBuilder implements IQBuilder {
    private parentBuilder;
    propertyDocEntry: PropertyDocEntry;
    constructor(parentBuilder: IQCoreEntityBuilder, propertyDocEntry: PropertyDocEntry);
    buildDefinition(): string;
    build(): string;
    buildInterfaceDefinition(optional?: boolean, forInternalInterfaces?: boolean): string;
}
