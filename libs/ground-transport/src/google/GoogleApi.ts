/**
 * Created by Papa on 1/2/2016.
 */

export class ApiConstants {
	static URL_PREFIX   = 'https://www.googleapis.com/auth/'
	static DRIVE_PREFIX = 'drive.'
	static PREFIX       = ApiConstants.URL_PREFIX + ApiConstants.DRIVE_PREFIX
	static APP_FOLDER   = ApiConstants.PREFIX + 'appfolder'
	static INSTALL      = ApiConstants.PREFIX + 'install'
	static FILE         = ApiConstants.PREFIX + 'file'
	static SHEETS       = 'https://spreadsheets.google.com/feeds'
	static PROFILE      = 'profile'
	static ALL_SCOPES   = [ApiConstants.APP_FOLDER, ApiConstants.INSTALL, ApiConstants.FILE, ApiConstants.SHEETS, ApiConstants.PROFILE]
}

export class GoogleApi {

	rootUrl     = 'https://accounts.google.com/o/oauth2/auth'
	redirectUri = 'http://localhost/callback'

	constructor() {
	}

	mobileAuthenticate(
		clientId: string,
		apis: string[],
		options,
		deferred
	): Promise<any> {
		if (options !== undefined) {
			if (options.hasOwnProperty('redirect_uri')) {
				this.redirectUri = options.redirect_uri
			}
		}
		let url        = this.getMobileAuthUrl(clientId, apis)
		let browserRef = window.open(url, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes')

		let authenticatePromise = new Promise((
			resolve,
			reject
		) => {

			browserRef.addEventListener('loadstart', (event: any) => {
				console.log('loadstart, event.url: ' + event.url)
				if ((event.url).indexOf(this.redirectUri) === 0) {
					browserRef.removeEventListener('exit', function (event) {
					})
					browserRef.close()
					let callbackResponse   = (event.url).split('#')[1]
					let responseParameters = (callbackResponse).split('&')
					let parameterMap: any  = {}
					for (let i = 0; i < responseParameters.length; i++) {
						let keyValue              = responseParameters[i].split('=')
						parameterMap[keyValue[0]] = keyValue[1]
					}
					if (parameterMap.access_token !== undefined && parameterMap.access_token !== null) {
						resolve(parameterMap)
						// deferred.resolve({ state : parameterMap.state,error : parameterMap.error,
						// access_token: parameterMap.access_token, token_type:
						// parameterMap.token_type, expires_in: parameterMap.expires_in });
					} else {
						reject('Problem authenticating')
					}
				}
			})
			browserRef.addEventListener('exit', function (event) {
				reject('The sign in flow was canceled')
			})
		})

		return authenticatePromise
	}

	getMobileAuthUrl(
		clientId,
		apis: string[]
	): string {
		let url = `${this.rootUrl}?client_id=${clientId}&redirect_uri=${this.redirectUri}&scope=${apis.join(' ')}&approval_prompt=force&response_type=token`

		return url
	}

	authorizeApis(
		apiKey: string,
		clientId: string,
		apis: string[]
	): Promise<any> {
		let initializeApiPromise: Promise<any> = new Promise((
			resolve,
			reject
		) => {
			let scopeCallbacks: Promise<any>[] = []

			try {
				if (apiKey) {
					gapi.client.setApiKey(apiKey)
				}
				gapi.auth.authorize({
					client_id: clientId,
					scope: apis.join(' '),
					immediate: false
				}, (authResult: GoogleApiOAuth2TokenObject) => {
					if (authResult && !authResult.error) {
						resolve(gapi)
					} else {
						reject(authResult.error)
					}
				})
			} catch (error) {
				reject(error)
			}
		})
		return initializeApiPromise
	}

	loadApi(
		apiName: string,
		version: string
	): Promise<any> {
		return Promise.resolve().then(() => {
			if (version) {
				return <Promise<any>>gapi.client.load(apiName, version)
			} else {
				// 				return <Promise<any>><any>gapi.load(apiName, undefined);
				throw new Error(`Google API Version must be specified.`)
			}
		})
	}

	request(
		path: string,
		method?: string,
		params?: any,
		headers?: any,
		body?: any
	): Promise<any> {

		return new Promise((
			resolve,
			reject
		) => {
			resolve()
		}).then(() => {
			return <any>gapi.client.request({
				path: path,
				method: method,
				params: params,
				headers: headers,
				body: body
			})
		})
	}

}
