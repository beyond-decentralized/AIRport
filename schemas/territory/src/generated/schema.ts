export const SCHEMA = {
	"domain": "public",
	"index": null,
	"name": "@airport/territory",
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
							"name": "NAME",
							"propertyRefs": [
								{
									"index": 1
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
					"index": 0,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "Package",
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
							"name": "name"
						},
						{
							"index": 2,
							"isId": false,
							"name": "applicationPackages",
							"relationRef": {
								"index": 0
							}
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "package"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 1
						}
					],
					"tableConfig": {
						"name": "PACKAGES"
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
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 3,
									"oneRelationIndex": 1,
									"oneColumnIndex": 0
								}
							],
							"name": "APPLICATION_ID",
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
									"oneRelationIndex": 0,
									"oneColumnIndex": 0
								}
							],
							"name": "PACKAGE_ID",
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
					"index": 1,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "ApplicationPackage",
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
							"name": "application",
							"relationRef": {
								"index": 0
							}
						},
						{
							"index": 2,
							"isId": false,
							"name": "package",
							"relationRef": {
								"index": 1
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
							"relationTableIndex": 3
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 0
						}
					],
					"tableConfig": {
						"name": "APPLICATION_PACKAGES"
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
							"name": "NAME",
							"propertyRefs": [
								{
									"index": 1
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
					"index": 2,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "Domain",
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
							"name": "name"
						},
						{
							"index": 2,
							"isId": false,
							"name": "applications",
							"relationRef": {
								"index": 0
							}
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "domain"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 3
						}
					],
					"tableConfig": {
						"name": "DOMAINS"
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
							"name": "NAME",
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"type": 5
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
							"name": "DOMAIN_ID",
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
					"index": 3,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "Application",
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
							"name": "name"
						},
						{
							"index": 2,
							"isId": false,
							"name": "domain",
							"relationRef": {
								"index": 0
							}
						},
						{
							"index": 3,
							"isId": false,
							"name": "applicationPackages",
							"relationRef": {
								"index": 1
							}
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 2
						},
						{
							"index": 1,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "APPLICATION_ID"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 3
							},
							"relationTableIndex": 1
						}
					],
					"tableConfig": {
						"name": "APPLICATIONS"
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
							"name": "NAME",
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"type": 5
						},
						{
							"index": 2,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 0,
									"oneColumnIndex": 0
								}
							],
							"name": "PACKAGE_ID",
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
					"index": 4,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "PackagedUnit",
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
							"name": "name"
						},
						{
							"index": 2,
							"isId": false,
							"name": "package",
							"relationRef": {
								"index": 0
							}
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 0
						}
					],
					"tableConfig": {
						"name": "PACKAGED_UNITS"
					}
				}
			],
			"integerVersion": 1,
			"referencedSchemas": [],
			"versionString": "1.0.0"
		}
	]
};