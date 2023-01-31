import { AirEntityId } from "@airport/aviation-communication";
import { DbColumn, DbEntity, IAirEntity, QueryBaseOperation, Repository_GUID, Repository_LocalId, SQLDataType } from "@airport/ground-control";
import { QEntityConstructor } from "../../implementation/core/entity/QEntity";
import { IFieldColumnAliases } from "../core/entity/IAliases";
import { IEntityIdProperties, IQAirEntity, IQEntity } from "../core/entity/IQEntity";
import { IQFieldInternal } from "../core/field/IQFieldInternal";
import { QueryLogicalOperation } from "../core/operation/ILogicalOperation";

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
	): QueryLogicalOperation

	in<Entity extends IAirEntity, IQ extends IQAirEntity>(
		entitiesOrIds: (Entity
			// | IQAirEntity
			// | IQAirEntityRelation<Entity, IQ>
			| AirEntityId | string)[],
		toObject: IQ
		// | IQRelation<IQ>
	): QueryLogicalOperation

	equalsInternal<IQ extends IQEntity>(
		entityId: string | number,
		toObject: IQ // | IQRelation<IQ>
	): QueryBaseOperation

	inInternal<IQ extends IQEntity>(
		entityIds: (string | number)[],
		toObject: IQ // | IQRelation<IQ>
	): QueryBaseOperation

	whereClauseToQueryOperation(
		whereClause: QueryBaseOperation,
		columnAliases: IFieldColumnAliases<any>,
		trackedRepositoryGUIDSet: Set<Repository_GUID>,
		trackedRepositoryLocalIdSet: Set<Repository_LocalId>
	): QueryBaseOperation

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