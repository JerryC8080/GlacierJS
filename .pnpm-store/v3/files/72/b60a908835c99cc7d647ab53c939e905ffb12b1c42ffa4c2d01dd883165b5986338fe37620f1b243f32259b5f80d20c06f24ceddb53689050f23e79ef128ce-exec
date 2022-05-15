import assert from 'assert';
import { readFileSync, readdirSync } from 'fs';
import { dirname, resolve } from 'path';

import { sync as pkgUpSync } from 'pkg-up';
import { Application, DeclarationReflection, DefaultTheme, JSX, PageEvent, ProjectReflection, ReflectionKind, RendererEvent, SourceFile, UrlMapping } from 'typedoc';

import { ABasePlugin } from '@knodes/typedoc-pluginutils';

const getModuleReflectionSource = ( reflection: DeclarationReflection ) => {
	for( const source of reflection.sources ?? [] ) {
		if( source.file ){
			return source.file?.fullFileName;
		}
	}
	return undefined;
};

export class MonorepoReadmePlugin extends ABasePlugin {
	public constructor( application: Application ){
		super( application, __filename );
	}

	/**
	 * This method is called after the plugin has been instanciated.
	 *
	 * @see {@link import('@knodes/typedoc-pluginutils').autoload}.
	 */
	public initialize(): void {
		this.application.renderer.on( RendererEvent.BEGIN, ( event: RendererEvent ) => {
			assert( this.application.renderer.theme );
			assert( this.application.renderer.theme instanceof DefaultTheme );
			const theme = this.application.renderer.theme;
			assert( event.urls );
			const modulesUrls = event.urls.filter( ( u ): u is UrlMapping<DeclarationReflection> => u.model instanceof DeclarationReflection && u.model.kindOf( ReflectionKind.Module ) );
			modulesUrls.forEach( u => this._modifyModuleIndexPage( theme, u ) );
		}, null, -1000 ); // priority is set to be ran before @knodes/typedoc-plugin-pages
	}

	/**
	 * Modify the template of the module to prepend the README.
	 *
	 * @param theme - The theme used.
	 * @param moduleMapping - The module URL mapping to modify
	 */
	private _modifyModuleIndexPage( theme: DefaultTheme, moduleMapping: UrlMapping<DeclarationReflection> ){
		const readme = this._findReadmeFile( moduleMapping );
		if( !readme ){
			return;
		}
		const { absolute: absReadme, relative: relReadme } = readme;
		const source = { character: 1, line: 1, fileName: relReadme, file: new SourceFile( absReadme ) };
		moduleMapping.model.sources = [
			...( moduleMapping.model.sources ?? [] ),
			source,
		];
		this.logger.info( `Setting readme of ${moduleMapping.model.name} as ${this.relativeToRoot( absReadme )}` );
		const baseTemplate = moduleMapping.template;
		moduleMapping.template = props => {
			const fakeProject = new ProjectReflection( props.name );
			fakeProject.readme = readFileSync( absReadme, 'utf-8' );
			fakeProject.sources = [
				source,
			];
			const fakePageEvent = new PageEvent<ProjectReflection>( props.name );
			fakePageEvent.filename = props.filename;
			fakePageEvent.project = props.project;
			fakePageEvent.url = props.url;
			fakePageEvent.model = fakeProject;
			const readmeTpl = theme.indexTemplate( fakePageEvent );
			const base = baseTemplate( props );
			return JSX.createElement( JSX.Fragment, null, ...[
				readmeTpl,
				JSX.createElement( 'hr', null ),
				base,
			] );
		};
	}

	/**
	 * Try to resoluve the README file in the directory of the module's `package.json`.
	 *
	 * @param moduleMapping - The module URL mapping.
	 * @returns the relative & absolute path of the readme.
	 */
	private _findReadmeFile( moduleMapping: UrlMapping<DeclarationReflection> ){
		const src = getModuleReflectionSource( moduleMapping.model );
		if( !src ){
			return;
		}
		const pkgFile = pkgUpSync( { cwd: dirname( src ) } );
		if( !pkgFile ){
			return;
		}
		const pkgDir = dirname( pkgFile );
		const readmeFile = readdirSync( pkgDir ).find( f => f.toLowerCase() === 'readme.md' );
		if( !readmeFile ){
			return;
		}
		const absReadmeFile = resolve( pkgDir, readmeFile );
		return {
			relative: readmeFile,
			absolute: absReadmeFile,
		};
	}
}
