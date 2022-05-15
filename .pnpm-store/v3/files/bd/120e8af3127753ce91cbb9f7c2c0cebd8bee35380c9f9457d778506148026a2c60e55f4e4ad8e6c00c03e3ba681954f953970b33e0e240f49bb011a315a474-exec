import { expectTypeOf  } from 'expect-type';
import { LogLevel, ParameterType } from 'typedoc';

import { ExtractMapValues } from '.';

import { DecOptType, _FlagsDec, _MapDec, _StringDec } from './utils';

describe( 'Typings', () => {
	const maybe = true as boolean;
	it( 'should infer correct types', () => {
		if( maybe ) return;
		expectTypeOf<DecOptType<_StringDec>>().toEqualTypeOf<string>();
		expectTypeOf<DecOptType<_MapDec<'foo' | 'bar'>>>().toEqualTypeOf<'foo' | 'bar'>();
		expectTypeOf<DecOptType<_FlagsDec<Record<'baz' | 'qux', boolean>>>>().toEqualTypeOf<Record<'baz' | 'qux', boolean>>();

		expectTypeOf<DecOptType<{type: ParameterType.String}>>().toEqualTypeOf<string>();
		expectTypeOf<DecOptType<{type: ParameterType.Map; map: {[k: string]: 'foo' | 'qux'}; defaultValue: 'foo'}>>().toEqualTypeOf<'foo' | 'qux'>();
		expectTypeOf<DecOptType<{type: ParameterType.Flags; defaults: {baz: false; hello: true}}>>().toEqualTypeOf<Record<'baz' | 'hello', boolean>>();
		expectTypeOf<DecOptType<{type: ParameterType.Map; map: typeof LogLevel; defaultValue: LogLevel.Error}>>().toEqualTypeOf<LogLevel>();

		expectTypeOf<ExtractMapValues<typeof LogLevel>>().toEqualTypeOf<LogLevel>();
	} );
} );
