// import {
// 	IColumn, IEntity,
// 	IIndexedEntity, IIndexedSchema,
// 	IQEntity,
// 	IQOperableField,
// 	IRelation,
// 	IRelationColumnReference,
// 	JoinColumnConfiguration,
// 	JSONBaseOperation,
// 	OneToManyElements,
// 	SchemaIndex,
// 	SQLDataType,
// 	TableIndex
// } from "@airport/air-control";
// import { IOperation } from "@airport/ground-control";
// import { FourIdsEntityHistory } from "../../../../terminal/src/data/history/model/FourIdsEntityHistory";
// import { FiveIdsRepositoryEntity } from "../../../../terminal/src/data/repository/model/FiveIdsRepositoryEntity";
// import { SingleIdRepositoryEntity } from "../../../../terminal/src/data/repository/model/SingleIdRepositoryEntity";
// import { ThreeIdsRepositoryEntity } from "../../../../terminal/src/data/repository/model/ThreeIdsRepositoryEntity";
// import { TwoIdsRepositoryEntity } from "../../../../terminal/src/data/repository/model/TwoIdsRepositoryEntity";
// import { QRepositoryEntity } from "../../generated/data/repository/model/qRepositoryEntity";
// import {
// 	IQEntityInternal,
// 	QEntityConstructor
// } from "../../../../air-control/src/impl/core/entity/Entity";
// import { EntityMetadata, IdConfiguration } from "../entity/metadata/EntityMetadata";
// import { MetadataStore } from "../entity/metadata/MetadataStore";
// import { IQInternalRelation } from "../../../../air-control/src/impl/core/entity/Relation";
// import { QBooleanField } from "../../../../air-control/src/impl/core/field/BooleanField";
// import { QDateField } from "../../../../air-control/src/impl/core/field/DateField";
// import { IQFieldInternal } from "../../../../air-control/src/impl/core/field/Field";
// import { QNumberField } from "../../../../air-control/src/impl/core/field/NumberField";
// import { IQOperableFieldInternal } from "../../../../air-control/src/impl/core/field/OperableField";
// import { QStringField } from "../../../../air-control/src/impl/core/field/StringField";
// import { QUntypedField } from "../../../../air-control/src/impl/core/field/UntypedField";
// import {
//  IDatabaseFacadeInternal,
//  SchemaUtils,
// 	MetadataUtils,
// 	ReferencedColumnAndValueData,
// 	ReferencedColumnData
// } from "@airport/tower";
// import { RepositoryEntityType } from "./RepositoryEntityType";
//
// /**
//  * Created by Papa on 9/2/2016.
//  */
//
// /**
//  * Provides an entry point into MetadataUtils when what is available is the QEntity
//  */
// export class QMetadataUtils {
//
// 	static getRepositoryEntityType(
// 		qEntity: IQEntityInternal
// 	): RepositoryEntityType {
// 		let classConstr = QMetadataUtils.getEntityConstructor(qEntity).prototype;
// 		if (classConstr instanceof SingleIdRepositoryEntity) {
// 			return RepositoryEntityType.SINGLE_ID;
// 		} else if (classConstr instanceof TwoIdsRepositoryEntity) {
// 			return RepositoryEntityType.TWO_IDS;
// 		} else if (classConstr instanceof ThreeIdsRepositoryEntity) {
// 			return RepositoryEntityType.THREE_IDS;
// 		} else if (classConstr instanceof FourIdsEntityHistory) {
// 			return RepositoryEntityType.FOUR_IDS;
// 		} else if (classConstr instanceof FiveIdsRepositoryEntity) {
// 			return RepositoryEntityType.FIVE_IDS;
// 		} else {
// 			return RepositoryEntityType.NOT_REPOSITORY_ENTITY;
// 		}
// 	}
//
// 	static isIdColumnName<IQE extends IQEntityInternal>(
// 		columnName: string,
// 		repositoryEntityType: RepositoryEntityType,
// 		qEntity: IQE
// 	): boolean {
// 		switch (repositoryEntityType) {
// 			case RepositoryEntityType.FIVE_IDS:
// 				if (columnName === this.getIdColumnName(4, qEntity)) {
// 					return true;
// 				}
// 			case RepositoryEntityType.FOUR_IDS:
// 				if (columnName === this.getIdColumnName(3, qEntity)) {
// 					return true;
// 				}
// 			case RepositoryEntityType.THREE_IDS:
// 				if (columnName === this.getIdColumnName(2, qEntity)) {
// 					return true;
// 				}
// 			case RepositoryEntityType.TWO_IDS:
// 				if (columnName === this.getIdColumnName(1, qEntity)) {
// 					return true;
// 				}
// 			case RepositoryEntityType.SINGLE_ID:
// 				if (columnName === this.getIdColumnName(0, qEntity)) {
// 					return true;
// 				}
// 				break;
// 			case RepositoryEntityType.NOT_REPOSITORY_ENTITY:
// 				throw new Error(
// 				`Cannot determine @Id for a non-repository entity.`);
// 			default:
// 				throw new Error(
// 				`Unknown RepositoryEntityType ${repositoryEntityType}`);
// 		}
// 		return false;
// 	}
//
// 	static getIdColumnName<IQE extends IQEntityInternal>(
// 		idColumnIndex: number,
// 		qEntity: IQE
// 	): string {
// 		return qEntity.__driver__.dbEntity.idColumns[idColumnIndex].name;
// 	}
//
// 	static getIdColumn<IQE extends IQEntityInternal>(
// 		idColumnIndex: number,
// 		qEntity: IQE
// 	): IQOperableFieldInternal<any, JSONBaseOperation, any, any> {
// 		return qEntity.__driver__.idColumns[idColumnIndex];
// 	}
//
// 	static addIdColumnsToNonEntityTreeSelect<IQE extends IQEntityInternal>(
// 		selectClause: any,
// 		repositoryEntityType: RepositoryEntityType,
// 		qEntity: IQE
// 	): void {
// 		switch (repositoryEntityType) {
// 			case RepositoryEntityType.FIVE_IDS:
// 				this.addIdColumnToSelectClause(4, qEntity, selectClause);
// 			case RepositoryEntityType.FOUR_IDS:
// 				this.addIdColumnToSelectClause(3, qEntity, selectClause);
// 			case RepositoryEntityType.THREE_IDS:
// 				this.addIdColumnToSelectClause(2, qEntity, selectClause);
// 			case RepositoryEntityType.TWO_IDS:
// 				this.addIdColumnToSelectClause(1, qEntity, selectClause);
// 			case RepositoryEntityType.SINGLE_ID:
// 				this.addIdColumnToSelectClause(0, qEntity, selectClause);
// 				break;
// 			default:
// 				throw new Error(
// 				`Cannot add Ids to Tree Select for non-Id Entity Types`);
// 		}
// 	}
//
// 	static getOneToManyConfigMap<IQE extends IQEntityInternal>(
// 		qEntity: IQE
// 	): { [name: string]: OneToManyElements } {
// 		return qEntity.__driver__.getOneToManyConfigMap();
// 	}
//
// 	static getNonRelationalColumnName<IQE extends IQEntityInternal>(
// 		propertyName: string,
// 		qEntity: IQE
// 	): string {
// 		const indexedEntity = SchemaUtils.getIndexedEntity(
// 			qEntity.__driver__.schemaIndex, qEntity.__driver__.tableIndex);
//
// 		const columnIndex = indexedEntity.propertyMap[propertyName].columnRef.index;
//
// 		return indexedEntity.entity.columns[columnIndex].name;
// 	}
//
// 	static getColumnPropertyName<IQE extends IQEntityInternal>(
// 		columnName: string,
// 		qEntity: IQE
// 	): string {
// 		const indexedEntity = SchemaUtils.getIndexedEntity(
// 			qEntity.__driver__.schemaIndex, qEntity.__driver__.tableIndex);
//
// 		const columnIndex = indexedEntity.columnMap[columnName].index;
// 		const propertyIndex = indexedEntity.entity.columns[columnIndex].propertyRef.index;
//
// 		return indexedEntity.entity.properties[propertyIndex].name;
// 	}
//
// 	static getJoinColumnName<IQE extends IQEntityInternal>(
// 		propertyName: string,
// 		qEntity: IQE
// 	): string {
// 		const indexedEntity = SchemaUtils.getIndexedEntity(
// 			qEntity.__driver__.schemaIndex, qEntity.__driver__.tableIndex);
// 		const property = SchemaUtils.getPropertyByName(indexedEntity, propertyName);
// 		const relationRef = SchemaUtils.getRelationRef(property);
// 		const relation = indexedEntity.entity.relations[relationRef.index];
//
// 		if (relation.relationColumnRefs.length != 1) {
// 			throw new Error(
// 			`More than one JoinColumn exists on ${indexedEntity.entity.name}.${propertyName}`);
// 		}
// 		const columnIndex = relation.relationColumnRefs[0].ownColumnIndex;
//
// 		return indexedEntity.entity.columns[columnIndex].name;
// 	}
//
// 	static getRelationByReference<IQE extends IQEntityInternal>(
// 		relationReference: number | string,
// 		qEntity: IQE,
// 	): IRelation {
// 		if (typeof relationReference === 'number') {
// 			const iSchema = SchemaUtils.getISchema(qEntity.__driver__.schemaIndex);
// 			const iEntity = SchemaUtils.getIEntity(iSchema, qEntity.__driver__.tableIndex);
// 			const iRelation = iEntity.relations[relationReference];
// 			if (!iRelation) {
// 				throw new Error(
// 				`Did not find a relation on property ${iEntity.name} @ index ${relationReference}.`);
// 			}
//
// 			return iRelation;
// 		} else {
// 			const indexedEntity = SchemaUtils.getIndexedEntity(
// 				qEntity.__driver__.schemaIndex, qEntity.__driver__.tableIndex);
// 			const relationRef = indexedEntity.propertyMap[relationReference].relationRef;
// 			if (!relationRef) {
// 				throw new Error(
// 				`Did not find a relation on property ${indexedEntity.entity.name}.${relationReference}.`);
// 			}
//
// 			return indexedEntity.entity.relations[relationRef.index];
// 		}
// 	}
//
// 	static getJoinColumnConfigurations<IQE extends IQEntityInternal>(
// 		propertyName: string,
// 		qEntity: IQE,
// 		dbFacade: IDatabaseFacadeInternal,
// 		fromOneToMany: boolean = false
// 	): JoinColumnConfiguration[] {
// 		let entityMetadata: EntityMetadata = this.getEntityMetadata(qEntity);
//
// 		let joinColumnConfigs = MetadataUtils.getJoinColumnConfigurations(propertyName, entityMetadata);
//
// 		if (joinColumnConfigs) {
// 			return joinColumnConfigs;
// 		}
// 		if (fromOneToMany) {
// 			throw new Error(
// 			`Did not find any @JoinColumn(s) on an inverse @ManyToOne.`);
// 		}
//
// 		let oneToMany = MetadataStore.getOneToManyConfig(entityMetadata, propertyName);
// 		if (!oneToMany) {
// 			throw new Error(
// 			`Cannot retrieve @JoinColumn(s) for non @ManyToOne/@OneToMany properties.`);
// 		}
// 		if (!oneToMany.mappedBy) {
// 			throw new Error(
// 			`No @JoinColumn(s) or 'mappedBy' found for @OneToMany.`);
// 		}
//
// 		let oneToManyRelation = this.getRelation(qEntity, propertyName);
// 		let manyToOneQEntity = dbFacade.getQEntityByIndex(oneToManyRelation.schemaIndex, oneToManyRelation.tableIndex);
//
// 		return this.getJoinColumnConfigurations(oneToMany.mappedBy, manyToOneQEntity, dbFacade, true);
// 	}
//
// 	static isTransientProperty<IQE extends IQEntityInternal>(
// 		propertyName: string,
// 		qEntity: IQE
// 	): boolean {
// 		return !SchemaUtils.isSchemaProperty(this.getQEntityIndexes(qEntity), propertyName);
// 	}
//
// 	static getIdKeyFromRow<IQE extends IQEntityInternal>(
// 		qEntity: IQE,
// 		row: any
// 	) {
// 		return this.getIdColumns(qEntity).map((idColumn) => {
// 			let idFieldName = this.getFieldName(idColumn);
// 			let idValue = row[idFieldName];
// 			if (!idValue) {
// 				throw new Error(
// 				`Id value not found for ${this.getEntityName(qEntity)}.${idFieldName}`);
// 			}
// 		}).join('|');
// 	}
//
// 	static getIdKey<IQE extends IQEntityInternal>(
// 		dbFacade: IDatabaseFacadeInternal,
// 		qEntity: IQE,
// 		entityObject: any,
// 		noIdValueCallback?: {
// 			(referencedData: ReferencedColumnAndValueData): boolean;
// 		},
// 		idValueCallback?: {
// 			(referencedData: ReferencedColumnAndValueData): void;
// 		}
// 	): string {
// 		let entityMetadata: EntityMetadata = this.getEntityMetadata(qEntity);
//
// 		return MetadataUtils.getIdKey(entityObject, entityMetadata, dbFacade, true, noIdValueCallback, idValueCallback);
// 	}
//
// 	static isIdProperty<IQE extends IQEntityInternal>(
// 		qEntity: IQE,
// 		propertyName: string
// 	): boolean {
// 		return MetadataUtils.isIdProperty(QMetadataUtils.getEntityMetadata(qEntity), propertyName);
// 	}
//
// 	static getOnlyIdProperty<IQE extends IQEntityInternal>(
// 		qEntity: IQE
// 	): string {
// 		let onlyIdProperty;
//
// 		const idConfig = this.getIdConfiguration(qEntity);
// 		for (const idProperty in idConfig) {
// 			if (onlyIdProperty) {
// 				throw new Error(
// 				`Cannot generate @Id for a multi-column id entity.`);
// 			}
// 			onlyIdProperty = idProperty;
// 			if (!idConfig[idProperty]) {
// 				throw new Error(
// 				`@Id config ${this.getEntityName(qEntity)}.${idProperty} is not set.`);
// 			}
// 		}
// 		if (!onlyIdProperty) {
// 			throw new Error(
// 			`Could not find any @Id fields for ${this.getEntityName(qEntity)}.`);
// 		}
//
// 		return onlyIdProperty;
// 	}
//
// 	static getIdConfiguration<IQE extends IQEntityInternal>(qEntity: IQE): IdConfiguration {
// 		return MetadataUtils.getIdConfiguration(QMetadataUtils.getEntityMetadata(qEntity));
// 	}
//
// 	static hasIds<IQE extends IQEntityInternal>(qEntity: IQE): boolean {
// 		let idConfiguration = this.getIdConfiguration(qEntity);
// 		if (!idConfiguration) {
// 			return false;
// 		}
// 		return Object.keys(idConfiguration).length > 0;
// 	}
//
// 	static isGeneratedValue<IQE extends IQEntityInternal>(
// 		qEntity: IQE,
// 		propertyName: string
// 	): boolean {
// 		let entityMetadata: EntityMetadata = this.getEntityMetadata(qEntity);
// 		return MetadataStore.isGeneratedValueProperty(entityMetadata, propertyName);
// 	}
//
// 	static getFieldMap<IQE extends IQEntityInternal>(qEntity: IQE): { [propertyName: string]: IQOperableFieldInternal<any, JSONBaseOperation, any, any> } {
// 		return qEntity.__driver__.entityFieldMap;
// 	}
//
// 	static getRelationMap<IQE extends IQEntityInternal>(qEntity: IQE): { [propertyName: string]: IQInternalRelation<any> } {
// 		return qEntity.__driver__.getEntityRelationMap();
// 	}
//
// 	static getTableName<IQE extends IQEntityInternal>(qEntity: IQE): string {
// 		let entityMetadata: EntityMetadata = this.getEntityMetadata(qEntity);
// 		let tableName = MetadataUtils.getTableName(entityMetadata, QMetadataUtils.getEntityName(qEntity));
//
// 		if (!tableName) {
// 			return QMetadataUtils.getEntityName(qEntity);
// 		}
// 		return tableName;
// 	}
//
// 	static isLocal<IQE extends IQEntityInternal>(
// 		qEntity: IQE
// 	): boolean {
// 		let entityMetadata: EntityMetadata = this.getEntityMetadata(qEntity);
//
// 		return MetadataUtils.isLocal(entityMetadata);
// 	}
//
// 	static isRepositoryEntity<IQE extends IQEntityInternal>(
// 		qEntity: IQE
// 	): boolean {
// 		return qEntity instanceof QRepositoryEntity;
// 	}
//
// 	static getQEntityIndexes<IQE extends IQEntityInternal>(
// 		qEntity: IQE
// 	): [SchemaIndex, TableIndex] {
// 		throw new Error(`Not implemented`);
// 	}
//
// 	static getOneToManyConfig<IQE extends IQEntityInternal>(
// 		relationIndex: number,
// 		qEntity: IQE
// 	): OneToManyElements {
// 		let entityMetadata: EntityMetadata = this.getEntityMetadata(qEntity);
//
// 		const [schemaIndex, tableIndex] = this.getQEntityIndexes(qEntity);
//
// 		return SchemaUtils.getOneToManyConfig(schemaIndex, tableIndex, relationIndex);
// 	}
//
// 	static forEachColumnsOfRelation(
// 		propertyName: string,
// 		qEntity: IQEntityInternal,
// 		manyToOneReference: any,
// 		dbFacade: IDatabaseFacadeInternal,
// 		callback: {
// 			(
// 				columnName: string,
// 				referencedColumnName: string,
// 				referencedData: ReferencedColumnAndValueData
// 			): void | boolean
// 		},
// 		failOnNoValue: boolean = true
// 	) {
// 		const idxSchema = SchemaUtils.getIndexedSchema(qEntity.__driver__.schemaIndex);
// 		const idxEntity = SchemaUtils.getIndexedEntity(idxSchema, qEntity.__driver__.tableIndex);
//
// 		const iProperty = idxEntity.propertyMap[propertyName];
// 		const iRelation = idxEntity.entity.relations[iProperty.relationRef.index];
// 	}
//
// 	static forEachColumnOfRelation(
// 		propertyName: string,
// 		qEntity: IQEntityInternal,
// 		manyToOneReference: any,
// 		dbFacade: IDatabaseFacadeInternal,
// 		callback: {
// 			(
// 				columnName: string,
// 				referencedColumnName: string,
// 				referencedData: ReferencedColumnAndValueData
// 			): void | boolean
// 		},
// 		failOnNoValue: boolean = true
// 	) {
// 		let joinColumnConfigurations = this.getJoinColumnConfigurations(propertyName, qEntity, dbFacade);
// 		let entityRelation = QMetadataUtils.getRelation(qEntity, propertyName);
// 		let oneToManyQEntity: IQEntityInternal = dbFacade.getQEntityByIndex(entityRelation.schemaIndex, entityRelation.tableIndex);
//
// 		// if the value is null, stub it out to get column null values
// 		if (!failOnNoValue && MetadataUtils.isEmpty(manyToOneReference)) {
// 			manyToOneReference = {};
// 		}
// 		joinColumnConfigurations.some((joinColumnConfig) => {
// 			let columnName = joinColumnConfig.name;
// 			let entityField: IQOperableFieldInternal<any, any, any, any>;
// 			if (joinColumnConfigurations.length > 1) {
// 				entityField = qEntity[columnName];
// 			} else {
// 				entityField = qEntity[propertyName];
// 			}
// 			let referencedColumnName = joinColumnConfig.referencedColumnName;
// 			let data: ReferencedColumnAndValueData;
// 			if (!referencedColumnName) {
// 				// get the related object's id
// 				data = QMetadataUtils.getUniqueIdValueAndType(entityField, manyToOneReference, oneToManyQEntity, failOnNoValue);
// 			} else {
// 				data = QMetadataUtils.getColumnAndValueData(entityField, manyToOneReference, <string>referencedColumnName, oneToManyQEntity, dbFacade, failOnNoValue);
// 			}
//
// 			if (callback(columnName, <string>referencedColumnName, data)) {
// 				return true;
// 			}
// 		});
// 	}
//
// 	static forEachColumnTypeOfRelation(
// 		relationIndexOrPropertyName: number | string,
// 		qEntity: IQEntityInternal,
// 		callback: {
// 			(
// 				columnName: string,
// 				referencedColumnName: string,
// 				nameChainAndSQLDataType: ReferencedColumnData
// 			): void | boolean
// 		}
// 	): void {
// 		const idxSchema = SchemaUtils.getIndexedSchema(qEntity.__driver__.schemaIndex);
// 		const idxEntity = SchemaUtils.getIndexedEntity(
// 			idxSchema, qEntity.__driver__.tableIndex);
// 		const iRelation = this.getRelationByReference(relationIndexOrPropertyName, qEntity);
// 		const relatedIxSchema = SchemaUtils.getRelationSchema(idxSchema, iRelation);
// 		const relatedIxEntity = SchemaUtils.getRelatedIdxEntity(idxSchema, iRelation);
//
// 		for (const relationColumnRef of iRelation.idxRelationColumns) {
// 			const ownColumnName = idxEntity.columns[relationColumnRef.ownColumnIndex].name;
// 			const referencedColumn = relatedIxEntity.columns[relationColumnRef.relationColumnIndex];
//
// 			const nameChainAndSQLDataType = this.getColumnRelationChainAndType(relatedIxSchema, referencedColumn, relatedIxEntity.entity);
//
// 			if (callback(ownColumnName, referencedColumn.name, nameChainAndSQLDataType)) {
// 				return;
// 			}
// 		}
// 	}
//
// 	/**
// 	 * Get value from a column of a given entity (or via it's relations to other entities).
// 	 *
// 	 * @param entityObject  The actual object to get the value from
// 	 * @param columnName  The name of the COLUMN (not property).
// 	 * @param qEntity  The IQEntity for the entity type of the object
// 	 * @param dbFacade  The IWholeDatabaseFacade from which to get IQEntity definitions for relations
// 	 * @param failOnNoValue  Should the method fail if no value is found
// 	 * @return {any}
// 	 */
// 	static getColumnAndValueData(
// 		entityField: IQOperableFieldInternal<any, any, any, any>,
// 		entityObject: any,
// 		columnName: string,
// 		qEntity: IQEntityInternal,
// 		dbFacade: IDatabaseFacadeInternal,
// 		failOnNoValue: boolean = true
// 	): ReferencedColumnAndValueData {
// 		let entityMetadata = this.getEntityMetadata(qEntity);
// 		let propertyName = MetadataStore.getPropertyNameForNonRelationalColumnName(entityMetadata, columnName);
// 		if (propertyName) {
// 			// @Column on a non-relational property
// 			return this.verifyJoinableColumnValue(entityField, entityObject, columnName, propertyName, qEntity, failOnNoValue);
// 		}
//
// 		// @JoinColumn on a @ManyToOneReference
// 		propertyName = MetadataStore.getPropertyNameForJoinColumnConfigName(entityMetadata, columnName);
// 		if (!propertyName) {
// 			// @JoinColumns on a @ManyToOneReference
// 			propertyName = MetadataStore.getPropertyNameForJoinColumnsConfigName(entityMetadata, columnName);
// 			if (!propertyName) {
// 				throw new Error(
// 				`Did not find a property for column name '${columnName}'
// 				of entity '${MetadataStore.getEntityName(entityMetadata)}'.`);
// 			}
// 		}
//
// 		let relationValue = entityObject[propertyName];
// 		if (!relationValue) {
// 			if (failOnNoValue) {
// 				throw new Error(`Cannot retrieve value for column '${columnName}
// 				of entity '${MetadataStore.getEntityName(entityMetadata)}',
// 				relation property '${propertyName}' is not set.`);
// 			}
// 			return null;
// 		}
//
// 		let relation = this.getRelation(qEntity, propertyName);
// 		let relationQEntity = dbFacade.getQEntityByIndex(relation.schemaIndex, relation.tableIndex);
// 		let joinColumnConfigurations = this.getJoinColumnConfigurations(propertyName, qEntity, dbFacade);
// 		let referencedData: ReferencedColumnAndValueData;
// 		joinColumnConfigurations.some((joinColumnConfig) => {
// 			let joinColumnName = joinColumnConfig.name;
// 			if (joinColumnName != columnName) {
// 				return false;
// 			}
// 			let referencedColumnName = joinColumnConfig.referencedColumnName;
//
// 			if (!referencedColumnName) {
// 				// get the parent object's id
// 				referencedData = this.getUniqueIdValueAndType(entityField, relationValue, relationQEntity, failOnNoValue);
// 			} else {
// 				referencedData = this.getColumnAndValueData(entityField, relationValue, <string>referencedColumnName, relationQEntity, dbFacade, failOnNoValue);
// 			}
// 			return true;
// 		});
// 		if (!referencedData) {
// 			throw new Error(`Could not find referencedData for column '${columnName}'
// 			of property '${this.getEntityName(qEntity)}.${propertyName}'`);
// 		}
//
// 		return this.verifyJoinableColumn(referencedData, columnName, propertyName, qEntity, failOnNoValue);
// 	}
//
// 	static getColumnRelationChainAndType(
// 		idxSchema: IIndexedSchema,
// 		iColumn: IColumn,
// 		iEntity: IEntity,
// 		propertyNameChain: string[] = [],
// 	): ReferencedColumnData {
// 		const iProperty = iEntity.properties[iColumn.propertyRef.index];
// 		const propertyName = iProperty.name;
// 		propertyNameChain.push(propertyName);
// 		if (iProperty.columnRef) {
// 			return {
// 				propertyNameChain: propertyNameChain,
// 				sqlDataType: iColumn.type
// 			};
// 		}
// 		const iRelation = iEntity.relations[iProperty.relationRef.index];
// 		const relationIdxSchema = SchemaUtils.getRelationSchema(idxSchema, iRelation);
// 		const relationIdxEntity = SchemaUtils.getRelatedIdxEntity(
// 			idxSchema, iRelation);
//
// 		const relationColumnIndex = iRelation.relationColumnRefs.filter(
// 			relationColumnRef =>
// 				relationColumnRef.ownColumnIndex === iColumn.index
// 		)[0].relationColumnIndex;
// 		const relationEntity = relationIdxEntity.entity;
// 		const relationColumn = relationEntity.columns[relationColumnIndex];
//
// 		return this.getColumnRelationChainAndType(
// 			relationIdxSchema, relationColumn, relationEntity, propertyNameChain);
//
// 	}
//
// 	static getEntityMetadata(qEntity: IQEntityInternal): EntityMetadata {
// 		return <EntityMetadata><any>this.getEntityConstructor(qEntity);
// 	}
//
// 	static getEntityConstructor(qEntity: IQEntityInternal): any {
// 		return qEntity.__driver__.entityConstructor;
// 	}
//
// 	static getNewEntity(qEntity: IQEntityInternal): any {
// 		return new qEntity.__driver__.entityConstructor();
// 	}
//
// 	static getTableIndex(qEntity: IQEntityInternal): number {
//
// 		const qEntityConstructor = this.getQEntityConstructor(qEntity);
//
// 		return qEntityConstructor.tableIndex;
// 	}
//
// 	static getNonRelationalSqlDataType(
// 		qEntity: IQEntityInternal,
// 		propertyName: string
// 	): SQLDataType {
// 		let field = this.getNonRelationalFieldByName(qEntity, propertyName);
// 		if (field instanceof QBooleanField) {
// 			return SQLDataType.BOOLEAN;
// 		} else if (field instanceof QDateField) {
// 			return SQLDataType.DATE;
// 		}
// 		if (field instanceof QNumberField) {
// 			return SQLDataType.NUMBER;
// 		}
// 		if (field instanceof QStringField) {
// 			return SQLDataType.STRING;
// 		}
// 		if (field instanceof QUntypedField) {
// 			return SQLDataType.ANY;
// 		}
// 		return undefined;
// 	}
//
// 	static getNonRelationalFieldByName(
// 		qEntity: IQEntityInternal,
// 		propertyName: string
// 	): IQOperableField<any, JSONBaseOperation, IOperation, any> {
// 		return qEntity.__driver__.entityFieldMap[propertyName];
// 	}
//
// 	static getRelation(
// 		qEntity: IQEntityInternal,
// 		propertyName: string
// 	): IQInternalRelation<any> {
// 		return qEntity.__driver__.getEntityRelationMap()[propertyName];
// 	}
//
// 	static getRelationByIndex(
// 		qEntity: IQEntityInternal,
// 		relationPropertyIndex: number
// 	): IQInternalRelation<any> {
// 		return qEntity.__driver__.relations[relationPropertyIndex];
// 	}
//
// 	static getQEntityConstructor(
// 		qEntity: IQEntity
// 	): QEntityConstructor {
// 		return (<any>qEntity).constructor;
// 	}
//
// 	static getAllColumns(
// 		qEntity: IQEntityInternal
// 	): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[] {
// 		return qEntity.__driver__.allColumns;
// 	}
//
// 	static getIdColumns(
// 		qEntity: IQEntityInternal
// 	): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[] {
// 		return qEntity.__driver__.idColumns;
// 	}
//
// 	private static addIdColumnToSelectClause<IQE extends IQEntityInternal>(
// 		idColumnIndex: number,
// 		qEntity: IQE,
// 		selectClause: any
// 	): void {
// 		let idColumn = this.getIdColumn(idColumnIndex, qEntity);
// 		selectClause[this.getColumnName(idColumn)] = idColumn;
// 	}
//
// }
