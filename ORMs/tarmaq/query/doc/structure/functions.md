# Functions
<!-- TOC -->

- [Functions](#functions)
    - [SQL Functions](#sql-functions)
        - [ABS](#ABS)
        - [AVG](#AVG)
        - [COUNT](#COUNT)
        - [MAX](#MAX)
        - [MIN](#MIN)
        - [SUM](#SUM)
        - [UCASE](#UCASE)
        - [LCASE](#LCASE)
        - [MID](#MID)
        - [LEN](#LEN)
        - [ROUND](#ROUND)
        - [NOW](#NOW)
        - [FORMAT](#FORMAT)
        - [REPLACE](#REPLACE)
        - [TRIM](#TRIM)
    - [SQL Clauses and Conditions](#sql-clauses-and-conditions)
        - [DISTINCT](#DISTINCT)
        - [EXISTS](#EXISTS)

<!-- /TOC -->
Following functions are defined by Tarmaq (more will be added as needed).

## SQL Functions

### ABS
Equivalent of SQL [ABS](http://www.w3resource.com/sql/arithmetic-functions/abs.php) function
```ts
function ABS(
	numeric: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField;
```

### AVG
Equivalent of SQL AVG
```ts
function AVG(
	numeric: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField;
```

### COUNT
```ts
function COUNT<T extends boolean | Date | number | string, IQF extends IQOperableField<T, any, any, any>>(
	value: IQF | T | RawFieldQuery<IQF>
): IQF;
```

### MAX
```ts
function MAX<T extends boolean | Date | number | string, IQF extends IQOperableField<T, any, any, any>>(
	value: IQF | T | RawFieldQuery<IQF>
): IQF;
```

### MIN
```ts
function MIN<T extends boolean | Date | number | string, IQF extends IQOperableField<T, any, any, any>>(
	value: IQF | T | RawFieldQuery<IQF>
): IQF;
```

### SUM
```ts
function SUM(
	numeric: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField;
```

### UCASE
```ts
function UCASE(
	stringValue: IQStringField | string | RawFieldQuery<IQStringField>
): IQStringField;
```

### LCASE
```ts
function LCASE(
	stringValue: IQStringField | string | RawFieldQuery<any>
): IQStringField;
```

### MID
```ts
function MID(
	stringValue: IQStringField | string | RawFieldQuery<IQStringField>,
	start: IQNumberField | number | RawFieldQuery<IQNumberField>,
	length: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQStringField;
```

### LEN
```ts
function LEN(
	stringValue: IQStringField | string | RawFieldQuery<IQStringField>
): IQStringField;
```

### ROUND
```ts
function ROUND(
	numeric: IQNumberField | number | RawFieldQuery<IQNumberField>,
	digits: IQNumberField | number | RawFieldQuery<IQNumberField> = 0
): IQNumberField;
```

### NOW
```ts
function NOW(): IQDateField;
```

### FORMAT
```ts
export function FORMAT<T extends boolean | Date | number | string, 
        IQF extends IQOperableField<T, any, any, IQF>>(
	format: string | IQStringField | RawFieldQuery<IQF>,
	...formatParameters: (T | IQF | RawFieldQuery<IQF>)[]
): IQStringField;
```

### REPLACE
```ts
export function REPLACE(
	stringValue: IQStringField | string | RawFieldQuery<IQStringField>,
	toReplace: IQStringField | string | RawFieldQuery<IQStringField>,
	replaceWith: IQStringField | string | RawFieldQuery<IQStringField>
): IQStringField;
```

### TRIM
```ts
export function TRIM(
	stringField: IQStringField | string | RawFieldQuery<any>
): IQStringField;
```

## SQL Clauses and Conditions

### DISTINCT
Equivant of SQL [DISTINCT](https://www.techonthenet.com/sql/distinct.php) clause
```ts
export function DISTINCT<ISelect>(
	selectClause: ISelect
): IQDistinctFunction<ISelect>;
```

### EXISTS
Equivalent of SQL [EXISTS](https://www.techonthenet.com/sql/exists.php) condition
```ts
function EXISTS( rawQuery: RawTreeQuery): IQExistsFunction;
```