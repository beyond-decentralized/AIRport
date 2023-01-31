import {IQOrderableField} from "../field/IQFieldInternal";
import {IQFunction}       from "../field/IQFunctions";
import { IQEntityInternal } from "./IQEntityDriver";

export interface IAliasMap<T, A> {

	getNextAlias(
		object: T
	): string;

	getExistingAlias(
		object: T
	): A;

	hasAliasFor(
		object: T
	): boolean

}

export interface IEntityAliases
	extends IAliasMap<IQEntityInternal, string> {

	getParams( //
	): IParameterAliases;

	getNewFieldColumnAliases( //
	): IFieldColumnAliases<any>;

	getExistingAlias(
		entity: IQEntityInternal
	): string;

	getOnlyAlias( //
	): string;

}

export interface Parameter {
	alias: string;
	value: boolean | Date | number | string;
}

export interface IParameterAliases
	extends IAliasMap<IQFunction<any>, Parameter> {

	getNextAlias(
		object: IQFunction<any>
	): string;

	getExistingAlias(
		field: IQFunction<any>
	): Parameter

	getParameters( //
	): { [alias: string]: Parameter };

}

export interface IFieldColumnAliases<IQF extends IQOrderableField<IQF>>
	extends IAliasMap<IQOrderableField<IQF>, string> {

	entityAliases: IEntityAliases;

	getExistingAlias(
		field: IQOrderableField<IQF>
	): string;
}

export interface IAliases {

	entityAliases: IEntityAliases;

	getExistingAlias(
		field: IQOrderableField<any>
	): string;

}