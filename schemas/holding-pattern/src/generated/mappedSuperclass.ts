/* eslint-disable */
export const MAPPED_SUPERCLASS = [
	{
		"type": "AirEntity",
		"path": "D:\\code\\BD\\AIRport\\schemas\\holding-pattern\\src\\ddl\\repository\\AirEntity.ts",
		"parentClassName": null,
		"isSuperclass": true,
		"ids": [
			{
				"decorators": [
					{
						"name": "Id",
						"values": []
					},
					{
						"name": "ManyToOne",
						"values": []
					},
					{
						"name": "JoinColumn",
						"values": [
							{
								"name": "REPOSITORY_LID",
								"referencedColumnName": "REPOSITORY_LID",
								"nullable": false
							}
						]
					}
				],
				"isGenerated": false,
				"isId": true,
				"isMappedSuperclass": false,
				"isTransient": false,
				"name": "repository",
				"optional": true,
				"type": "Repository",
				"ownerEntity": null,
				"nonArrayType": "Repository",
				"entity": null,
				"index": 0
			},
			{
				"decorators": [
					{
						"name": "Id",
						"values": []
					},
					{
						"name": "ManyToOne",
						"values": []
					},
					{
						"name": "JoinColumn",
						"values": [
							{
								"name": "ACTOR_LID",
								"referencedColumnName": "ACTOR_LID",
								"nullable": false
							}
						]
					}
				],
				"isGenerated": false,
				"isId": true,
				"isMappedSuperclass": false,
				"isTransient": false,
				"name": "actor",
				"optional": true,
				"type": "Actor",
				"ownerEntity": null,
				"nonArrayType": "Actor",
				"entity": null,
				"index": 1
			},
			{
				"decorators": [
					{
						"name": "Id",
						"values": []
					},
					{
						"name": "Column",
						"values": [
							{
								"name": "ACTOR_RECORD_ID",
								"nullable": false
							}
						]
					},
					{
						"name": "GeneratedValue",
						"values": []
					}
				],
				"isGenerated": true,
				"isId": true,
				"isMappedSuperclass": false,
				"isTransient": false,
				"name": "_actorRecordId",
				"optional": true,
				"type": "number",
				"ownerEntity": null,
				"nonArrayType": "number",
				"primitive": "number",
				"index": 2
			}
		],
		"docEntry": {
			"decorators": [
				{
					"name": "MappedSuperclass",
					"values": []
				}
			],
			"isGenerated": false,
			"isId": false,
			"isMappedSuperclass": true,
			"isTransient": false,
			"name": "AirEntity",
			"optional": false,
			"type": "typeof AirEntity",
			"fileImports": {
				"importMapByObjectAsName": {
					"Column": {
						"fileImports": null,
						"isLocal": false,
						"objectMapByAsName": {
							"Column": {
								"asName": "Column",
								"moduleImport": null,
								"sourceName": "Column"
							},
							"DbDate": {
								"asName": "DbDate",
								"moduleImport": null,
								"sourceName": "DbDate"
							},
							"DbNumber": {
								"asName": "DbNumber",
								"moduleImport": null,
								"sourceName": "DbNumber"
							},
							"GeneratedValue": {
								"asName": "GeneratedValue",
								"moduleImport": null,
								"sourceName": "GeneratedValue"
							},
							"Id": {
								"asName": "Id",
								"moduleImport": null,
								"sourceName": "Id"
							},
							"JoinColumn": {
								"asName": "JoinColumn",
								"moduleImport": null,
								"sourceName": "JoinColumn"
							},
							"ManyToOne": {
								"asName": "ManyToOne",
								"moduleImport": null,
								"sourceName": "ManyToOne"
							},
							"MappedSuperclass": {
								"asName": "MappedSuperclass",
								"moduleImport": null,
								"sourceName": "MappedSuperclass"
							},
							"Transient": {
								"asName": "Transient",
								"moduleImport": null,
								"sourceName": "Transient"
							}
						},
						"path": "@airport/tarmaq-entity"
					},
					"DbDate": null,
					"DbNumber": null,
					"GeneratedValue": null,
					"Id": null,
					"JoinColumn": null,
					"ManyToOne": null,
					"MappedSuperclass": null,
					"Transient": null,
					"Actor": {
						"fileImports": null,
						"isLocal": true,
						"objectMapByAsName": {
							"Actor": {
								"asName": "Actor",
								"moduleImport": null,
								"sourceName": "Actor"
							}
						},
						"path": "../infrastructure/Actor"
					},
					"SystemWideOperationId": {
						"fileImports": null,
						"isLocal": true,
						"objectMapByAsName": {
							"SystemWideOperationId": {
								"asName": "SystemWideOperationId",
								"moduleImport": null,
								"sourceName": "SystemWideOperationId"
							}
						},
						"path": "../common"
					},
					"Repository": {
						"fileImports": null,
						"isLocal": true,
						"objectMapByAsName": {
							"Repository": {
								"asName": "Repository",
								"moduleImport": null,
								"sourceName": "Repository"
							}
						},
						"path": "./Repository"
					},
					"UserAccount": {
						"fileImports": null,
						"isLocal": false,
						"objectMapByAsName": {
							"UserAccount": {
								"asName": "UserAccount",
								"moduleImport": null,
								"sourceName": "UserAccount"
							}
						},
						"path": "@airport/travel-document-checkpoint"
					},
					"IOC": {
						"fileImports": null,
						"isLocal": false,
						"objectMapByAsName": {
							"IOC": {
								"asName": "IOC",
								"moduleImport": null,
								"sourceName": "IOC"
							}
						},
						"path": "@airport/direction-indicator"
					},
					"AIR_ENTITY_UTILS": {
						"fileImports": null,
						"isLocal": false,
						"objectMapByAsName": {
							"AIR_ENTITY_UTILS": {
								"asName": "AIR_ENTITY_UTILS",
								"moduleImport": null,
								"sourceName": "AIR_ENTITY_UTILS"
							}
						},
						"path": "@airport/aviation-communication"
					}
				},
				"importMapByModulePath": {
					"@airport/tarmaq-entity": null,
					"../infrastructure/Actor": null,
					"../common": null,
					"./Repository": null,
					"@airport/travel-document-checkpoint": null,
					"@airport/direction-indicator": null,
					"@airport/aviation-communication": null
				}
			},
			"properties": [
				{
					"decorators": [
						{
							"name": "Id",
							"values": []
						},
						{
							"name": "ManyToOne",
							"values": []
						},
						{
							"name": "JoinColumn",
							"values": [
								{
									"name": "REPOSITORY_LID",
									"referencedColumnName": "REPOSITORY_LID",
									"nullable": false
								}
							]
						}
					],
					"isGenerated": false,
					"isId": true,
					"isMappedSuperclass": false,
					"isTransient": false,
					"name": "repository",
					"optional": true,
					"type": "Repository",
					"ownerEntity": null,
					"nonArrayType": "Repository",
					"entity": null,
					"index": 0
				},
				{
					"decorators": [
						{
							"name": "Id",
							"values": []
						},
						{
							"name": "ManyToOne",
							"values": []
						},
						{
							"name": "JoinColumn",
							"values": [
								{
									"name": "ACTOR_LID",
									"referencedColumnName": "ACTOR_LID",
									"nullable": false
								}
							]
						}
					],
					"isGenerated": false,
					"isId": true,
					"isMappedSuperclass": false,
					"isTransient": false,
					"name": "actor",
					"optional": true,
					"type": "Actor",
					"ownerEntity": null,
					"nonArrayType": "Actor",
					"entity": null,
					"index": 1
				},
				{
					"decorators": [
						{
							"name": "Id",
							"values": []
						},
						{
							"name": "Column",
							"values": [
								{
									"name": "ACTOR_RECORD_ID",
									"nullable": false
								}
							]
						},
						{
							"name": "GeneratedValue",
							"values": []
						}
					],
					"isGenerated": true,
					"isId": true,
					"isMappedSuperclass": false,
					"isTransient": false,
					"name": "_actorRecordId",
					"optional": true,
					"type": "number",
					"ownerEntity": null,
					"nonArrayType": "number",
					"primitive": "number",
					"index": 2
				},
				{
					"decorators": [
						{
							"name": "Column",
							"values": [
								{
									"name": "AGE_SUITABILITY",
									"nullable": false
								}
							]
						},
						{
							"name": "DbNumber",
							"values": []
						}
					],
					"isGenerated": false,
					"isId": false,
					"isMappedSuperclass": false,
					"isTransient": false,
					"name": "ageSuitability",
					"optional": true,
					"type": "number",
					"ownerEntity": null,
					"nonArrayType": "number",
					"primitive": "number",
					"index": 3
				},
				{
					"decorators": [
						{
							"name": "Column",
							"values": [
								{
									"name": "CREATED_AT"
								}
							]
						},
						{
							"name": "DbDate",
							"values": []
						}
					],
					"isGenerated": false,
					"isId": false,
					"isMappedSuperclass": false,
					"isTransient": false,
					"name": "createdAt",
					"optional": true,
					"type": "Date",
					"ownerEntity": null,
					"nonArrayType": "Date",
					"primitive": "Date",
					"index": 4
				},
				{
					"decorators": [
						{
							"name": "Column",
							"values": [
								{
									"name": "SYSTEM_WIDE_OPERATION_LID",
									"nullable": false
								}
							]
						}
					],
					"isGenerated": false,
					"isId": false,
					"isMappedSuperclass": false,
					"isTransient": false,
					"name": "systemWideOperationId",
					"optional": true,
					"type": "number",
					"ownerEntity": null,
					"nonArrayType": "number",
					"primitive": "number",
					"index": 5
				},
				{
					"decorators": [
						{
							"name": "ManyToOne",
							"values": []
						},
						{
							"name": "JoinColumn",
							"values": [
								{
									"name": "ORIGINAL_REPOSITORY_LID",
									"referencedColumnName": "REPOSITORY_LID"
								}
							]
						}
					],
					"isGenerated": false,
					"isId": false,
					"isMappedSuperclass": false,
					"isTransient": false,
					"name": "originalRepository",
					"optional": true,
					"type": "Repository",
					"ownerEntity": null,
					"nonArrayType": "Repository",
					"entity": null,
					"index": 6
				},
				{
					"decorators": [
						{
							"name": "ManyToOne",
							"values": []
						},
						{
							"name": "JoinColumn",
							"values": [
								{
									"name": "ORIGINAL_ACTOR_LID",
									"referencedColumnName": "ACTOR_LID"
								}
							]
						}
					],
					"isGenerated": false,
					"isId": false,
					"isMappedSuperclass": false,
					"isTransient": false,
					"name": "originalActor",
					"optional": true,
					"type": "Actor",
					"ownerEntity": null,
					"nonArrayType": "Actor",
					"entity": null,
					"index": 7
				},
				{
					"decorators": [
						{
							"name": "Column",
							"values": [
								{
									"name": "ORIGINAL_ACTOR_RECORD_ID"
								}
							]
						}
					],
					"isGenerated": false,
					"isId": false,
					"isMappedSuperclass": false,
					"isTransient": false,
					"name": "originalActorRecordId",
					"optional": true,
					"type": "number",
					"ownerEntity": null,
					"nonArrayType": "number",
					"primitive": "number",
					"index": 8
				},
				{
					"decorators": [
						{
							"name": "Transient",
							"values": []
						}
					],
					"isGenerated": false,
					"isId": false,
					"isMappedSuperclass": false,
					"isTransient": true,
					"name": "createdBy",
					"optional": true,
					"type": "UserAccount",
					"ownerEntity": null,
					"nonArrayType": "UserAccount"
				},
				{
					"decorators": [
						{
							"name": "Transient",
							"values": []
						}
					],
					"isGenerated": false,
					"isId": false,
					"isMappedSuperclass": false,
					"isTransient": true,
					"name": "isNew",
					"optional": true,
					"type": "boolean",
					"ownerEntity": null,
					"nonArrayType": "boolean",
					"primitive": "boolean"
				},
				{
					"decorators": [
						{
							"name": "Transient",
							"values": []
						}
					],
					"isGenerated": false,
					"isId": false,
					"isMappedSuperclass": false,
					"isTransient": true,
					"name": "id",
					"optional": true,
					"type": "string",
					"ownerEntity": null,
					"nonArrayType": "string",
					"primitive": "string"
				}
			],
			"methodSignatures": [],
			"constructors": [
				{
					"parameters": [
						{
							"decorators": [],
							"isGenerated": false,
							"isId": false,
							"isMappedSuperclass": false,
							"isTransient": false,
							"name": "entityGUID",
							"optional": true,
							"type": "string"
						}
					],
					"returnType": "AirEntity"
				}
			]
		},
		"implementedInterfaceNames": [],
		"project": "@airport/holding-pattern"
	}
];