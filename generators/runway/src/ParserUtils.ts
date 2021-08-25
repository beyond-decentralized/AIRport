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
