/**
 * Created by Papa on 1/3/2016.
 */

// import * as JXON from 'jxon/index.js';
import {RealtimeApiTest} from './RealtimeApiTest';
import {Injectable, NgGoogleSharingAdaptor} from "./Injectables";
import { SharedChangeList } from "../../../apis/terminal-map/src/sync/SharedChangeList";

// let jxon = <any>JXON;
// jxon.config({});


@Injectable()
export class Test {
	original = `
		<entry xmlns="http:// www.w3.org/2005/Atom"
			xmlns:gsx="http:// schemas.google.com/spreadsheets/2006/extended">
		<gsx:hours>1</gsx:hours>
		<gsx:ipm>1</gsx:ipm>
		<gsx:items>60</gsx:items>
		<gsx:name>Artem</gsx:name>
		</entry>
		`;

	constructor(
		private adaptor:NgGoogleSharingAdaptor,
		private apiTest:RealtimeApiTest
	) {
		// console.log('ORIGINAL:');
		// console.log(this.original);
		// let json = jxon.stringToJs(this.original);
		// console.log('JSON:');
		// console.log(json);
		// let xml = jxon.jsToString(json);
		// console.log('XML:');
		// console.log(xml);
	}

	test():void {
		let setupInfo = {
			apiKey: undefined,
			clientId: '510562956378-us0ctkm6happ44lrhpunmv9tqhol0omd.apps.googleusercontent.com'
		};
		this.adaptor.initialize(setupInfo)
			.then(( setupInfo ) => {
				this.adaptor.findExistingChangeLists(setupInfo).then((
					listings
				) => {
					listings.forEach((
						listing
					) => {
						this.adaptor.loadChangeList(listing).then((
							changeList:SharedChangeList
						) => {
							console.log(changeList);
						});
					});
				});
				/*
				 this.adaptor.createPlanner('Test ChangeList', setupInfo).then((
				 changeList
				 ) => {
				 console.log('ChangeList:');
				 console.log(changeList);
				 });
				 */
			});
	}

}


