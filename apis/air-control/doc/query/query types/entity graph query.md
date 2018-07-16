# Entity Graph Query
<!-- TOC -->

- [Entity Graph Query](#entity-graph-query)
    - [Map interface](#map-interface)
        - [Brief](#brief)
    - [Usage](#usage)
    - [Reason](#reason)

<!-- /TOC -->
Entity Graph Query is an entity based query API where the select clause
is specified as a JSON object tree.

Entity Graph Query returns fully interlinked graphs of objects. The
returned graph will not contain duplicates since all objects are
referenced directly.
It also modifies every array and gives is a map-like interface.

## Map interface

For convenience all arrays returned by Graph Queries are also maps.
Here is the [API](../../../spec/query/facade/MappedEntityArray.ts)
for the datastructure (compond with standard array API).

### Brief

A brief API listing:

```ts
export interface MappedEntityArray<E> extends Array<E> {
	dataMap: {[id: string]: E};
	keyField: string | number;
	clear(): void;
	putAll( values: E[] ): void;
	put( value: E ): E;
	get( key: string | number ): E;
	delete( key: string | number ): E;
	toArray(): E[];
}
```

## Usage

Here are some usage [examples](../../examples/query/entity graph.md).

## Reason

Graph Queries are useful if you need an object graph.  This is the API
that is expected to be used in 80% of all cases.