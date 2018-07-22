import {PromiseHttp} from "../../PromiseHttp";
import {GoogleApi}   from '../GoogleApi';

/**
 * Created by Papa on 1/5/2016.
 */
class FeedType {
	static WORKSHEETS = 'worksheets';
	static LIST = 'list';
}

class Scope {
	static PRIVATE = 'private';
	static PUBLIC = 'public';
}

class ReturnType {
	static FULL = 'full';
}

export class GoogleSheets {

	urlPrefix: string = 'https://spreadsheets.google.com/feeds';

	constructor(
		private googleApi: GoogleApi,
		private promiseHttp: PromiseHttp
	) {
	}

	getSheet(
		fileId: string
	): Promise<any> {
		return this.promiseHttp.get(this.getListFeedUrl(fileId));
	}

	getWorksheets(
		fileId: string
	): Promise<any> {
		return this.googleApi.request(this.getWorksheetsUrl(fileId));
	}

	getRequestOptionsArgs(): any // RequestOptionsArgs
	{
		let headers = {}; //new Headers();
		// headers.append('Authorization', 'GoogleLogin auth=' + 1);
		// headers.append('GData-Version', '3.0');
		let requestOptionsArgs = {
			headers: headers
		};

		return requestOptionsArgs;
	}

	private getListFeedUrl(
		fileId: string
	): string {
		let url = `${this.urlPrefix}/${FeedType.LIST}/key/${fileId}/${this.getUrlSuffix()}`;

		return url;
	}

	private getWorksheetsUrl(
		fileId: string
	): string {
		let url = `${this.urlPrefix}/${FeedType.WORKSHEETS}/${fileId}/${this.getUrlSuffix()}`;

		return url;
	}

	private getUrlSuffix(): string {
		let accessToken = gapi.auth.getToken().access_token;
		let suffix = `/private/full/?access_token=${accessToken}`;

		return suffix;
	}

	addRow(
		fileId: string,
		rowXml: string
	): Promise<any> {
		return this.promiseHttp.post(this.getListFeedUrl(fileId), rowXml);
	}
}