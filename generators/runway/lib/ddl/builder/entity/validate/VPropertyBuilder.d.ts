import { PropertyDocEntry } from '../../../parser/DocEntry';
import { IBuilder } from '../../Builder';
import { IVCoreEntityBuilder } from './VCoreEntityBuilder';
/**
 * Created by Papa on 4/25/2016.
 */
export declare class VPropertyBuilder implements IBuilder {
    private parentBuilder;
    propertyDocEntry: PropertyDocEntry;
    constructor(parentBuilder: IVCoreEntityBuilder, propertyDocEntry: PropertyDocEntry);
    buildDefinition(): string;
    build(): string;
    buildInterfaceDefinition(optional?: boolean, forInternalInterfaces?: boolean): string;
}
//# sourceMappingURL=VPropertyBuilder.d.ts.map