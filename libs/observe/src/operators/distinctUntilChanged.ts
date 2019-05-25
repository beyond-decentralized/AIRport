import {Observable} from '../Observable'

export function distinctUntilChanged<V>(
	callback: (up$CurVal?: any) => V,
	context: any
): V {
	const $: Observable<any> = context.$

	if(!$.upstream || !$.upstream.length) {
		return callback()
	}

	let up$CurVal = $.upstream[0].currentValue
	if ($.upstream.length > 1) {
		up$CurVal = $.upstream.map(upstream$ => upstream$.currentValue)
	}

	try {
		if(!$.up$LastVal) {
			return callback(up$CurVal)
		}

		if($.upstream.every((upstream$, index) =>
			upstream$.currentValue === up$CurVal[index])) {
			return $.currentValue
		}

		return callback(up$CurVal)
	} finally {
		$.up$LastVal = up$CurVal
	}
}
