import { expectTypeOf } from 'expect-type';
import { ArrayDeclarationOption as ArrDec, NumberDeclarationOption as NumDec, ParameterType as PType, ParameterType, StringDeclarationOption as StrDec } from 'typedoc';

import { InferDeclarationType, Option } from './option';

describe( 'Typings', () => {
	const maybe = true as boolean;
	it( 'should infer declaration', () => {
		if( maybe ) return;
		expectTypeOf<InferDeclarationType<number>>().toEqualTypeOf<NumDec>();
		expectTypeOf<InferDeclarationType<string>>().toEqualTypeOf<StrDec & {type: PType.String | PType.Path}>();
		expectTypeOf<InferDeclarationType<string[]>>().toEqualTypeOf<ArrDec>();
	} );
	it( 'should have correct options values', () => {
		if( maybe ) return;
		const opt1 = Option.factory<number>( {} as any )( {
			name: 'Hello',
			type: ParameterType.Number,
			help: 'Test',
		} );
		expectTypeOf( opt1.getValue() ).toEqualTypeOf<number>();
		expectTypeOf( opt1.setValue ).parameter( 0 ).toEqualTypeOf<number>();
		expectTypeOf( opt1.getValue() ).not.toEqualTypeOf<string>();
		expectTypeOf( opt1.setValue ).parameter( 0 ).not.toEqualTypeOf<string>();

		const opt2 = Option.factory<number>( {} as any )( {
			name: 'Hello',
			type: ParameterType.String,
			help: 'Test',
		}, v => parseInt( v, 10 ) );
		expectTypeOf( opt2.getValue() ).toEqualTypeOf<number>();
		expectTypeOf( opt2.setValue ).parameter( 0 ).toEqualTypeOf<string>();
		expectTypeOf( opt2.getValue() ).not.toEqualTypeOf<string>();
		expectTypeOf( opt2.setValue ).parameter( 0 ).not.toEqualTypeOf<number>();
	} );
} );
