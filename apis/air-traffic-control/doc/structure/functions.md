# Functions
<!-- TOC -->

- [Functions](#functions)
    - [SQL Functions](#sql-functions)
        - [ABS](#abs)
        - [AVG](#avg)
        - [COUNT](#count)
        - [MAX](#max)
        - [MIN](#min)
        - [SUM](#sum)
        - [UCASE](#ucase)
        - [LCASE](#lcase)
        - [MID](#mid)
        - [LEN](#len)
        - [ROUND](#round)
        - [NOW](#now)
        - [FORMAT](#format)
        - [REPLACE](#replace)
        - [TRIM](#trim)
    - [SQL Clauses and Conditions](#sql-clauses-and-conditions)
        - [Distinct](#distinct)
        - [Exists](#exists)

<!-- /TOC -->
Following functions are defined by TIQL.

## SQL Functions

### ABS
Equivalent of SQL [ABS](http://www.w3resource.com/sql/arithmetic-functions/abs.php) function
```ts
function abs(
	numeric: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField;
```

### AVG
Equivalent of SQL AVG
```ts
function avg(
	numeric: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField;
```

### COUNT
```ts
function count<T extends boolean | Date | number | string, IQF extends IQOperableField<T, any, any, any>>(
	value: IQF | T | RawFieldQuery<IQF>
): IQF;
```

### MAX
```ts
function max<T extends boolean | Date | number | string, IQF extends IQOperableField<T, any, any, any>>(
	value: IQF | T | RawFieldQuery<IQF>
): IQF;
```

### MIN
```ts
function min<T extends boolean | Date | number | string, IQF extends IQOperableField<T, any, any, any>>(
	value: IQF | T | RawFieldQuery<IQF>
): IQF;
```

### SUM
```ts
function sum(
	numeric: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField;
```

### UCASE
```ts
function ucase(
	stringValue: IQStringField | string | RawFieldQuery<IQStringField>
): IQStringField;
```

### LCASE
```ts
function lcase(
	stringValue: IQStringField | string | RawFieldQuery<any>
): IQStringField;
```

### MID
```ts
function mid(
	stringValue: IQStringField | string | RawFieldQuery<IQStringField>,
	start: IQNumberField | number | RawFieldQuery<IQNumberField>,
	length: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQStringField;
```

### LEN
```ts
function len(
	stringValue: IQStringField | string | RawFieldQuery<IQStringField>
): IQStringField;
```

### ROUND
```ts
function round(
	numeric: IQNumberField | number | RawFieldQuery<IQNumberField>,
	digits: IQNumberField | number | RawFieldQuery<IQNumberField> = 0
): IQNumberField;
```

### NOW
```ts
function now(): IQDateField;
```

### FORMAT
```ts
export function format<T extends boolean | Date | number | string, 
        IQF extends IQOperableField<T, any, any, IQF>>(
	format: string | IQStringField | RawFieldQuery<IQF>,
	...formatParameters: (T | IQF | RawFieldQuery<IQF>)[]
): IQStringField;
```

### REPLACE
```ts
export function replace(
	stringValue: IQStringField | string | RawFieldQuery<IQStringField>,
	toReplace: IQStringField | string | RawFieldQuery<IQStringField>,
	replaceWith: IQStringField | string | RawFieldQuery<IQStringField>
): IQStringField;
```

### TRIM
```ts
export function trim(
	stringField: IQStringField | string | RawFieldQuery<any>
): IQStringField;
```

## SQL Clauses and Conditions

### Distinct
Equivant of SQL [DISTINCT](https://www.techonthenet.com/sql/distinct.php) clause
```ts
export function distinct<ISelect>(
	selectClause: ISelect
): IQDistinctFunction<ISelect>;
```

### Exists
Equivalent of SQL [EXISTS](https://www.techonthenet.com/sql/exists.php) condition
```ts
function exists( rawQuery: RawTreeQuery): IQExistsFunction;
```