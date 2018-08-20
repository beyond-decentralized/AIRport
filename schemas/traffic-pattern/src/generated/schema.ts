export const SCHEMA = {
	"domain": "public",
	"index": null,
	"name": "@airport/traffic-pattern",
	"versions": [
		{
			"entities": [
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "INTEGER_VERSION",
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "VERSION_STRING",
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"type": 5
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "MAJOR_VERSION",
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"type": 4
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "MINOR_VERSION",
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"type": 4
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "PATCH_VERSION",
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"type": 4
						},
						{
							"index": 6,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 1,
									"oneRelationIndex": 1,
									"oneColumnIndex": 0
								}
							],
							"name": "SCHEMA_INDEX",
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 0,
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
							"name": "id"
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 1,
							"isId": false,
							"name": "integerVersion"
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 2,
							"isId": false,
							"name": "versionString"
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 3,
							"isId": false,
							"name": "majorVersion"
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 4,
							"isId": false,
							"name": "minorVersion"
						},
						{
							"columnRef": {
								"index": 5
							},
							"index": 5,
							"isId": false,
							"name": "patchVersion"
						},
						{
							"index": 6,
							"isId": false,
							"name": "schema",
							"relationRef": {
								"index": 0
							}
						},
						{
							"index": 7,
							"isId": false,
							"name": "entities",
							"relationRef": {
								"index": 1
							}
						},
						{
							"index": 8,
							"isId": false,
							"name": "references",
							"relationRef": {
								"index": 2
							}
						},
						{
							"index": 9,
							"isId": false,
							"name": "referencedBy",
							"relationRef": {
								"index": 3
							}
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
							"relationTableIndex": 1
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
							"relationTableIndex": 3
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
							"relationTableIndex": 6
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
							"relationTableIndex": 6
						}
					],
					"tableConfig": {
						"name": "SCHEMA_VERSIONS"
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "INDEX",
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SCOPE",
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"type": 5
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SCHEMA_NAME",
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"type": 5
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "STATUS",
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"type": 4
						},
						{
							"index": 4,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": 0,
									"oneTableIndex": 2,
									"oneColumnIndex": 0
								}
							],
							"name": "DOMAIN_ID",
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"type": 4
						},
						{
							"index": 5,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneSchemaIndex": null,
									"oneTableIndex": 0,
									"oneColumnIndex": 0
								}
							],
							"name": "CURRENT_VERSION_ID",
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 1,
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
							"name": "index"
						},
						{
							"index": 1,
							"isId": false,
							"name": "domain",
							"relationRef": {
								"index": 0
							}
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 2,
							"isId": false,
							"name": "scope"
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 3,
							"isId": false,
							"name": "name"
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 4,
							"isId": false,
							"name": "status"
						},
						{
							"index": 5,
							"isId": false,
							"name": "versions",
							"relationRef": {
								"index": 1
							}
						},
						{
							"index": 6,
							"isId": false,
							"name": "currentVersion",
							"relationRef": {
								"index": 2
							}
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
							"relationTableSchemaIndex": 0
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
							"relationTableIndex": 0
						},
						{
							"index": 2,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 6
							},
							"relationTableIndex": 0
						}
					],
					"tableConfig": {
						"name": "SCHEMAS"
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "INDEX",
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "TABLE_INDEX",
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SCHEMA_VERSION_ID",
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"type": 4
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ID_INDEX",
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"type": 4
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "IS_GENERATED",
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"type": 1
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ALLOCATION_SIZE",
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"type": 4
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "NAME",
							"propertyRefs": [
								{
									"index": 7
								}
							],
							"type": 5
						},
						{
							"index": 7,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "TYPE",
							"propertyRefs": [
								{
									"index": 10
								}
							],
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						},
						{
							"index": 1
						},
						{
							"index": 2
						}
					],
					"index": 2,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SchemaColumn",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "index"
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 1,
							"isId": true,
							"name": "tableIndex"
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 2,
							"isId": true,
							"name": "schemaVersionId"
						},
						{
							"index": 3,
							"isId": false,
							"name": "propertyColumns",
							"relationRef": {
								"index": 0
							}
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 4,
							"isId": false,
							"name": "idIndex"
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 5,
							"isId": false,
							"name": "isGenerated"
						},
						{
							"columnRef": {
								"index": 5
							},
							"index": 6,
							"isId": false,
							"name": "allocationSize"
						},
						{
							"columnRef": {
								"index": 6
							},
							"index": 7,
							"isId": false,
							"name": "name"
						},
						{
							"index": 8,
							"isId": false,
							"name": "manyRelationColumns",
							"relationRef": {
								"index": 1
							}
						},
						{
							"index": 9,
							"isId": false,
							"name": "oneRelationColumns",
							"relationRef": {
								"index": 2
							}
						},
						{
							"columnRef": {
								"index": 7
							},
							"index": 10,
							"isId": false,
							"name": "type"
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "column"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 3
							},
							"relationTableIndex": 5
						},
						{
							"index": 1,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "manyColumn"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 8
							},
							"relationTableIndex": 8
						},
						{
							"index": 2,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "oneColumn"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 9
							},
							"relationTableIndex": 8
						}
					],
					"tableConfig": {
						"name": "SCHEMA_COLUMNS"
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "INDEX",
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "IS_LOCAL",
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"type": 1
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "IS_REPOSITORY_ENTITY",
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"type": 1
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "NAME",
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"type": 5
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "TABLECONFIG",
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"type": 3
						},
						{
							"index": 5,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 0,
									"oneRelationIndex": 1,
									"oneColumnIndex": 0
								}
							],
							"name": "SCHEMA_VERSION_ID",
							"propertyRefs": [
								{
									"index": 1
								},
								{
									"index": 6
								},
								{
									"index": 8
								}
							],
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						},
						{
							"index": 5
						}
					],
					"index": 3,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SchemaEntity",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "index"
						},
						{
							"index": 1,
							"isId": true,
							"name": "schemaVersion",
							"relationRef": {
								"index": 0
							}
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 2,
							"isId": false,
							"name": "isLocal"
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 3,
							"isId": false,
							"name": "isRepositoryEntity"
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 4,
							"isId": false,
							"name": "name"
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 5,
							"isId": false,
							"name": "tableConfig"
						},
						{
							"index": 6,
							"isId": false,
							"name": "columns",
							"relationRef": {
								"index": 1
							}
						},
						{
							"index": 7,
							"isId": false,
							"name": "properties",
							"relationRef": {
								"index": 2
							}
						},
						{
							"index": 8,
							"isId": false,
							"name": "relations",
							"relationRef": {
								"index": 3
							}
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 0
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 0,
							"propertyRef": {
								"index": 6
							},
							"relationTableIndex": 2
						},
						{
							"index": 2,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "entity"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 7
							},
							"relationTableIndex": 4
						},
						{
							"index": 3,
							"isId": false,
							"relationType": 0,
							"propertyRef": {
								"index": 8
							},
							"relationTableIndex": 7
						}
					],
					"tableConfig": {
						"name": "SCHEMA_ENTITIES"
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "INDEX",
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "NAME",
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"type": 5
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "IS_ID",
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"type": 1
						},
						{
							"index": 3,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 3,
									"oneRelationIndex": 2,
									"oneColumnIndex": 5
								}
							],
							"name": "SCHEMA_VERSION_ID",
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"type": 4
						},
						{
							"index": 4,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 3,
									"oneRelationIndex": 2,
									"oneColumnIndex": 0
								}
							],
							"name": "TABLE_INDEX",
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						},
						{
							"index": 3
						},
						{
							"index": 4
						}
					],
					"index": 4,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SchemaProperty",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "index"
						},
						{
							"index": 1,
							"isId": true,
							"name": "entity",
							"relationRef": {
								"index": 0
							}
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 2,
							"isId": false,
							"name": "name"
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 3,
							"isId": false,
							"name": "isId"
						},
						{
							"index": 4,
							"isId": false,
							"name": "propertyColumns",
							"relationRef": {
								"index": 1
							}
						},
						{
							"index": 5,
							"isId": false,
							"name": "relation",
							"relationRef": {
								"index": 2
							}
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 3
						},
						{
							"index": 1,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "property"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 4
							},
							"relationTableIndex": 5
						},
						{
							"index": 2,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "property"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 5
							},
							"relationTableIndex": 7
						}
					],
					"tableConfig": {
						"name": "SCHEMA_PROPERTIES"
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 2,
									"oneRelationIndex": 0,
									"oneColumnIndex": 2
								},
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 4,
									"oneRelationIndex": 1,
									"oneColumnIndex": 3
								}
							],
							"name": "SCHEMA_VERSION_ID",
							"propertyRefs": [
								{
									"index": 0
								},
								{
									"index": 1
								}
							],
							"type": 4
						},
						{
							"index": 1,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 2,
									"oneRelationIndex": 0,
									"oneColumnIndex": 1
								},
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 4,
									"oneRelationIndex": 1,
									"oneColumnIndex": 4
								}
							],
							"name": "TABLE_INDEX",
							"propertyRefs": [
								{
									"index": 0
								},
								{
									"index": 1
								}
							],
							"type": 4
						},
						{
							"index": 2,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 2,
									"oneRelationIndex": 0,
									"oneColumnIndex": 0
								}
							],
							"name": "COLUMN_INDEX",
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"type": 4
						},
						{
							"index": 3,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 4,
									"oneRelationIndex": 1,
									"oneColumnIndex": 0
								}
							],
							"name": "PROPERTY_INDEX",
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						},
						{
							"index": 1
						},
						{
							"index": 2
						},
						{
							"index": 3
						}
					],
					"index": 5,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SchemaPropertyColumn",
					"properties": [
						{
							"index": 0,
							"isId": true,
							"name": "column",
							"relationRef": {
								"index": 0
							}
						},
						{
							"index": 1,
							"isId": true,
							"name": "property",
							"relationRef": {
								"index": 1
							}
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 2
						},
						{
							"index": 1,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 4
						}
					],
					"tableConfig": {
						"name": "SCHEMA_COLUMN_PROPERTIES"
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "INDEX",
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"type": 4
						},
						{
							"index": 1,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 0,
									"oneRelationIndex": 2,
									"oneColumnIndex": 0
								}
							],
							"name": "OWN_SCHEMA_VERSION_ID",
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"type": 4
						},
						{
							"index": 2,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 0,
									"oneRelationIndex": 3,
									"oneColumnIndex": 0
								}
							],
							"name": "REFERENCED_SCHEMA_VERSION_ID",
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 1
						},
						{
							"index": 2
						}
					],
					"index": 6,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SchemaReference",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": false,
							"name": "index"
						},
						{
							"index": 1,
							"isId": true,
							"name": "ownSchemaVersion",
							"relationRef": {
								"index": 0
							}
						},
						{
							"index": 2,
							"isId": true,
							"name": "referencedSchemaVersion",
							"relationRef": {
								"index": 1
							}
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 0
						},
						{
							"index": 1,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 0
						}
					],
					"tableConfig": {
						"name": "SCHEMA_REFERENCES"
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "INDEX",
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "FOREIGN_KEY",
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"type": 3
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "MANY_TO_ONE_ELEMENTS",
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"type": 3
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ONE_TO_MANY_ELEMENTS",
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"type": 3
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "RELATION_TYPE",
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"type": 4
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "IS_REPOSITORY_JOIN",
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"type": 1
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "IS_ID",
							"propertyRefs": [
								{
									"index": 7
								}
							],
							"type": 1
						},
						{
							"index": 7,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ADD_TO_JOIN_FUNCTION",
							"propertyRefs": [
								{
									"index": 8
								}
							],
							"type": 5
						},
						{
							"index": 8,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "JOIN_FUNCTION_WITH_OPERATOR",
							"propertyRefs": [
								{
									"index": 9
								}
							],
							"type": 4
						},
						{
							"index": 9,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 4,
									"oneRelationIndex": 2,
									"oneColumnIndex": 3
								}
							],
							"name": "SCHEMA_VERSION_ID",
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"type": 4
						},
						{
							"index": 10,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 4,
									"oneRelationIndex": 2,
									"oneColumnIndex": 4
								}
							],
							"name": "TABLE_INDEX",
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"type": 4
						},
						{
							"index": 11,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 4,
									"oneRelationIndex": 2,
									"oneColumnIndex": 0
								}
							],
							"name": "PROPERTY_INDEX",
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"type": 4
						},
						{
							"index": 12,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 3,
									"oneRelationIndex": 3,
									"oneColumnIndex": 5
								}
							],
							"name": "RELATION_SCHEMA_VERSION_ID",
							"propertyRefs": [
								{
									"index": 10
								}
							],
							"type": 4
						},
						{
							"index": 13,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 3,
									"oneRelationIndex": 3,
									"oneColumnIndex": 0
								}
							],
							"name": "RELATION_TABLE_INDEX",
							"propertyRefs": [
								{
									"index": 10
								}
							],
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						},
						{
							"index": 9
						},
						{
							"index": 10
						},
						{
							"index": 11
						}
					],
					"index": 7,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SchemaRelation",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "index"
						},
						{
							"index": 1,
							"isId": true,
							"name": "property",
							"relationRef": {
								"index": 0
							}
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 2,
							"isId": false,
							"name": "foreignKey"
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 3,
							"isId": false,
							"name": "manyToOneElems"
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 4,
							"isId": false,
							"name": "oneToManyElems"
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 5,
							"isId": false,
							"name": "relationType"
						},
						{
							"columnRef": {
								"index": 5
							},
							"index": 6,
							"isId": false,
							"name": "isRepositoryJoin"
						},
						{
							"columnRef": {
								"index": 6
							},
							"index": 7,
							"isId": false,
							"name": "isId"
						},
						{
							"columnRef": {
								"index": 7
							},
							"index": 8,
							"isId": false,
							"name": "addToJoinFunction"
						},
						{
							"columnRef": {
								"index": 8
							},
							"index": 9,
							"isId": false,
							"name": "joinFunctionWithOperator"
						},
						{
							"index": 10,
							"isId": false,
							"name": "relationEntity",
							"relationRef": {
								"index": 1
							}
						},
						{
							"index": 11,
							"isId": false,
							"name": "manyRelationColumns",
							"relationRef": {
								"index": 2
							}
						},
						{
							"index": 12,
							"isId": false,
							"name": "oneRelationColumns",
							"relationRef": {
								"index": 3
							}
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 4
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 10
							},
							"relationTableIndex": 3
						},
						{
							"index": 2,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "manyRelation"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 11
							},
							"relationTableIndex": 8
						},
						{
							"index": 3,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "oneRelation"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 12
							},
							"relationTableIndex": 8
						}
					],
					"tableConfig": {
						"name": "SCHEMA_RELATIONS"
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 2,
									"oneRelationIndex": 1,
									"oneColumnIndex": 2
								},
								{
									"manyRelationIndex": 2,
									"oneSchemaIndex": null,
									"oneTableIndex": 7,
									"oneRelationIndex": 2,
									"oneColumnIndex": 9
								}
							],
							"name": "MANY_SCHEMA_VERSION_ID",
							"propertyRefs": [
								{
									"index": 0
								},
								{
									"index": 2
								}
							],
							"type": 4
						},
						{
							"index": 1,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 2,
									"oneRelationIndex": 1,
									"oneColumnIndex": 1
								},
								{
									"manyRelationIndex": 2,
									"oneSchemaIndex": null,
									"oneTableIndex": 7,
									"oneRelationIndex": 2,
									"oneColumnIndex": 10
								}
							],
							"name": "MANY_TABLE_INDEX",
							"propertyRefs": [
								{
									"index": 0
								},
								{
									"index": 2
								}
							],
							"type": 4
						},
						{
							"index": 2,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 2,
									"oneRelationIndex": 1,
									"oneColumnIndex": 0
								}
							],
							"name": "MANY_COLUMN_INDEX",
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"type": 4
						},
						{
							"index": 3,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 2,
									"oneRelationIndex": 2,
									"oneColumnIndex": 2
								},
								{
									"manyRelationIndex": 3,
									"oneSchemaIndex": null,
									"oneTableIndex": 7,
									"oneRelationIndex": 3,
									"oneColumnIndex": 9
								}
							],
							"name": "ONE_SCHEMA_VERSION_ID",
							"propertyRefs": [
								{
									"index": 1
								},
								{
									"index": 3
								}
							],
							"type": 4
						},
						{
							"index": 4,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 2,
									"oneRelationIndex": 2,
									"oneColumnIndex": 1
								},
								{
									"manyRelationIndex": 3,
									"oneSchemaIndex": null,
									"oneTableIndex": 7,
									"oneRelationIndex": 3,
									"oneColumnIndex": 10
								}
							],
							"name": "ONE_TABLE_INDEX",
							"propertyRefs": [
								{
									"index": 1
								},
								{
									"index": 3
								}
							],
							"type": 4
						},
						{
							"index": 5,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 2,
									"oneRelationIndex": 2,
									"oneColumnIndex": 0
								}
							],
							"name": "ONE_COLUMN_INDEX",
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"type": 4
						},
						{
							"index": 6,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneSchemaIndex": null,
									"oneTableIndex": 7,
									"oneRelationIndex": 2,
									"oneColumnIndex": 0
								}
							],
							"name": "MANY_RELATION_INDEX",
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"type": 4
						},
						{
							"index": 7,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 3,
									"oneSchemaIndex": null,
									"oneTableIndex": 7,
									"oneRelationIndex": 3,
									"oneColumnIndex": 0
								}
							],
							"name": "ONE_RELATION_INDEX",
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						},
						{
							"index": 1
						},
						{
							"index": 2
						},
						{
							"index": 3
						},
						{
							"index": 4
						},
						{
							"index": 5
						},
						{
							"index": 6
						},
						{
							"index": 7
						}
					],
					"index": 8,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SchemaRelationColumn",
					"properties": [
						{
							"index": 0,
							"isId": true,
							"name": "manyColumn",
							"relationRef": {
								"index": 0
							}
						},
						{
							"index": 1,
							"isId": true,
							"name": "oneColumn",
							"relationRef": {
								"index": 1
							}
						},
						{
							"index": 2,
							"isId": true,
							"name": "manyRelation",
							"relationRef": {
								"index": 2
							}
						},
						{
							"index": 3,
							"isId": true,
							"name": "oneRelation",
							"relationRef": {
								"index": 3
							}
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 2
						},
						{
							"index": 1,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 2
						},
						{
							"index": 2,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 7
						},
						{
							"index": 3,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 3
							},
							"relationTableIndex": 7
						}
					],
					"tableConfig": {
						"name": "SCHEMA_RELATION_COLUMNS"
					}
				}
			],
			"integerVersion": 1,
			"referencedSchemas": [],
			"versionString": "1.0.0"
		}
	]
};