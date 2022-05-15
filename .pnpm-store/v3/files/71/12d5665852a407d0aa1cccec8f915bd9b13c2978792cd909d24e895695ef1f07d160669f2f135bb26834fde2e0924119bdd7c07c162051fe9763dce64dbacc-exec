import assert from 'assert';
import { existsSync } from 'fs';
import { dirname, isAbsolute, join, resolve } from 'path';

import { isString, uniq } from 'lodash';
import { sync as pkgUpSync } from 'pkg-up';
import { LiteralUnion } from 'type-fest';
import { DeclarationReflection, ProjectReflection, Reflection, ReflectionKind } from 'typedoc';

import type { ABasePlugin } from './base-plugin';

const isModule = ( reflection: Reflection ): reflection is DeclarationReflection => reflection instanceof DeclarationReflection && reflection.kindOf( ReflectionKind.Module );
const getReflectionSources = ( reflection: Reflection ) => {
	const selfSources = reflection.sources
		?.map( s => s?.file?.fullFileName ?? s?.fileName )
		.filter( isString )
		.map( p => resolve( p ) ) ?? [];
	// Try to find the module.
	if( isModule( reflection ) ) {
		const pkgSources = uniq( selfSources.map( s => pkgUpSync( { cwd: dirname( s ) } ) ).filter( isString ) );
		return [
			...pkgSources,
			...selfSources,
		];
	} else {
		return selfSources;
	}
};

/**
 * Don't worry about typings, it's just a string with special prefixes.
 */
export type NamedPath = LiteralUnion<NamedPath.Project | NamedPath.Module, string>
export namespace NamedPath {
	export type Project = `~~/${string}`;
	export type Module = `~${string}/${string}`
}
export class PathReflectionResolver {
	public constructor( protected readonly plugin: ABasePlugin ){}

	/**
	 * Resolve the path from the {@link reflection} sources. A single match is expected.
	 *
	 * @param reflection - The reflection to resolve from.
	 * @param path - The path to resolve.
	 * @param canLookupModule - Set to `true` to try resolving the path from the {@link reflection}'s module if direct resolution failed.
	 * @returns the resolved path.
	 */
	public resolveFromReflection( reflection: Reflection, path: string, canLookupModule: boolean ): string | undefined {
		const resolved = this.resolveAllFromReflection( reflection, path, canLookupModule );
		const sourcesLog = `Reflection sources: ${JSON.stringify( reflection.sources?.map( s => s.fileName ) ?? [] )}`;
		if( resolved.length === 0 ){
			this.plugin.logger.error( `Could not resolve "${path}" from reflection "${reflection.name}". ${sourcesLog}` );
		} else if( resolved.length > 1 ){
			this.plugin.logger.warn( `Multiple files exists for resolution of "${path}" from reflection "${reflection.name}". Picking the first. ${sourcesLog}` );
		}
		return resolved[0];
	}

	/**
	 * Resolve the path from the {@link reflection} sources. Filter only existing files.
	 *
	 * @param reflection - The reflection to resolve from.
	 * @param path - The path to resolve.
	 * @param canLookupModule - Set to `true` to try resolving the path from the {@link reflection}'s module if direct resolution failed.
	 * @returns the resolved path.
	 */
	public resolveAllFromReflection( reflection: Reflection, path: string, canLookupModule: boolean ): string[]{
		return this._getAllPossibleResolutionPaths( reflection, path, canLookupModule ).filter( existsSync );
	}

	/**
	 * Get a list of workspaces from the given {@link project}.
	 *
	 * @param project - The project reflection.
	 * @returns the workspaces.
	 */
	public getWorkspaces( project: ProjectReflection ): [ProjectReflection, ...DeclarationReflection[]] {
		const modules = project.getReflectionsByKind( ReflectionKind.Module );
		assert( modules.every( ( m ): m is DeclarationReflection => m instanceof DeclarationReflection ) );
		return [
			project,
			...modules,
		];
	}

	/**
	 * Resolve the given {@link path}, converting `~~` as the project path, & `~*` as modules path.
	 *
	 * @param project - The project reflection.
	 * @param path - The page targetted.
	 * @param extra - An object containing:
	 * - the default container folder for named paths
	 * - the current reflection for relative paths.
	 * @returns the resolved file.
	 */
	public resolveNamedPath(
		project: ProjectReflection,
		path: NamedPath,
		{ containerFolder, currentReflection }: {containerFolder?: string; currentReflection?: Reflection} = {},
	){
		const pathSv = path;
		const pathsToTry = [];
		let canLookupModule = false;
		if( path.startsWith( '~~/' ) ){
			path = path.replace( /^~~\//, '' );
			currentReflection = project;
		} else if( path.match( /^~.+\// ) ){
			const workspace = this.getWorkspaces( project ).slice( 1 ).find( w => path.startsWith( `~${w.name}/` ) );
			if( !workspace ){
				throw new Error( `Could not get a module corresponding to the path ${path.slice( 1 )}` );
			}
			path = path.slice( workspace.name.length + 2 );
			currentReflection = workspace;
		} else {
			canLookupModule = !path.startsWith( '.' );
		}
		if( containerFolder && !path.startsWith( '.' ) ){
			pathsToTry.push( join( containerFolder, path ) );
		}
		pathsToTry.push( path );
		const reflection = currentReflection ?? project;
		const pathsList = uniq( pathsToTry );
		const candidates: string[] = [];
		for( const p of pathsList ){
			const ret = this.resolveAllFromReflection( reflection, p, canLookupModule );
			if( ret.length > 0 ) {
				return ret[0];
			}
			candidates.push( ...this._getAllPossibleResolutionPaths( reflection, p, canLookupModule ) );
		}
		this.plugin.logger.error( `Could not resolve "${pathSv}" from reflection "${reflection.name}".${canLookupModule ? ' Tried to resolve via module root.' : ''}
Tried paths: ${JSON.stringify( uniq( candidates ).map( p => isAbsolute( p ) ? this.plugin.relativeToRoot( p ) : p ) )}.` );
		return undefined;
	}

	/**
	 * Look up the reflection & its parents to find the 1st parent matching the given {@link filter}.
	 *
	 * @param reflection - The reflection to get the parent for.
	 * @param filter - The check function. Returns `true` to select the reflection.
	 * @returns the module matching the filter, or `undefined`.
	 */
	public getParentMatching<T extends Reflection>( reflection: Reflection, filter: ( reflection: Reflection ) => reflection is T ): T | undefined
	public getParentMatching( reflection: Reflection, filter: ( reflection: Reflection ) => boolean ): Reflection | undefined
	public getParentMatching( reflection: Reflection, filter: ( reflection: Reflection ) => boolean ): Reflection | undefined {
		let reflectionCursor = reflection as Reflection | undefined;
		while( reflectionCursor ){
			if( filter( reflectionCursor ) ){
				return reflectionCursor;
			}
			reflectionCursor = reflectionCursor.parent;
		}
		return reflectionCursor;
	}

	/**
	 * Find the 1st module reflection in the {@link reflection}'s parents. The reflection itself is checked.
	 *
	 * @param reflection - The reflection to get the module for.
	 * @returns the module reflection, or the project if no module is found.
	 */
	public getReflectionModule( reflection: Reflection ){
		return this.getParentMatching( reflection, isModule ) ?? reflection.project;
	}


	/**
	 * Get a list of paths to check for the resolution.
	 *
	 * @param reflection - The reflection to resolve from.
	 * @param path - The path to resolve.
	 * @param canLookupModule - Set to `true` to try resolving the path from the {@link reflection}'s module if direct resolution failed.
	 * @returns all paths to check.
	 */
	private _getAllPossibleResolutionPaths( reflection: Reflection, path: string, canLookupModule: boolean ): string[]{
		if( isAbsolute( path ) ){
			return [ path ];
		}
		const candidateSources = getReflectionSources( reflection );
		if( canLookupModule ){
			const module = this.getReflectionModule( reflection );
			if( !( module instanceof ProjectReflection ) ){
				candidateSources.push( ...getReflectionSources( module ) );
			}
		}
		return uniq( candidateSources.map( s => resolve( dirname( s ), path ) ) );
	}
}
