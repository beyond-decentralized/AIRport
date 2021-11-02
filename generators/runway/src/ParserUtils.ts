export function forEach(
	collection,
	callback: {
		(
			key: string,
			item: any
		): void
	}
) {
	if (collection instanceof Map) {
		for (let [key, value] of collection.entries()) {
			callback(key, value);
		}
	} else {
		for (let memberName in collection) {
			callback(memberName, collection[memberName]);
		}
	}
}

export function getExpectedPropertyIndexesFormatMessage(): string {
	return `

	General expected property 'indexes' format format:

	@Entity()
	@Table({
		name: 'TABLE_NAME',
		indexes: (enityAlias:  EntityType) => [{
			property: entityAlias.propetyName
		}]
	})
	export class EntityType {

		@ManyToOne()
		propertyName: AnotherEntityType 

		...
	}`
}
