/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-var-requires */
import assert from 'assert';
import { writeFileSync } from 'fs';

import { expectTypeOf  } from 'expect-type';
import { fileSync } from 'tmp';
import { Application, LogLevel, ParameterType } from 'typedoc';

jest.mock( '../base-plugin' );
const { ABasePlugin } = require( '../base-plugin' ) as jest.Mocked<typeof import( '../base-plugin' )>;

import type { PluginLogger } from '../plugin-logger';
import { OptionGroup } from './option-group';
import { TypeErr, _DecOpt } from './utils';

describe( 'Typings', () => {
	const maybe = true as boolean;
	const any = {} as any;
	it( 'should have correct builder types', () => {
		if( maybe ) return;
		interface ITest {
			foo: string;
			bar?: any;
		}
		OptionGroup.factory<ITest>( any );
		// Simple param
		expectTypeOf( OptionGroup.factory<{foo: number}>( any )
			.add ).parameters.toEqualTypeOf<['foo', _DecOpt, ( v: unknown ) => number]>();
		const grp1 = OptionGroup.factory<{foo: number}>( any )
			.add( 'foo', { type: ParameterType.Number, help: 'Test' } )
			.build();
		expectTypeOf( grp1 )
			.toEqualTypeOf<OptionGroup<{foo: number}, {foo: {name: 'foo'; type: ParameterType.Number; help: string}}>>();
		expectTypeOf( grp1.getValue() ).toEqualTypeOf<{foo: number}>();
		expectTypeOf( grp1.setValue ).parameters.toEqualTypeOf<[{foo?: number} | string] | ['foo', number]>();

		expectTypeOf( OptionGroup.factory<{foo: number}>( any )
			.build )
			.toEqualTypeOf<TypeErr<['Missing declarations for keys', 'foo']>>();


		// Multi params
		const grp2 = OptionGroup.factory<{foo: number; bar?: string}>( any )
			.add( 'foo', { type: ParameterType.Number, help: 'Test' } )
			.add( 'bar', { type: ParameterType.String, help: 'Test' } )
			.build();
		expectTypeOf( grp2 )
			.toEqualTypeOf<OptionGroup<{foo: number; bar?: string}, {
				foo: {name: 'foo'; type: ParameterType.Number; help: string};
				bar: {name: 'bar'; type: ParameterType.String; help: string};
			}>>();
		expectTypeOf( grp2.getValue() ).toEqualTypeOf<{foo: number; bar?: string}>();
		expectTypeOf( grp2.setValue ).parameters.toEqualTypeOf<[{foo?: number; bar?: string} | string] | ['foo' | 'bar', string | number]>(); // Should include `undefined` though

		expectTypeOf( OptionGroup.factory<{foo: number; bar?: string}>( any )
			.build )
			.toEqualTypeOf<TypeErr<['Missing declarations for keys', 'foo' | 'bar']>>();
		expectTypeOf( OptionGroup.factory<{foo: number; bar?: string}>( any )
			.add( 'foo', { type: ParameterType.Number, help: 'Test' } )
			.build )
			.toEqualTypeOf<TypeErr<['Missing declarations for keys', 'bar']>>();
		OptionGroup.factory<{foo: number; bar?: string}>( any )
			// @ts-expect-error
			.add( 'bar', { type: ParameterType.Number, help: 'Test' } );
		OptionGroup.factory<{foo: number; bar?: string}>( any )
			.add( 'bar', { type: ParameterType.Number, help: 'Test' }, ( v: number ) => `${v}` as string | undefined );
		OptionGroup.factory<{foo: number; bar?: string}>( any )
			.add( 'bar', { type: ParameterType.Number, help: 'Test' }, ( v: number ) => `${v}` as string );
		expectTypeOf( OptionGroup.factory<{foo: number; bar?: string}>( any )
			.add( 'bar', { type: ParameterType.Number, help: 'Test' }, v => `${v}` )
			.build )
			.toEqualTypeOf<TypeErr<['Missing declarations for keys', 'foo']>>();
		expectTypeOf( OptionGroup.factory<{foo: number; bar?: string}>( any )
			.add ).parameters.toEqualTypeOf<['foo' | 'bar', _DecOpt, ( v: unknown ) => string | number | undefined]>();

		const grp3 = OptionGroup.factory<{qux: string; bar: string}>( any )
			.add( 'qux', { type: ParameterType.Number, help: 'Test' }, ( v => `${v}` as string ) )
			.add( 'bar', { type: ParameterType.String, help: 'Test' } )
			.build();
		expectTypeOf( grp3.getValue() ).toEqualTypeOf<{qux: string; bar: string}>();
		expectTypeOf( grp3.setValue ).parameters.toEqualTypeOf<[{qux?: number; bar?: string} | string] | ['qux' | 'bar', string | number]>();
		OptionGroup.factory<{qux: string; bar: string}>( any )
			// @ts-expect-error
			.add( 'qux', { type: ParameterType.Number, help: 'Test' }, ( ( v: number ) => `${v}` as string | undefined ) );
		OptionGroup.factory<{qux: string; bar: string}>( any )
			.add( 'qux', { type: ParameterType.Number, help: 'Test' }, ( ( v: number ) => `${v}` as string ) );

		OptionGroup.factory<{foo: LogLevel}>( any )
			.add( 'foo', { type: ParameterType.Map, help: 'Test', map: LogLevel, defaultValue: LogLevel.Error } );
	} );
} );
describe( 'Behavior', () => {
	class TestPlugin extends ABasePlugin {
		public readonly optionsPrefix = 'TEST';
		public readonly package = {
			name: 'typedoc-TEST',
		} as any;
		public readonly logger: PluginLogger = {
			error: assert.fail,
			verbose: jest.fn(),
		} as any;
		public constructor( public readonly application: Application ){
			super( application, __filename );
		}
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		public initialize(): void {}
	}
	let app: Application;
	let plugin: TestPlugin;
	beforeEach( () => {
		app = new Application();
		plugin = new TestPlugin( app );
	} );
	it( 'should have options subset', () => {
		const opts = OptionGroup.factory<{foo: number; bar?: string}>( plugin )
			.add( 'bar', { type: ParameterType.String, help: '' } )
			.add( 'foo', { type: ParameterType.Number, help: '' } )
			.build();
		app.options.freeze();
		expect( app.options.getRawValues() ).toMatchObject( { 'TEST:foo': 0, 'TEST:bar': '', 'TEST': { foo: 0, bar: '' }} );
		expect( opts.getValue() ).toMatchObject( { foo: 0, bar: '' } );
	} );
	it( 'should set options (combined)', () => {
		const opts = OptionGroup.factory<{foo: number; bar?: string}>( plugin )
			.add( 'bar', { type: ParameterType.String, help: '' } )
			.add( 'foo', { type: ParameterType.Number, help: '' } )
			.build();
		opts.setValue( { bar: 'Hello', foo: 42 } );
		app.options.freeze();
		expect( app.options.getRawValues() ).toMatchObject( { 'TEST:foo': 42, 'TEST:bar': 'Hello', 'TEST': { foo: 42, bar: 'Hello' }} );
		expect( opts.getValue() ).toMatchObject( { foo: 42, bar: 'Hello' } );
	} );
	it( 'should set options (partial)', () => {
		const opts = OptionGroup.factory<{foo: number; bar?: string}>( plugin )
			.add( 'bar', { type: ParameterType.String, help: '' } )
			.add( 'foo', { type: ParameterType.Number, help: '' } )
			.build();
		opts.setValue( { bar: 'Hello' } );
		app.options.freeze();
		expect( app.options.getRawValues() ).toMatchObject( { 'TEST:foo': 0, 'TEST:bar': 'Hello', 'TEST': { foo: 0, bar: 'Hello' }} );
		expect( opts.getValue() ).toMatchObject( { foo: 0, bar: 'Hello' } );
	} );
	it( 'should set options (JSON)', () => {
		const opts = OptionGroup.factory<{foo: number; bar?: string}>( plugin )
			.add( 'bar', { type: ParameterType.String, help: '' } )
			.add( 'foo', { type: ParameterType.Number, help: '' } )
			.build();
		opts.setValue( JSON.stringify( { bar: 'World' } ) );
		app.options.freeze();
		expect( app.options.getRawValues() ).toMatchObject( { 'TEST:foo': 0, 'TEST:bar': 'World', 'TEST': { foo: 0, bar: 'World' }} );
		expect( opts.getValue() ).toMatchObject( { foo: 0, bar: 'World' } );
	} );
	it( 'should set options (filename, JSON)', () => {
		const tmp = fileSync( { postfix: '.json' } );
		writeFileSync( tmp.name, JSON.stringify( { bar: 'Doh' } ) );
		const opts = OptionGroup.factory<{foo: number; bar?: string}>( plugin )
			.add( 'bar', { type: ParameterType.String, help: '' } )
			.add( 'foo', { type: ParameterType.Number, help: '' } )
			.build();
		opts.setValue( tmp.name );
		app.options.freeze();
		expect( app.options.getRawValues() ).toMatchObject( { 'TEST:foo': 0, 'TEST:bar': 'Doh', 'TEST': { foo: 0, bar: 'Doh' }} );
		expect( opts.getValue() ).toMatchObject( { foo: 0, bar: 'Doh' } );
	} );
	it( 'should set options (filename, JS)', () => {
		const tmp = fileSync( { postfix: '.js' } );
		writeFileSync( tmp.name, 'module.exports = { bar: \'DohJS\' }' );
		const opts = OptionGroup.factory<{foo: number; bar?: string}>( plugin )
			.add( 'bar', { type: ParameterType.String, help: '' } )
			.add( 'foo', { type: ParameterType.Number, help: '' } )
			.build();
		opts.setValue( tmp.name );
		app.options.freeze();
		expect( app.options.getRawValues() ).toMatchObject( { 'TEST:foo': 0, 'TEST:bar': 'DohJS', 'TEST': { foo: 0, bar: 'DohJS' }} );
		expect( opts.getValue() ).toMatchObject( { foo: 0, bar: 'DohJS' } );
	} );
} );
