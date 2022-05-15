import { isNumber } from 'lodash';
import { ProjectReflection, Reflection } from 'typedoc';

import textUtils from './text';

namespace reflectionSourceUtils {
	export const getReflectionSourceFileName = ( reflection?: Reflection ) => {
		if( !reflection ){
			return;
		}
		return reflection.sources?.[0].fileName;
	};
	export const getPageSourceCoordinates = ( reflection: Reflection | undefined, position: number ): {line: number; column: number; file: string} | undefined => {
		if( !reflection ){
			return;
		}
		const sourceRef = reflection.sources?.[0];
		if( sourceRef && reflection.comment ){
			const coordinates = textUtils.getCoordinates(
				reflection instanceof ProjectReflection && reflection.readme ?
					reflection.readme :
					reflection.comment.text,
				position );
			return {
				...coordinates,
				line: sourceRef.line + coordinates.line - 1,
				file: sourceRef.fileName,
			};
		}
		return undefined;
	};

	export const getSourceLocationBestClue = ( reflection?: Reflection, position?: number ) => {
		const pageSourceCoordinates = isNumber( position ) ? getPageSourceCoordinates( reflection, position ) : undefined;
		if( pageSourceCoordinates ){
			return `${pageSourceCoordinates.file}:${pageSourceCoordinates.line}:${pageSourceCoordinates.column}`;
		} else {
			return getReflectionSourceFileName( reflection ) ?? 'UNKNOWN SOURCE';
		}
	};
}
export default reflectionSourceUtils;
