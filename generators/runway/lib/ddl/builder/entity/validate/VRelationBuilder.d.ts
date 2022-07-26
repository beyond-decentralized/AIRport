import { PropertyDocEntry } from '../../../parser/DocEntry';
import { IBuilder } from '../../Builder';
import { IVCoreEntityBuilder } from './VCoreEntityBuilder';
/**
 * Created by Papa on 4/25/2016.
 */
export interface IRelationProperties {
    rootReferencedPropertyName: string;
    referencedPropertyName: string;
    rootReferencedEntityIndex: number;
    rootReferencedTableIndex: number;
    referencedEntityIndex: number;
    referencedTableIndex: number;
    relationProperties: IRelationProperty[];
    relationColumns: {
        [columnName: string]: string;
    };
}
export interface IRelationProperty {
    referencedColumnName: string;
    columnName: string;
}
export declare class VRelationBuilder implements IBuilder {
    private parentBuilder;
    entityProperty: PropertyDocEntry;
    constructor(parentBuilder: IVCoreEntityBuilder, entityProperty: PropertyDocEntry);
    build(): string;
    buildInterfaceDefinition(): string;
}
//# sourceMappingURL=VRelationBuilder.d.ts.map