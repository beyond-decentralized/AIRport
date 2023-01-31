import { AirEntityId } from "@airport/aviation-communication";
import { DbColumn, DbEntity, IAirEntity, JSONBaseOperation, Repository_GUID, Repository_LocalId, SQLDataType } from "@airport/ground-control";
import { QEntityConstructor } from "../../implementation/core/entity/QEntity";
import { IFieldColumnAliases } from "../core/entity/Aliases";
import { IEntityIdProperties, IQAirEntity, IQEntity } from "../core/entity/Entity";
import { IQFieldInternal } from "../core/field/Field";
import { JSONLogicalOperation } from "../core/operation/LogicalOperation";

export interface ManyToOneColumnMapping {
	tableIndex: number;
	propertyChain: string[];
	value: any;
}

export interface ReferencedColumnData {
	propertyNameChains: string[][];
	sqlDataType: SQLDataType;
	value?: any;
}

export interface IdKeysByIdColumnIndex {
	arrayByIdColumnIndex: (number | string)[],
	mapByIdColumnName: { [columnName: string]: (number | string) }
}

export interface RepositorySheetSelectInfo {
	actorIdColumnIndex: number;
	actorRecordIdColumnIndex: number;
	repositoryIdColumnIndex: number;
	systemWideOperationIdColumn: DbColumn;
	selectClause?: IQFieldInternal<any>[];
	selectClauseColumns?: DbColumn[];
}

export interface IQueryUtils {

	equals<Entity extends IAirEntity, IQ extends IQAirEntity>(
		entityOrId: Entity | IQAirEntity
			// | IQAirEntityRelation<Entity, IQ> 
			| AirEntityId | string,
		toObject: IQ // | IQRelation<IQ>
	): JSONLogicalOperation

	in<Entity extends IAirEntity, IQ extends IQAirEntity>(
		entitiesOrIds: (Entity
			// | IQAirEntity
			// | IQAirEntityRelation<Entity, IQ>
			| AirEntityId | string)[],
		toObject: IQ
		// | IQRelation<IQ>
	): JSONLogicalOperation

	equalsInternal<IQ extends IQEntity>(
		entityId: string | number,
		toObject: IQ // | IQRelation<IQ>
	): JSONBaseOperation

	inInternal<IQ extends IQEntity>(
		entityIds: (string | number)[],
		toObject: IQ // | IQRelation<IQ>
	): JSONBaseOperation

	whereClauseToJSON(
		whereClause: JSONBaseOperation,
		columnAliases: IFieldColumnAliases<any>,
		trackedRepositoryGUIDSet: Set<Repository_GUID>,
		trackedRepositoryLocalIdSet: Set<Repository_LocalId>
	): JSONBaseOperation

	getQEntityConstructor<IQE extends IQEntity>(
		dbEntity: DbEntity
	): QEntityConstructor<IQE>;

	getIdKey(
		entityObject: IEntityIdProperties,
		dbEntity: DbEntity,
		failOnNoId?: boolean,
		// noIdValueCallback?: {
		// 	(
		// 		idColumn: DbColumn,
		// 		value: number | string,
		// 		propertyNameChains: string[][],
		// 	): boolean;
		// },
		idValueCallback?: {
			(
				idColumn: DbColumn,
				value: number | string,
				propertyNameChains: string[][],
			): void;
		},
	): string;

	getIdKeyInfo(
		entityObject: IEntityIdProperties,
		dbEntity: DbEntity,
		failOnNoId?: boolean,
		idValueCallback?: {
			(
				idColumn: DbColumn,
				value: number | string,
				propertyNameChains: string[][],
			): void;
		},
	): IdKeysByIdColumnIndex;

	getSheetSelectFromSetClause(
		dbEntity: DbEntity,
		qEntity: IQEntity,
		setClause: any,
		errorPrefix: string,
	): RepositorySheetSelectInfo

}