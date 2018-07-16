export const SCHEMA = {
	"domain": "public",
	"index": null,
	"name": "@airport/runway-edge-lighting",
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
							"name": "LEVEL",
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
							"name": "TEXT",
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"type": 5
						},
						{
							"index": 3,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": 0,
									"oneTableIndex": 1,
									"oneColumnIndex": 0
								}
							],
							"name": "APPLICATION_PACKAGE_ID",
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"type": 4
						},
						{
							"index": 4,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": 0,
									"oneTableIndex": 4,
									"oneColumnIndex": 0
								}
							],
							"name": "PACKAGED_UNIT_ID",
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
						}
					],
					"index": 0,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "LogEntryType",
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
							"name": "level"
						},
						{
							"index": 2,
							"isId": false,
							"name": "applicationPackage",
							"relationRef": {
								"index": 0
							}
						},
						{
							"index": 3,
							"isId": false,
							"name": "packagedUnit",
							"relationRef": {
								"index": 1
							}
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 4,
							"isId": false,
							"name": "text"
						},
						{
							"index": 5,
							"isId": false,
							"name": "logEntries",
							"relationRef": {
								"index": 2
							}
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"isRepositoryJoin": false,
							"joinFunctionWithOperator": 0,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 1,
							"relationTableSchemaIndex": 0
						},
						{
							"index": 1,
							"isId": false,
							"isRepositoryJoin": false,
							"joinFunctionWithOperator": 0,
							"relationType": 1,
							"propertyRef": {
								"index": 3
							},
							"relationTableIndex": 4,
							"relationTableSchemaIndex": 0
						},
						{
							"index": 2,
							"isId": false,
							"isRepositoryJoin": false,
							"joinFunctionWithOperator": 0,
							"oneToManyElems": {
								"mappedBy": "logEntryType"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 5
							},
							"relationTableIndex": 2
						}
					],
					"tableConfig": {
						"name": "LOG_ENTRIES"
					}
				},
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
							"name": "POSITION",
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "VALUE",
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"type": 0
						},
						{
							"index": 3,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 2,
									"oneRelationIndex": 1,
									"oneColumnIndex": 0
								}
							],
							"name": "LOG_ENTRY_ID",
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
						}
					],
					"index": 1,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "LogEntryValue",
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
							"index": 1,
							"isId": false,
							"name": "logEntry",
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
							"name": "position"
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 3,
							"isId": false,
							"name": "value"
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"isRepositoryJoin": false,
							"joinFunctionWithOperator": 0,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 2
						}
					],
					"tableConfig": {
						"name": "LOG_ENTRY_VALUES"
					}
				},
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
							"name": "TIMESTAMP",
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"type": 2
						},
						{
							"index": 2,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 0,
									"oneRelationIndex": 2,
									"oneColumnIndex": 0
								}
							],
							"name": "LOG_ENTRY_TYPE_ID",
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
							"index": 0
						}
					],
					"index": 2,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "LogEntry",
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
							"name": "timestamp"
						},
						{
							"index": 2,
							"isId": false,
							"name": "type",
							"relationRef": {
								"index": 0
							}
						},
						{
							"index": 3,
							"isId": false,
							"name": "values",
							"relationRef": {
								"index": 1
							}
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"isRepositoryJoin": false,
							"joinFunctionWithOperator": 0,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 0
						},
						{
							"index": 1,
							"isId": false,
							"isRepositoryJoin": false,
							"joinFunctionWithOperator": 0,
							"oneToManyElems": {
								"mappedBy": "logEntry"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 3
							},
							"relationTableIndex": 1
						}
					],
					"tableConfig": {
						"name": "LOG_ENTRY"
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
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
							"name": "STACK_HASH",
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"type": 5
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "STACK",
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"type": 5
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 3,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "LoggedErrorStackTrace",
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
							"name": "stackHash"
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 2,
							"isId": false,
							"name": "stack"
						}
					],
					"relations": [],
					"tableConfig": {
						"name": "LOGGED_ERROR_STACK_TRACE"
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
									"oneColumnIndex": 0
								}
							],
							"name": "LOG_ENTRY_ID",
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
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 3,
									"oneColumnIndex": 0
								}
							],
							"name": "LOGGED_ERROR_STACK_TRACE_ID",
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
						}
					],
					"index": 4,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "LoggedError",
					"properties": [
						{
							"index": 0,
							"isId": true,
							"name": "logEntry",
							"relationRef": {
								"index": 0
							}
						},
						{
							"index": 1,
							"isId": false,
							"name": "stackTrace",
							"relationRef": {
								"index": 1
							}
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": true,
							"isRepositoryJoin": false,
							"joinFunctionWithOperator": 0,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 2
						},
						{
							"index": 1,
							"isId": false,
							"isRepositoryJoin": false,
							"joinFunctionWithOperator": 0,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 3
						}
					],
					"tableConfig": {
						"name": "LOGGED_ERROR"
					}
				}
			],
			"referencedSchemas": [],
			"versionString": "1.0.0"
		}
	]
};