namespace textUtils {
	export const getCoordinates = ( content: string, position: number ): {line: number; column: number} => {
		const beforeContent = content.slice( 0, position );
		const lines = beforeContent.split( '\n' );
		return { line: lines.length, column: lines[lines.length - 1].length + 1 };
	};
}
export default textUtils;
