/* eslint-disable @typescript-eslint/no-var-requires */
import assert from 'assert';
import { relative, resolve } from 'path';

import { escapeRegExp } from 'lodash';

import { Application, DeclarationReflection, MarkdownEvent, ReflectionKind, SourceFile } from 'typedoc';

jest.mock( './base-plugin' );
const { ABasePlugin } = require( './base-plugin' ) as jest.Mocked<typeof import( './base-plugin' )>;

import { CurrentPageMemo } from './current-page-memo';
import { MarkdownReplacer } from './markdown-replacer';

class TestPlugin extends ABasePlugin {
	public override application: jest.MockedObjectDeep<Application>;
	public constructor(){
		super( {} as any, __filename );
		this.application = {
			renderer: {
				on: jest.fn(),
			},
			converter: {
				on: jest.fn(),
			},
		} as any;
		const pseudoLogger = {
			makeChildLogger: jest.fn().mockImplementation( () => pseudoLogger ),
			error: jest.fn().mockImplementation( assert.fail ),
			warn: jest.fn().mockImplementation( assert.fail ),
		} as any;
		( this as any ).logger = pseudoLogger;
	}
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public initialize(): void {}
	public relativeToRoot( path: string ){
		return relative( process.cwd(), path );
	}
}
const mockCurrentPage = ( name: string, source: string, line: number, character: number ) => {
	const ref = new DeclarationReflection( name, ReflectionKind.Class );
	ref.sources = [
		{ fileName: source, file: new SourceFile( source ), character, line },
	];
	Object.defineProperty( CurrentPageMemo.prototype, 'currentReflection', { writable: true, value: ref } );
	Object.defineProperty( CurrentPageMemo.prototype, 'hasCurrent', { writable: true, value: true } );
};
afterEach( () => {
	Object.defineProperty( CurrentPageMemo.prototype, 'currentReflection', { writable: true, value: undefined } );
	Object.defineProperty( CurrentPageMemo.prototype, 'hasCurrent', { writable: true, value: false } );
} );
const getParseMarkdownEventListeners = ( plugin: TestPlugin ) => plugin.application.renderer.on.mock.calls
	.filter( c => c[0] === MarkdownEvent.PARSE )
	.map( c => c[1] );
describe( MarkdownReplacer.name, () => {
	describe( 'Once', () => {
		let plugin: TestPlugin;
		let replacer: MarkdownReplacer;
		beforeEach( () => {
			plugin = new TestPlugin();
			replacer = new MarkdownReplacer( plugin );
		} );
		describe( 'Source map', () => {
			it.each( [
				[ 'hello ## world', [ 'hello.ts:1:7' ]],
				[ 'hello \n## world', [ 'hello.ts:2:1' ]],
				[ '\nhello ## world', [ 'hello.ts:2:7' ]],
				[ 'hello ## world##\nHow are you doing ?\n##', [ 'hello.ts:1:7', 'hello.ts:1:15', 'hello.ts:3:1' ]],
			] )( 'should match %j with sourcemaps %j', ( source, expectedMaps ) => {
				mockCurrentPage( 'Test', resolve( 'hello.ts' ), 1, 1 );
				const fn = jest.fn().mockReturnValue( '#' );
				replacer.bindReplace( /##/g, fn, 'Replacer' );
				const evt = new MarkdownEvent( MarkdownEvent.PARSE, source, source );
				const listeners = getParseMarkdownEventListeners( plugin );
				expect( listeners ).toHaveLength( 1 );
				listeners[0]( evt );
				expect( fn ).toHaveBeenCalledTimes( expectedMaps.length );
				expectedMaps.forEach( ( m, i ) => {
					expect( fn.mock.calls[i][1]() ).toContain( `${m} ` );
					expect( fn.mock.calls[i][1]() ).toContain( 'Replacer)' );
				} );
			} );
		} );
	} );
	describe( 'Multi', () => {
		let plugin: TestPlugin;
		let replacer: MarkdownReplacer;
		beforeEach( () => {
			plugin = new TestPlugin();
			replacer = new MarkdownReplacer( plugin );
		} );
		describe( 'Source map', () => {
			it.each( [
				[ 'hello ## world', 'Simple', [
					{ match: /##/g, label: '##',       maps: [ { map: 'hello.ts:1:7', ctxs: [ '##' ] } ], replacer: jest.fn().mockReturnValueOnce( '@' ) },
				]],
				[ 'hello ## world', 'Overlapping same size', [
					{ match: /##/g, label: '##',       maps: [ { map: 'hello.ts:1:7', ctxs: [ '##' ] } ], replacer: jest.fn().mockReturnValueOnce( '{}' ) },
					{ match: /\{\}/g, label: '{}',     maps: [ { map: 'hello.ts:1:7', ctxs: [ '##', '{}' ] } ], replacer: jest.fn().mockReturnValueOnce( '=' ) },
				]],
				[ 'hello ## world', 'Overlapping diff size', [
					{ match: /##/g, label: '##',       maps: [ { map: 'hello.ts:1:7', ctxs: [ '##' ] } ], replacer: jest.fn().mockReturnValueOnce( '@@@{}' ) },
					{ match: /\{\}/g, label: '{}',     maps: [ { map: 'hello.ts:1:7', ctxs: [ '##', '{}' ] } ], replacer: jest.fn().mockReturnValueOnce( '=' ) },
				]],
				[ 'hello ## world {}', '1=>2 + 2', [
					{ match: /##/g, label: '##',       maps: [ { map: 'hello.ts:1:7', ctxs: [ '##' ] } ], replacer: jest.fn().mockReturnValueOnce( '{}' ) },
					{ match: /\{\}/g, label: '{}',     maps: [
						{ map: 'hello.ts:1:7', ctxs: [ '##', '{}' ] },
						{ map: 'hello.ts:1:16', ctxs: [ '{}' ] },
					], replacer: jest.fn().mockReturnValueOnce( '=' ) },
				]],
				[ 'hello \n{}\n## world ', '2 + 1=>2', [
					{ match: /##/g, label: '##',       maps: [ { map: 'hello.ts:3:1', ctxs: [ '##' ] } ], replacer: jest.fn().mockReturnValueOnce( '{}' ) },
					{ match: /\{\}/g, label: '{}',     maps: [
						{ map: 'hello.ts:2:1', ctxs: [ '{}' ] },
						{ map: 'hello.ts:3:1', ctxs: [ '##', '{}' ] },
					], replacer: jest.fn().mockReturnValueOnce( '=' ) },
				]],
				[ 'hello\n## world\n@@@{==}', '1=>2 + 2', [
					{ match: /##/g, label: '##',       maps: [ { map: 'hello.ts:2:1', ctxs: [ '##' ] } ], replacer: jest.fn().mockReturnValue( '@@@{==}' ) },
					{ match: /\{==\}/g, label: '{==}', maps: [
						{ map: 'hello.ts:2:1', ctxs: [ '##', '{==}' ] },
						{ map: 'hello.ts:3:4', ctxs: [ '{==}' ] },
					], replacer: jest.fn().mockReturnValue( '=' ) },
				]],
				[ 'hello\n## world\n{==}\n##', '1=>2 + 2 + 1=>2', [
					{ match: /##/g, label: '##',       maps: [
						{ map: 'hello.ts:2:1', ctxs: [ '##' ] },
						{ map: 'hello.ts:4:1', ctxs: [ '##' ] },
					], replacer: jest.fn().mockReturnValue( '@@@{==}' ) },
					{ match: /\{==\}/g, label: '{==}', maps: [
						{ map: 'hello.ts:2:1', ctxs: [ '##', '{==}' ] },
						{ map: 'hello.ts:3:1', ctxs: [ '{==}' ] },
						{ map: 'hello.ts:4:1', ctxs: [ '##', '{==}' ] },
					], replacer: jest.fn().mockReturnValue( '=' ) },
				]],
			] )( 'should match %j with sourcemaps %# (%s)', ( source, _label, binds ) => {
				mockCurrentPage( 'Test', resolve( 'hello.ts' ), 1, 1 );
				binds.forEach( b => replacer.bindReplace( b.match, b.replacer, b.label ) );
				const evt = new MarkdownEvent( MarkdownEvent.PARSE, source, source );
				const listeners = getParseMarkdownEventListeners( plugin );
				expect( listeners ).toHaveLength( binds.length );
				binds.forEach( ( _b, i ) => listeners[i]( evt ) );
				binds.forEach( b => {
					expect( b.replacer, `Replacer ${b.label}` ).toHaveBeenCalledTimes( b.maps.length );
					b.maps.forEach( ( m, j ) => {
						const mapStr = b.replacer.mock.calls[j][1]();
						expect( mapStr, `Replacer ${b.label}, call ${j}` )
							.toMatch( new RegExp( `^${escapeRegExp( m.map )} \\(.*? of ${m.ctxs.map( escapeRegExp ).join( ' . ' )}\\)` ) );
					} );
				} );
			} );
		} );
	} );
} );
