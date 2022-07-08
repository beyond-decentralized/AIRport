import { IAliasMap, IEntityAliases, IFieldColumnAliases, IParameterAliases, Parameter } from '../../../definition/core/entity/Aliases';
import { IQEntityInternal } from "../../../definition/core/entity/Entity";
import { IQOrderableField } from "../../../definition/core/field/Field";
import { IQFunction } from "../../../definition/core/field/Functions";
export declare class AliasCache {
    protected aliasPrefix: string;
    private lastAlias;
    constructor(aliasPrefix?: string);
    getFollowingAlias(): string;
    reset(): void;
}
export declare abstract class AliasMap<T, A> implements IAliasMap<T, A> {
    protected aliasCache: AliasCache;
    protected aliasMap: Map<T, A>;
    constructor(aliasCache: AliasCache);
    getNextAlias(object: T): string;
    abstract getExistingAlias(object: T): A;
    hasAliasFor(object: T): boolean;
}
export declare class EntityAliases extends AliasMap<IQEntityInternal, string> implements IEntityAliases {
    private columnAliasCache;
    private parameterAliases;
    constructor(entityAliasCache?: AliasCache, columnAliasCache?: AliasCache, parameterAliasCache?: AliasCache);
    getParams(): IParameterAliases;
    getNewFieldColumnAliases(): IFieldColumnAliases<any>;
    getExistingAlias(entity: IQEntityInternal): string;
    getOnlyAlias(): string;
}
export declare class ParameterAliases extends AliasMap<IQFunction<any>, Parameter> implements IParameterAliases {
    constructor(aliasCache: AliasCache);
    getNextAlias(object: IQFunction<any>): string;
    getExistingAlias(field: IQFunction<any>): Parameter;
    getParameters(): {
        [alias: string]: Parameter;
    };
}
export declare class FieldColumnAliases extends AliasMap<IQOrderableField<any>, string> implements IFieldColumnAliases<any> {
    protected _entityAliases: IEntityAliases;
    constructor(_entityAliases: IEntityAliases, aliasCache: AliasCache);
    get entityAliases(): IEntityAliases;
    getExistingAlias(field: IQOrderableField<any>): string;
}
//# sourceMappingURL=Aliases.d.ts.map