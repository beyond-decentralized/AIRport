import { ColumnConfiguration } from '../../lingo/core/entity/metadata/ColumnDecorators';
import { PropertyDecorator } from '../../lingo/core/metadata/decorators';
import { PreparedQueryDecorator } from '../../lingo/query/PreparedQuery';
export interface ColumnDecorator {
    (columnConfiguration: ColumnConfiguration): PropertyDecorator;
}
export declare const PreparedQuery: PreparedQueryDecorator;
//# sourceMappingURL=PreparedQuery.d.ts.map