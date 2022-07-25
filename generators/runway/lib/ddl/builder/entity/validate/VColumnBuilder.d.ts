import { IBuilder } from '../../Builder';
import { SColumn } from '../../application/SProperty';
import { IVCoreEntityBuilder } from './VCoreEntityBuilder';
/**
 * Created by Papa on 4/25/2016.
 */
export declare class VColumnBuilder implements IBuilder {
    private parentBuilder;
    sColumn: SColumn;
    constructor(parentBuilder: IVCoreEntityBuilder, sColumn: SColumn);
    buildDefinition(): string;
    build(): string;
    buildInterfaceDefinition(optional?: boolean, forInternalInterfaces?: boolean): string;
}
//# sourceMappingURL=VColumnBuilder.d.ts.map