import { IBuilder } from '../../Builder';
import { SColumn } from '../../application/SProperty';
import { IQCoreEntityBuilder } from './QCoreEntityBuilder';
/**
 * Created by Papa on 4/25/2016.
 */
export declare class QColumnBuilder implements IBuilder {
    private parentBuilder;
    sColumn: SColumn;
    constructor(parentBuilder: IQCoreEntityBuilder, sColumn: SColumn);
    buildDefinition(): string;
    build(): string;
    buildInterfaceDefinition(optional?: boolean, forInternalInterfaces?: boolean): string;
}
//# sourceMappingURL=QColumnBuilder.d.ts.map