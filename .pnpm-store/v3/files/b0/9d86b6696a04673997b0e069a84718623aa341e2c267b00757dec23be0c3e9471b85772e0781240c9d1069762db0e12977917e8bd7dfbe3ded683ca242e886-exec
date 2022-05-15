import { JSX } from 'typedoc';
import { ABasePlugin } from './base-plugin';
export declare class MarkdownReplacer {
    protected readonly plugin: ABasePlugin;
    private static readonly _addSourceToProject;
    private static readonly _mapContainers;
    private readonly _logger;
    private readonly _currentPageMemo;
    /**
     * Get the list of source map containers for the given event.
     *
     * @param event - The event to get source maps for.
     * @returns the source map list.
     */
    private static _getEventMapContainers;
    constructor(plugin: ABasePlugin);
    /**
     * Bind {@link MarkdownEvent} to replace every occurences of the {@link regex} with the {@link callback} result.
     *
     * @param regex - The regex to match.
     * @param callback - The callback to execute with fullMatch, captures, & a source hint.
     * @param label - The replacer name.
     */
    bindReplace(regex: RegExp, callback: MarkdownReplacer.ReplaceCallback, label?: string): void;
    /**
     * Bind {@link MarkdownEvent} to replace every occurences of the jsdoc tags whose body is matched by the {@link bodyRegex}. The tag is replaced with the {@link callback} result.
     * Note that tags must have the following syntax: `{@tagname some params here}`. The {@link bodyRegex} should __only__ match `tagname some params here`
     *
     * @param bodyRegex - The tag body regex.
     * @param callback - The callback to execute with fullMatch, captures, & a source hint.
     * @param label - The replacer name.
     */
    bindTag(bodyRegex: RegExp, callback: MarkdownReplacer.ReplaceCallback, label?: string): void;
    /**
     * Match every strings for {@link regex} & replace them with the return value of the {@link callback}. This method mutates the {@link event}.
     *
     * @param regex - The regex to match.
     * @param callback - The callback to execute with fullMatch, captures, & a source hint.
     * @param label - The replacer name.
     * @param event - The event to modify.
     */
    private _processMarkdown;
    /**
     * Create a new source map container for the given {@link regex} & {@link label}, that will chain with {@link getMapSource} to get location in the actual original source.
     *
     * @param regex - The regex used for replacement.
     * @param label - The replacement label.
     * @param getMapSource - The method to get the position before previous replacement.
     * @returns a new map container.
     */
    private _generateSourceMapContainer;
}
export declare namespace MarkdownReplacer {
    type ReplaceMatch = {
        fullMatch: string;
        captures: Array<string | null>;
    };
    type SourceHint = () => string;
    type ReplaceCallback = (match: ReplaceMatch, sourceHint: SourceHint) => string | JSX.Element | undefined;
}
//# sourceMappingURL=markdown-replacer.d.ts.map