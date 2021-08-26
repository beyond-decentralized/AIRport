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
//# sourceMappingURL=ParserUtils.js.map