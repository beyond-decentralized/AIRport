import {DI}             from '@airport/di'
import {ENTITY_UTILS}   from '../../diTokens'
import {RawEntityQuery} from '../../lingo/query/facade/EntityQuery'
import {RawQuery}       from '../../lingo/query/facade/Query'
import {IEntityUtils}   from '../../lingo/utils/EntityUtils'
import {QOperableField} from '../core/field/OperableField'
import {EntityQuery}    from '../query/facade/EntityQuery'
import {objectExists}   from '../Utils'

/**
 * Created by Papa on 6/14/2016.
 */

export class EntityUtils
	implements IEntityUtils {

	getObjectClassName(object: any): string {
		if (typeof object != 'object' || object === null) {
			throw `Not an object instance`
		}
		return this.getClassName(object.constructor)
	}

	getClassName(clazz: Function): string {
		if (typeof clazz != 'function') {
			throw `Not a constructor function`
		}

		let className = clazz['name']
		// let className = /(\w+)\(/.exec(clazz.toString())[1];

		return className
	}

	exists(object: any) {
		return objectExists(object)
	}

	/*
	 static isBlank(
	 object: any
	 ) {
	 for (let propertyName in object) {
	 let property = object[propertyName];
	 if (this.exists(property)) {
	 if (property instanceof Array) {
	 if (property.length > 0) {
	 return false;
	 }
	 } else {
	 return false;
	 }
	 }
	 }
	 return true;
	 }
	 */

	isAppliable(object: any): boolean {
		return object instanceof QOperableField
	}

	getQuery<Q>(
		query: Q | { (...args: any[]): Q }
	): Q {
		return <Q><any>this.getRawQuery(<any>query)
	}

	getRawQuery(
		rawQuery: RawQuery | { (...args: any[]): RawQuery }
	): RawQuery {
		if (rawQuery instanceof Function) {
			return rawQuery()
		} else {
			return rawQuery
		}
	}

	getEntityQuery(
		rawGraphQuery: RawEntityQuery<any> | { (...args: any[]): RawEntityQuery<any> }
	): EntityQuery<any> {
		return new EntityQuery(this.getRawQuery(rawGraphQuery))
	}

}
DI.set(ENTITY_UTILS, EntityUtils)
