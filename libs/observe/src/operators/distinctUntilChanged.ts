export function distinctUntilChanged<V>(
	value: V,
	context: any
): V {
	if (value === context.lastValue) {
		return undefined
	}

	return value
}