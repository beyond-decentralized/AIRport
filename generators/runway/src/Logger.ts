/**
 * Created by Papa on 3/26/2016.
 */

export class Logger {

	error(
		message:string
	):void {
		this.log('ERROR', message)
	}

	log(
		severity:string,
		message:string
	):void {
		console.log(`${this.getNowStamp()} [${severity}]: ${message}`)
	}

	getNowStamp() {
		let date = new Date()
		return this.getTimeStamp(date)
	}

	getTimeStamp(
		date:Date
	):string {
		return date.toISOString()
	}

}