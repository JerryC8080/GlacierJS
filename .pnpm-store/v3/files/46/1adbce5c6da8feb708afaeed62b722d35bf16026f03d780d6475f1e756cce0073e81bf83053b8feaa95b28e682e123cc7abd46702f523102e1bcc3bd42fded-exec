import assert from 'assert';
import { statSync } from 'fs';
import { basename, dirname, relative, resolve } from 'path';

import { camelCase, once } from 'lodash';
import { sync as pkgUpSync } from 'pkg-up';
import { satisfies } from 'semver';
import { PackageJson, ReadonlyDeep, SetRequired } from 'type-fest';
import { Application } from 'typedoc';

import { PluginLogger } from './plugin-logger';

type RequiredPackageJson = SetRequired<PackageJson, 'name' | 'version'>
export abstract class ABasePlugin {
	private static readonly _rootDir = once( ( app: Application ) => {
		const opts = app.options.getValue( 'options' );
		const stat = statSync( opts );
		if( stat.isDirectory() ){
			return opts;
		} else if( stat.isFile() ){
			return dirname( opts );
		} else {
			throw new Error();
		}
	} );
	public readonly optionsPrefix: string;
	public readonly package: ReadonlyDeep<RequiredPackageJson>;
	public readonly logger: PluginLogger;
	public get name(): string{
		return `${this.package.name}:${this.constructor.name}`;
	}
	public get rootDir(): string {
		return ABasePlugin._rootDir( this.application );
	}
	public readonly pluginDir: string;
	/**
	 * Instanciate a new instance of the base plugin. The `package.json` file will be read to obtain the plugin name & the TypeDoc compatible range.
	 * Logs a warning if the current TypeDoc version is not compatible.
	 *
	 * @param application - The application instance.
	 * @param pluginFilename - The actual plugin file name. Used to lookup the `package.json` file.
	 */
	public constructor( public readonly application: Application, pluginFilename: string ){
		const pkgFile = pkgUpSync( { cwd: dirname( pluginFilename ) } );
		if( !pkgFile ){
			throw new Error( 'Could not determine package.json' );
		}
		// eslint-disable-next-line @typescript-eslint/no-var-requires -- Require package.json
		const pkg: ReadonlyDeep<PackageJson> = require( pkgFile );
		assert( pkg.name );
		assert( pkg.version );
		this.pluginDir = dirname( pkgFile );
		this.package = pkg as RequiredPackageJson;
		this.logger = new PluginLogger( application.logger, this );
		this.logger.verbose( `Using plugin version ${pkg.version}` );
		const typedocPeerDep = pkg.peerDependencies?.typedoc ?? pkg.dependencies?.typedoc;
		assert( typedocPeerDep );
		if( !satisfies( Application.VERSION, typedocPeerDep ) ){
			this.logger.warn( `TypeDoc version ${Application.VERSION} does not match the plugin's peer dependency range ${typedocPeerDep}. You might encounter problems.` );
		}
		this.optionsPrefix = camelCase( basename( pkg.name ).replace( /^typedoc-/, '' ) );
	}

	/**
	 * This method is called after the plugin has been instanciated.
	 *
	 * @see {@link import('./autoload').autoload}.
	 */
	public abstract initialize(): void;

	/**
	 * Return the path as a relative path from the {@link rootDir}.
	 *
	 * @param path - The path to convert.
	 * @returns the relative path.
	 */
	public relativeToRoot( path: string ){
		return relative( this.rootDir, path );
	}
	/**
	 * Resolve the path to a plugin file (resolved from the plugin `package.json`).
	 *
	 * @param path - The path to resolve.
	 * @returns the resolved path.
	 */
	public resolvePackageFile( path: string ){
		return resolve( this.pluginDir, path );
	}
}
