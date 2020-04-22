export const SCHEMA = {
	"domain": "npmjs.org",
	"index": null,
	"name": "@airport/traffic-pattern",
	"sinceVersion": 1,
	"versions": [
		{
			"entities": [
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DEPRECATED_SINCE_SCHEMA_VERSION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REMOVED_IN_SCHEMA_VERSION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SINCE_SCHEMA_VERSION_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 3,
									"oneSchemaIndex": null,
									"oneTableIndex": 4,
									"oneRelationIndex": 5,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "MANY_SCHEMA_COLUMN_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 4,
									"oneSchemaIndex": null,
									"oneTableIndex": 4,
									"oneRelationIndex": 6,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "ONE_SCHEMA_COLUMN_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 5,
									"oneSchemaIndex": null,
									"oneTableIndex": 1,
									"oneRelationIndex": 6,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "MANY_SCHEMA_RELATION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 7,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 6,
									"oneSchemaIndex": null,
									"oneTableIndex": 1,
									"oneRelationIndex": 7,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "ONE_SCHEMA_RELATION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 7
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 8,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 7,
									"oneSchemaIndex": null,
									"oneTableIndex": 1,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "PARENT_RELATION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 8
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 3
						}
					],
					"index": 0,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SchemaRelationColumn",
					"properties": [
						{
							"index": 0,
							"isId": false,
							"name": "deprecatedSinceVersion",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "removedInVersion",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "sinceVersion",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 3,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"name": "manyColumn",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"name": "oneColumn",
							"relationRef": {
								"index": 4
							},
							"sinceVersion": 1
						},
						{
							"index": 6,
							"isId": false,
							"name": "manyRelation",
							"relationRef": {
								"index": 5
							},
							"sinceVersion": 1
						},
						{
							"index": 7,
							"isId": false,
							"name": "oneRelation",
							"relationRef": {
								"index": 6
							},
							"sinceVersion": 1
						},
						{
							"index": 8,
							"isId": false,
							"name": "parentRelation",
							"relationRef": {
								"index": 7
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 4
							},
							"relationTableIndex": 4,
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 5
							},
							"relationTableIndex": 4,
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 6
							},
							"relationTableIndex": 1,
							"sinceVersion": 1
						},
						{
							"index": 6,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 7
							},
							"relationTableIndex": 1,
							"sinceVersion": 1
						},
						{
							"index": 7,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 8
							},
							"relationTableIndex": 1,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "SCHEMA_RELATION_COLUMNS",
						"indexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DEPRECATED_SINCE_SCHEMA_VERSION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REMOVED_IN_SCHEMA_VERSION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SINCE_SCHEMA_VERSION_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "RELATION_INDEX",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "FOREIGN_KEY",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": 3
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "MANY_TO_ONE_ELEMENTS",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 7
								}
							],
							"sinceVersion": 1,
							"type": 3
						},
						{
							"index": 7,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ONE_TO_MANY_ELEMENTS",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 8
								}
							],
							"sinceVersion": 1,
							"type": 3
						},
						{
							"index": 8,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "RELATION_TYPE",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 9
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 9,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "IS_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 10
								}
							],
							"sinceVersion": 1,
							"type": 1
						},
						{
							"index": 10,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 3,
									"oneSchemaIndex": null,
									"oneTableIndex": 2,
									"oneRelationIndex": 5,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "SCHEMA_PROPERTY_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 11,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 4,
									"oneSchemaIndex": null,
									"oneTableIndex": 6,
									"oneRelationIndex": 7,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "SCHEMA_TABLE_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 11
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 12,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 5,
									"oneSchemaIndex": null,
									"oneTableIndex": 6,
									"oneRelationIndex": 8,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "RELATION_SCHEMA_TABLE_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 12
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 3
						}
					],
					"index": 1,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SchemaRelation",
					"properties": [
						{
							"index": 0,
							"isId": false,
							"name": "deprecatedSinceVersion",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "removedInVersion",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "sinceVersion",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 3,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 4,
							"isId": false,
							"name": "index",
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"name": "property",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 5
							},
							"index": 6,
							"isId": false,
							"name": "foreignKey",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 6
							},
							"index": 7,
							"isId": false,
							"name": "manyToOneElems",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 7
							},
							"index": 8,
							"isId": false,
							"name": "oneToManyElems",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 8
							},
							"index": 9,
							"isId": false,
							"name": "relationType",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 9
							},
							"index": 10,
							"isId": false,
							"name": "isId",
							"sinceVersion": 1
						},
						{
							"index": 11,
							"isId": false,
							"name": "entity",
							"relationRef": {
								"index": 4
							},
							"sinceVersion": 1
						},
						{
							"index": 12,
							"isId": false,
							"name": "relationEntity",
							"relationRef": {
								"index": 5
							},
							"sinceVersion": 1
						},
						{
							"index": 13,
							"isId": false,
							"name": "manyRelationColumns",
							"relationRef": {
								"index": 6
							},
							"sinceVersion": 1
						},
						{
							"index": 14,
							"isId": false,
							"name": "oneRelationColumns",
							"relationRef": {
								"index": 7
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 5
							},
							"relationTableIndex": 2,
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 11
							},
							"relationTableIndex": 6,
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 12
							},
							"relationTableIndex": 6,
							"sinceVersion": 1
						},
						{
							"index": 6,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "manyRelation"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 13
							},
							"relationTableIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 7,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "oneRelation"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 14
							},
							"relationTableIndex": 0,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "SCHEMA_RELATIONS",
						"indexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DEPRECATED_SINCE_SCHEMA_VERSION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REMOVED_IN_SCHEMA_VERSION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SINCE_SCHEMA_VERSION_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "PROPERTY_INDEX",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "NAME",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": 5
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "IS_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": 1
						},
						{
							"index": 7,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 3,
									"oneSchemaIndex": null,
									"oneTableIndex": 6,
									"oneRelationIndex": 6,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "SCHEMA_ENTITY_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 7
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 3
						}
					],
					"index": 2,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SchemaProperty",
					"properties": [
						{
							"index": 0,
							"isId": false,
							"name": "deprecatedSinceVersion",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "removedInVersion",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "sinceVersion",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 3,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 4,
							"isId": false,
							"name": "index",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 5
							},
							"index": 5,
							"isId": false,
							"name": "name",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 6
							},
							"index": 6,
							"isId": false,
							"name": "isId",
							"sinceVersion": 1
						},
						{
							"index": 7,
							"isId": false,
							"name": "entity",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"index": 8,
							"isId": false,
							"name": "propertyColumns",
							"relationRef": {
								"index": 4
							},
							"sinceVersion": 1
						},
						{
							"index": 9,
							"isId": false,
							"name": "relation",
							"relationRef": {
								"index": 5
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 7
							},
							"relationTableIndex": 6,
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "property"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 8
							},
							"relationTableIndex": 3,
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "property"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 9
							},
							"relationTableIndex": 1,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "SCHEMA_PROPERTIES",
						"indexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DEPRECATED_SINCE_SCHEMA_VERSION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REMOVED_IN_SCHEMA_VERSION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SINCE_SCHEMA_VERSION_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 3,
									"oneSchemaIndex": null,
									"oneTableIndex": 4,
									"oneRelationIndex": 4,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "SCHEMA_COLUMN_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 4,
									"oneSchemaIndex": null,
									"oneTableIndex": 2,
									"oneRelationIndex": 4,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "SCHEMA_PROPERTY_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 3
						},
						{
							"index": 4
						}
					],
					"index": 3,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SchemaPropertyColumn",
					"properties": [
						{
							"index": 0,
							"isId": false,
							"name": "deprecatedSinceVersion",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "removedInVersion",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "sinceVersion",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": true,
							"name": "column",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": true,
							"name": "property",
							"relationRef": {
								"index": 4
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 3
							},
							"relationTableIndex": 4,
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 4
							},
							"relationTableIndex": 2,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "SCHEMA_PROPERTY_COLUMNS",
						"indexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DEPRECATED_SINCE_SCHEMA_VERSION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REMOVED_IN_SCHEMA_VERSION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SINCE_SCHEMA_VERSION_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "COLUMN_INDEX",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ID_INDEX",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "IS_GENERATED",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": 1
						},
						{
							"index": 7,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ALLOCATION_SIZE",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 7
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 8,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "NAME",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 8
								}
							],
							"sinceVersion": 1,
							"type": 5
						},
						{
							"index": 9,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "NOT_NULL",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 9
								}
							],
							"sinceVersion": 1,
							"type": 1
						},
						{
							"index": 10,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "TYPE",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 10
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 11,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 3,
									"oneSchemaIndex": null,
									"oneTableIndex": 6,
									"oneRelationIndex": 4,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "SCHEMA_ENTITY_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 11
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 3
						}
					],
					"index": 4,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SchemaColumn",
					"properties": [
						{
							"index": 0,
							"isId": false,
							"name": "deprecatedSinceVersion",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "removedInVersion",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "sinceVersion",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 3,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 4,
							"isId": false,
							"name": "index",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 5
							},
							"index": 5,
							"isId": false,
							"name": "idIndex",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 6
							},
							"index": 6,
							"isId": false,
							"name": "isGenerated",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 7
							},
							"index": 7,
							"isId": false,
							"name": "allocationSize",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 8
							},
							"index": 8,
							"isId": false,
							"name": "name",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 9
							},
							"index": 9,
							"isId": false,
							"name": "notNull",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 10
							},
							"index": 10,
							"isId": false,
							"name": "type",
							"sinceVersion": 1
						},
						{
							"index": 11,
							"isId": false,
							"name": "entity",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"index": 12,
							"isId": false,
							"name": "propertyColumns",
							"relationRef": {
								"index": 4
							},
							"sinceVersion": 1
						},
						{
							"index": 13,
							"isId": false,
							"name": "manyRelationColumns",
							"relationRef": {
								"index": 5
							},
							"sinceVersion": 1
						},
						{
							"index": 14,
							"isId": false,
							"name": "oneRelationColumns",
							"relationRef": {
								"index": 6
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 11
							},
							"relationTableIndex": 6,
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "column"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 12
							},
							"relationTableIndex": 3,
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "manyColumn"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 13
							},
							"relationTableIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 6,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "oneColumn"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 14
							},
							"relationTableIndex": 0,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "SCHEMA_COLUMNS",
						"indexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DEPRECATED_SINCE_SCHEMA_VERSION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REMOVED_IN_SCHEMA_VERSION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SINCE_SCHEMA_VERSION_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 3,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "TYPE",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "NAME",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": 5
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "RULE",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 7
								}
							],
							"sinceVersion": 1,
							"type": 3
						},
						{
							"index": 7,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 3,
									"oneSchemaIndex": null,
									"oneTableIndex": 6,
									"oneRelationIndex": 5,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "SCHEMA_ENTITY_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 3
						}
					],
					"index": 5,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SchemaOperation",
					"properties": [
						{
							"index": 0,
							"isId": false,
							"name": "deprecatedSinceVersion",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "removedInVersion",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "sinceVersion",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 3,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 4,
							"isId": false,
							"name": "type",
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"name": "entity",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 5
							},
							"index": 6,
							"isId": false,
							"name": "name",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 6
							},
							"index": 7,
							"isId": false,
							"name": "rule",
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 5
							},
							"relationTableIndex": 6,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "SCHEMA_OPERATIONS",
						"indexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DEPRECATED_SINCE_SCHEMA_VERSION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REMOVED_IN_SCHEMA_VERSION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SINCE_SCHEMA_VERSION_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "TABLE_INDEX",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "IS_LOCAL",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": 1
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "IS_REPOSITORY_ENTITY",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": 1
						},
						{
							"index": 7,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "NAME",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 7
								}
							],
							"sinceVersion": 1,
							"type": 5
						},
						{
							"index": 8,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "TABLE_CONFIGURATION",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 8
								}
							],
							"sinceVersion": 1,
							"type": 3
						},
						{
							"index": 9,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 3,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneRelationIndex": 1,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SCHEMA_VERSION_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 9
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 3
						}
					],
					"index": 6,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SchemaEntity",
					"properties": [
						{
							"index": 0,
							"isId": false,
							"name": "deprecatedSinceVersion",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "removedInVersion",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "sinceVersion",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 3,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 4,
							"isId": false,
							"name": "index",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 5
							},
							"index": 5,
							"isId": false,
							"name": "isLocal",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 6
							},
							"index": 6,
							"isId": false,
							"name": "isRepositoryEntity",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 7
							},
							"index": 7,
							"isId": false,
							"name": "name",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 8
							},
							"index": 8,
							"isId": false,
							"name": "tableConfig",
							"sinceVersion": 1
						},
						{
							"index": 9,
							"isId": false,
							"name": "schemaVersion",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"index": 10,
							"isId": false,
							"name": "columns",
							"relationRef": {
								"index": 4
							},
							"sinceVersion": 1
						},
						{
							"index": 11,
							"isId": false,
							"name": "operations",
							"relationRef": {
								"index": 5
							},
							"sinceVersion": 1
						},
						{
							"index": 12,
							"isId": false,
							"name": "properties",
							"relationRef": {
								"index": 6
							},
							"sinceVersion": 1
						},
						{
							"index": 13,
							"isId": false,
							"name": "relations",
							"relationRef": {
								"index": 7
							},
							"sinceVersion": 1
						},
						{
							"index": 14,
							"isId": false,
							"name": "relationReferences",
							"relationRef": {
								"index": 8
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 9
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "entity"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 10
							},
							"relationTableIndex": 4,
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "entity"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 11
							},
							"relationTableIndex": 5,
							"sinceVersion": 1
						},
						{
							"index": 6,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "entity"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 12
							},
							"relationTableIndex": 2,
							"sinceVersion": 1
						},
						{
							"index": 7,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "entity"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 13
							},
							"relationTableIndex": 1,
							"sinceVersion": 1
						},
						{
							"index": 8,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "relationEntity"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 14
							},
							"relationTableIndex": 1,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "SCHEMA_ENTITIES",
						"indexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DEPRECATED_SINCE_SCHEMA_VERSION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REMOVED_IN_SCHEMA_VERSION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SINCE_SCHEMA_VERSION_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SCHEMA_REFERENCE_INDEX",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 3,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneRelationIndex": 2,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "OWN_SCHEMA_VERSION_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 4,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneRelationIndex": 3,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REFERENCED_SCHEMA_VERSION_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 4
						},
						{
							"index": 5
						}
					],
					"index": 7,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SchemaReference",
					"properties": [
						{
							"index": 0,
							"isId": false,
							"name": "deprecatedSinceVersion",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "removedInVersion",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "sinceVersion",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": true,
							"name": "ownSchemaVersion",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": true,
							"name": "referencedSchemaVersion",
							"relationRef": {
								"index": 4
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 5,
							"isId": false,
							"name": "index",
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 3
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 4
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "SCHEMA_REFERENCES",
						"indexes": []
					}
				},
				{
					"columns": [
						{
							"allocationSize": 100,
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "INTEGER_VERSION",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "VERSION_STRING",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 5
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "MAJOR_VERSION",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "MINOR_VERSION",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "PATCH_VERSION",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 9,
									"oneRelationIndex": 1,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SCHEMA_INDEX",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 8,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SchemaVersion",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 1,
							"isId": false,
							"name": "integerVersion",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 2,
							"isId": false,
							"name": "versionString",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 3,
							"isId": false,
							"name": "majorVersion",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 4,
							"isId": false,
							"name": "minorVersion",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 5
							},
							"index": 5,
							"isId": false,
							"name": "patchVersion",
							"sinceVersion": 1
						},
						{
							"index": 6,
							"isId": false,
							"name": "schema",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 7,
							"isId": false,
							"name": "entities",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 8,
							"isId": false,
							"name": "references",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"index": 9,
							"isId": false,
							"name": "referencedBy",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 6
							},
							"relationTableIndex": 9,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "schemaVersion"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 7
							},
							"relationTableIndex": 6,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "ownSchemaVersion"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 8
							},
							"relationTableIndex": 7,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "referencedSchemaVersion"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 9
							},
							"relationTableIndex": 7,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "SCHEMA_VERSIONS",
						"indexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SCHEMA_INDEX",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SCOPE",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 5
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SCHEMA_NAME",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 5
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "STATUS",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": 0,
									"oneTableIndex": 2,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DOMAIN_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneSchemaIndex": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "CURRENT_VERSION_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 9,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "Schema",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "index",
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "domain",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 2,
							"isId": false,
							"name": "scope",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 3,
							"isId": false,
							"name": "name",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 4,
							"isId": false,
							"name": "status",
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"name": "versions",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 6,
							"isId": false,
							"name": "currentVersion",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 2,
							"relationTableSchemaIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "schema"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 5
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 6
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "SCHEMAS",
						"indexes": []
					}
				}
			],
			"integerVersion": 1,
			"referencedSchemas": [
				{
					"domain": "npmjs.org",
					"index": 0,
					"name": "@airport/territory",
					"sinceVersion": 1,
					"versions": [
						{
							"entities": null,
							"integerVersion": 1,
							"referencedSchemas": null,
							"versionString": "1.0.0"
						}
					]
				}
			],
			"versionString": "1.0.0"
		}
	]
};