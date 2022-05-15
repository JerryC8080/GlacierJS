import { isString } from 'lodash';
import { LogLevel, Logger } from 'typedoc';

import type { ABasePlugin } from './base-plugin';

export class PluginLogger extends Logger {
	public constructor( private readonly _parent: Logger, private readonly _plugin: ABasePlugin, private readonly _context?: string ){
		super();
		this.level = this._parent.level;
	}

	/**
	 * Create a new {@link PluginLogger} for the given context.
	 *
	 * @param context - The new logger context.
	 * @returns the new logger.
	 */
	public makeChildLogger( context?: string ){
		const newLogger = new PluginLogger( this._parent, this._plugin, context );
		newLogger.level = this.level;
		return newLogger;
	}

	/**
	 * Log the given verbose message.
	 *
	 * @param text  - The message that should be logged.
	 */
	public verbose( text: string | ( () => string ) ): void {
		this.log( text, LogLevel.Verbose );
	}

	/**
	 * Log the given info message.
	 *
	 * @param text  - The message that should be logged.
	 */
	public info( text: string | ( () => string ) ): void {
		this.log( text, LogLevel.Info );
	}

	/**
	 * Log the given warning message.
	 *
	 * @param text  - The warning that should be logged.
	 */
	public warn( text: string | ( () => string ) ): void {
		this.log( text, LogLevel.Warn );
	}

	/**
	 * Log the given deprecation message.
	 *
	 * @param text  - The message that should be logged.
	 * @param addStack - TODO: Not sure why ?
	 */
	public deprecated( text: string | ( () => string ), addStack?: boolean ): void {
		if ( addStack ) {
			const stack = new Error().stack?.split( '\n' );
			if ( stack && stack.length >= 4 ) {
				text = () => `${text}\n${stack[3]}`;
			}
		}
		this.warn( text );
	}

	/**
	 * Log the given error message.
	 *
	 * @param text  - The error that should be logged.
	 */
	public error( text: string | ( () => string ) ): void {
		this.log( text, LogLevel.Error );
	}

	/**
	 * Print a log message.
	 *
	 * @param message  - The message itself.
	 * @param level  - The urgency of the log message.
	 */
	public log( message: string | ( () => string ), level: LogLevel ): void {
		if( level < this.level ){
			return;
		}
		this._logThroughParent( message, level );
	}

	/**
	 * Pass a log message to the parent.
	 *
	 * @param message  - The message itself.
	 * @param level  - The urgency of the log message.
	 */
	private _logThroughParent( message: string | ( () => string ), level: LogLevel ){
		if( this._parent instanceof PluginLogger ){
			this._parent._logThroughParent( message, level );
		} else {
			const orignalLevel = this._parent.level;
			this._parent.level = LogLevel.Verbose;
			this._parent.log( this._formatMessage( isString( message ) ? message : message() ), level );
			this._parent.level = orignalLevel;
		}
	}

	/**
	 * Format the given message.
	 *
	 * @param message - The message to format.
	 * @returns the formatted message;
	 */
	private _formatMessage( message: string ){
		let fullMessage = `[${this._plugin.package.name}]`;
		if( this._context ){
			fullMessage += ': ';
			fullMessage += this._context;
		}
		fullMessage += ' ⇒ ';
		fullMessage += message;
		return fullMessage;
	}
}
