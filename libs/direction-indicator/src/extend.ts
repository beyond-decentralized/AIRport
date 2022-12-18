/**
 * From:
 * http://js-bits.blogspot.com/2010/08/javascript-inheritance-done-right.html
 * Via:
 * https://stackoverflow.com/questions/6617780/how-to-call-parent-constructor
 */
export function extend(
	base,
	sub,
	methods
) {
	sub.prototype = Object.create(base.prototype)
	sub.prototype.constructor = sub
	sub.base = base.prototype

	// Copy the methods passed in to the prototype
	for (const name in methods) {
		sub.prototype[name] = methods[name]
	}
	// so we can define the constructor inline
	return sub
}
globalThis.extend = extend