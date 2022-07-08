# Field constructs

## Purpose

Field constructs are mostly used to create WHERE clauses.  Main purpose
of fields is to define SQL operators.

Fields are also used in SELECT clause of non-Entity queries.

asc() & desc() methods of Fields are used in ORDER BY clause

Fields, along w/ relations are the main building blocks of Query Objects.

## OrderableField

All fields can be used in the order by clause.

```ts
export interface IQOrderableField<IQF extends IQOrderableField<IQF>> {

	asc(): IFieldInOrderBy<IQF>;

	desc(): IFieldInOrderBy<IQF>;
}
```

The actual objects used in the order clause are marked with:
```ts
interface IFieldInOrderBy<IQF extends IQOrderableField<IQF>> {
}
```


## OperableField

In addition to that all fields can be used in operations in WHERE and HAVING clauses.

```ts
interface IQOperableField<T, JO extends JSONBaseOperation, IO extends IOperation, IQF extends IQOperableField<T, JO, IO, any>>
extends IQOrderableField<IQF> {

	equals(
		value: T | IQF | RawFieldQuery<IQF> | {( ...args: any[] ): RawFieldQuery<IQF>}
	): JO;

	greaterThan(
		value: T | IQF | RawFieldQuery<IQF> | {( ...args: any[] ): RawFieldQuery<IQF>}
	);

	greaterThanOrEquals(
		value: T | IQF | RawFieldQuery<IQF> | {( ...args: any[] ): RawFieldQuery<IQF>}
	);

	isIn(
		values: (T | IQF | RawFieldQuery<IQF> | {( ...args: any[] ): RawFieldQuery<IQF>})[]
	): JO;


	isNotNull(): JO;

	isNull(): JO;

	lessThan(
		value: T | IQF | RawFieldQuery<IQF> | {( ...args: any[] ): RawFieldQuery<IQF>}
	);

	lessThanOrEquals(
		value: T | IQF | RawFieldQuery<IQF> | {( ...args: any[] ): RawFieldQuery<IQF>}
	);

	notEquals(
		value: T | IQF | RawFieldQuery<IQF> | {( ...args: any[] ): RawFieldQuery<IQF>}
	): JO;

	notIn(
		values: (T | IQF | RawFieldQuery<IQF> | {( ...args: any[] ): RawFieldQuery<IQF>})[]
	): JO;

}
```

## Real fields

Supported real field implementations are:

### BooleanField

```ts
interface IQBooleanField extends IQOperableField<boolean, JSONRawBooleanOperation, IBooleanOperation, IQBooleanField> {
}
```

### DateField

```ts
interface IQDateField extends IQOperableField<Date, JSONRawDateOperation, IDateOperation, IQDateField> {
}
```

### NumberField

```ts
interface IQNumberField extends IQOperableField<number, JSONRawNumberOperation, INumberOperation, IQNumberField> {

}
```

### StringField

String field can be operated on with the LIKE operator.

```ts
interface IQStringField extends IQOperableField<string, JSONRawStringOperation, IStringOperation, IQStringField> {

	like(
		like: string | IQStringField | RawFieldQuery<IQStringField> | {( ...args: any[] ): RawFieldQuery<IQStringField>}
	): JSONRawStringOperation;

}
```