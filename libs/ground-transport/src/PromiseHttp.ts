import {Observable} from 'rxjs';

/**
 * Created by Papa on 1/5/2016.
 */
export abstract class PromiseHttp {

	constructor(
		// private http:Http
	) {
	}

	abstract get(
		url: string,
		requestOptionsArgs?: any // RequestOptionsArgs
	): Promise<any>;

// {
	// let getRequest = this.http.get(url, requestOptionsArgs);
	// return this.asPromise(getRequest);
	// }

	abstract post(
		url: string,
		data: string,
		requestOptionsArgs?: any // RequestOptionsArgs
	): Promise<any>;

	// {
	// 	let getRequest = this.http.post(url, data, requestOptionsArgs);
	// 	return this.asPromise(getRequest);
	// }

	private asPromise<T>(
		observable: Observable<T>
	): Promise<any> {
		return new Promise((
			resolve,
			reject
		) => {
			observable.subscribe((response) => {
				resolve(response);
			}, (error) => {
				reject(error);
			});
		});
	}
}
