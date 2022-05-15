import { isFunction, isNumber, isString } from 'lodash';
import { ReflectionKind } from 'typedoc';

export const addReflectionKind = ( ns: string, name: string, value?: number ) => {
	const fullname = `${ns}:${name}`;

	value = value ??
		( Math.max( ...Object.values( { ...ReflectionKind, All: -1 } ).filter( isNumber ) ) * 2 );
	const kindAny = ReflectionKind as any;
	kindAny[fullname] = value;
	kindAny[value] = fullname;
	return value;
};

export const rethrow = <T>( block: () => T, newErrorFactory: ( err: any ) => string | Error ) => {
	try {
		return block();
	} catch( err ){
		const newErr = newErrorFactory( err );
		if( isString( newErr ) ){
			throw new Error( newErr );
		} else {
			throw newErr;
		}
	}
};

export const wrapError = ( message: string, err: any, propagateStack = true ) => {
	const newErr = new Error( `${message}:\n${err?.message || err}` );
	if( propagateStack ){
		if( err.stack ){
			newErr.stack = `${message}\n${err.stack}`;
		}
	}
	return newErr;
};

export const catchWrap = <T>( block: () => T, contextMessage: string | ( ( err: any ) => any ) ) =>
	rethrow( block, err => isFunction( contextMessage ) ? contextMessage( err ) : wrapError( contextMessage, err ) );
