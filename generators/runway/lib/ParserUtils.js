export function forEach(collection, callback) {
    if (collection instanceof Map) {
        for (let [key, value] of collection.entries()) {
            callback(key, value);
        }
    }
    else {
        for (let memberName in collection) {
            callback(memberName, collection[memberName]);
        }
    }
}
export function getExpectedPropertyIndexesFormatMessage() {
    return `
	General expected @Table({ indexes: ...}) formats for property based indexes:

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
	}`;
}
//# sourceMappingURL=ParserUtils.js.map