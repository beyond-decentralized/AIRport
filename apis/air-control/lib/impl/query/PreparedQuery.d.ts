import { IEntitySelectProperties } from '../../lingo/core/entity/Entity';
import { ColumnConfiguration } from '../../lingo/core/entity/metadata/ColumnDecorators';
import { PropertyDecorator } from '../../lingo/core/metadata/decorators';
import { RawEntityQuery } from '../../lingo/query/facade/EntityQuery';
import { PreparedQueryDecorator } from '../../lingo/query/PreparedQuery';
export interface ColumnDecorator {
    (columnConfiguration: ColumnConfiguration): PropertyDecorator;
}
export declare const PreparedQuery: PreparedQueryDecorator;
export declare function FindGraph<Entity, EntityArray extends Array<Entity>, IESP extends IEntitySelectProperties>(rawGraphQuery: RawEntityQuery<IESP> | {
    (...args: any[]): RawEntityQuery<IESP>;
}): void;
//# sourceMappingURL=PreparedQuery.d.ts.map