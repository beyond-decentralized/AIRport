import {
	IAliasMap,
	IEntityAliases,
	IFieldColumnAliases,
	IParameterAliases,
	Parameter
} from '../../../lingo/core/entity/Aliases'
import {IQEntityInternal} from "../../../lingo/core/entity/Entity";
import {
	IQFieldInternal,
	IQOrderableField
}                         from "../../../lingo/core/field/Field";
import {IQFunction}       from "../../../lingo/core/field/Functions";

/**
 * Created by Papa on 10/18/2016.
 */

const ALIASES = ['a', 'b', 'c', 'd', 'e',
	'f', 'g', 'h', 'i', 'j',
	'k', 'l', 'm', 'n', 'o',
	'p', 'q', 'r', 's', 't',
	'u', 'v', 'w', 'x', 'y', 'z'];

export class AliasCache {

	private lastAlias;

	constructor(protected aliasPrefix = '') {
		this.reset();
	}

	getFollowingAlias(): string {
		let currentAlias = this.lastAlias;
		for (var i = 2; i >= 0; i--) {
			let currentIndex = currentAlias[i];
			currentIndex     = (currentIndex + 1) % 26;
			currentAlias[i]  = currentIndex;
			if (currentIndex !== 0) {
				break;
			}
		}
		let aliasString = this.aliasPrefix;
		for (var i = 0; i < 3; i++) {
			aliasString += ALIASES[currentAlias[i]];
		}

		if(aliasString === 'add') {
			aliasString = this.getFollowingAlias()
		}

		return aliasString;
	}

	reset() {
		this.lastAlias = [-1, -1, -1];
	}
}

export abstract class AliasMap<T, A>
	implements IAliasMap<T, A> {
	protected aliasMap: Map<T, A> = new Map<T, A>();

	constructor(
		protected aliasCache: AliasCache
	) {
	}

	getNextAlias(
		object: T
	): string {
		if (this.hasAliasFor(object)) {
			return <string><any>this.getExistingAlias(object);
		}
		let aliasString = this.aliasCache.getFollowingAlias();
		this.aliasMap.set(object, <A><any>aliasString);

		return aliasString;
	}

	abstract getExistingAlias(
		object: T
	): A;

	hasAliasFor(
		object: T
	): boolean {
		return this.aliasMap.has(object);
	}

}

export class EntityAliases
	extends AliasMap<IQEntityInternal<any>, string>
	implements IEntityAliases {

	private parameterAliases;

	constructor(
		entityAliasCache         = new AliasCache('E'),
		private columnAliasCache = new AliasCache('C'),
		parameterAliasCache      = new AliasCache('P')
	) {
		super(entityAliasCache);
		this.parameterAliases = new ParameterAliases(parameterAliasCache);
	}

	getParams( //
	): IParameterAliases {
		return this.parameterAliases;
	}

	getNewFieldColumnAliases(): IFieldColumnAliases<any> {
		return new FieldColumnAliases(this, this.columnAliasCache);
	}

	getExistingAlias(
		entity: IQEntityInternal<any>
	): string {
		if (!this.hasAliasFor(entity)) {
			throw new Error(`No alias found for entity ${entity.__driver__.dbEntity.name}`);
		}
		return this.aliasMap.get(entity);
	}

	getOnlyAlias( //
	): string {
		if (this.aliasMap.size !== 1) {
			return `Expecting only 1 entry in Field's alias map`;
		}
		return this.aliasMap.get(this.aliasMap.keys().next().value);
	}

}

export class ParameterAliases
	extends AliasMap<IQFunction<any>, Parameter>
	implements IParameterAliases {

	constructor(
		aliasCache: AliasCache
	) {
		super(aliasCache);
	}

	getNextAlias(
		object: IQFunction<any>
	): string {
		if (this.hasAliasFor(object)) {
			return this.getExistingAlias(object).alias;
		}
		let aliasString          = this.aliasCache.getFollowingAlias();
		let parameter: Parameter = {
			alias: aliasString,
			value: object.value
		};
		this.aliasMap.set(object, parameter);

		return aliasString;
	}

	getExistingAlias(
		field: IQFunction<any>
	): Parameter {
		if (!this.hasAliasFor(field)) {
			throw new Error(`No alias found for a parameter`);
		}
		return this.aliasMap.get(field);
	}

	getParameters( //
	): { [alias: string]: Parameter } {
		let parameters = {};
		this.aliasMap.forEach((
			value,
			key
		) => {
			parameters[value.alias] = value;
		});

		return parameters;
	}

}

export class FieldColumnAliases
	extends AliasMap<IQOrderableField<any>, string>
	implements IFieldColumnAliases<any> {

	constructor(
		protected _entityAliases: IEntityAliases,
		aliasCache: AliasCache
	) {
		super(aliasCache);
	}

	get entityAliases( //
	): IEntityAliases {
		return this._entityAliases
	}

	getExistingAlias(
		field: IQOrderableField<any>
	): string {
		if (!this.hasAliasFor(field)) {
			const qField = <IQFieldInternal<any>>field;
			throw new Error(`No alias found for property ${qField.dbProperty.entity.name}.${qField.dbProperty.name}`);
		}
		return this.aliasMap.get(field);
	}

}
