# TQHS Generated Goal Entity Query Object

<!-- TOC -->

- [TQHS Generated Goal Entity Query Object](#tqhs-generated-goal-entity-query-object)
    - [Entity Query Interface](#entity-query-interface)
    - [Entity Query Implementation](#entity-query-implementation)

<!-- /TOC -->

Given this [schema](../schema.md) these are the auto-generated
artifacts for the Goal Entity

## Entity Query Interface

```ts
//Entity Query
export interface IGoal extends IEntity {
	// Properties
	accomplished?: boolean;
	description?: string;
	goalId?: number;
	name?: string;
	dueDate?: Date;
	// Relations
	tasks?: ITask
}
```

## Entity Query Implementation

```ts
// Entity Query Implementation
export class QGoal extends QEntity
{
	static db(
		databaseName?: string
	): IEntityDatabaseFacade<Goal, IGoal, QGoal> {
		databaseName = QEntity.getDatabaseName(Goal, databaseName);
		return TQ.db(databaseName).getEntityFacade<Goal, IGoal, QGoal>(Goal, QGoal, 'Goal');
	}

	static find(
		databaseName?: string
	):IEntityFind<Goal, IGoal> {
		return this.db(databaseName).find;
	}

	static findOne(
		databaseName?: string
	):IEntityFindOne<Goal, IGoal> {
		return this.db(databaseName).findOne;
	}

	static search(
		databaseName?: string
	):IEntitySearch<Goal, IGoal> {
		return this.db(databaseName).search;
	}

	static searchOne(
		databaseName?: string
	):IEntitySearchOne<Goal, IGoal> {
		return this.db(databaseName).searchOne;
	}

	static async create(
		entity: Goal,
		databaseName?: string
	):Promise<Goal> {
		return await this.db(databaseName).create(entity);
	}

	static async update(
		entity: Goal,
		databaseName?: string
	):Promise<Goal> {
		return await this.db(databaseName).update(entity);
	}

	static async updateWhere(
		rawUpdate: RawUpdate<IGoal, QGoal> | {( ...args: any[] ) : RawUpdate<IGoal, QGoal>},
		databaseName?: string
	): Promise<void> {
		return await this.db(databaseName).updateWhere(rawUpdate);
	}

	static async delete(
		entity: Goal,
		databaseName?: string
	):Promise<Goal> {
		return await this.db(databaseName).delete(entity);
	}

	static async deleteWhere(
		rawDelete: RawDelete<QGoal> | {( ...args: any[] ) : RawDelete<QGoal>},
		databaseName?: string
	): Promise<void> {
		return await this.db(databaseName).deleteWhere(rawDelete);
	}

	static async save(
		entity: Goal,
		databaseName?: string
	):Promise<Goal> {
		return await this.db(databaseName).save(entity);
	}

	static from(
		databaseName?:string
	):QGoal {
			return this.db(databaseName).from();
	}

	// Fields
	accomplished: IQBooleanField;
	description: IQStringField;
	goalId: IQNumberField;
	name: IQStringField;
	dueDate: IQDateField;

	// Relations
	tasks: IQOneToManyRelation<QTask>;

	constructor(
		qEntityConstructor: new( ...args: any[] ) => IQEntity,
		entityConstructor: {new(): any},
		entityName: string,
		fromClausePosition?: number[],
		relationPropertyName?:string,
		joinType?: JoinType
	) {
		super(qEntityConstructor, entityConstructor, entityName, fromClausePosition, relationPropertyName, joinType);
		this.accomplished = new QBooleanField(this, qEntityConstructor, entityName, 'accomplished');
		this.description = new QStringField(this, qEntityConstructor, entityName, 'description');
		this.goalId = new QNumberField(this, qEntityConstructor, entityName, 'goalId');
		this.name = new QStringField(this, qEntityConstructor, entityName, 'name');
		this.dueDate = new QDateField(this, qEntityConstructor, entityName, 'dueDate');

		this.tasks = new QOneToManyRelation(this, qEntityConstructor, entityName, 'tasks', 'Task', Task, QTask);
	}

}
TQ.addQEntity(Goal, QGoal);
```