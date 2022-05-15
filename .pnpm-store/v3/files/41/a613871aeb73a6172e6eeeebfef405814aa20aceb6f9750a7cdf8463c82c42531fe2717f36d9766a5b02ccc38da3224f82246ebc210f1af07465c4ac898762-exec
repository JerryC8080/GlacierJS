"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownReplacer = void 0;
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const typedoc_1 = require("typedoc");
const current_page_memo_1 = require("./current-page-memo");
const utils_1 = require("./utils");
const spitArgs = (...args) => {
    const indexIdx = args.findIndex(lodash_1.isNumber);
    if ((0, lodash_1.isNil)(indexIdx)) {
        throw new Error();
    }
    return {
        fullMatch: args[0],
        captures: args.slice(1, indexIdx),
        index: args[indexIdx],
        source: args[indexIdx + 1],
    };
};
class MarkdownReplacer {
    constructor(plugin) {
        this.plugin = plugin;
        this._logger = this.plugin.logger.makeChildLogger('MarkdownReplacer');
        this._currentPageMemo = current_page_memo_1.CurrentPageMemo.for(this.plugin);
        this.plugin.application.converter.on(typedoc_1.Converter.EVENT_RESOLVE_BEGIN, MarkdownReplacer._addSourceToProject.bind(this));
    }
    /**
     * Get the list of source map containers for the given event.
     *
     * @param event - The event to get source maps for.
     * @returns the source map list.
     */
    static _getEventMapContainers(event) {
        var _a;
        return (_a = this._mapContainers.get(event)) !== null && _a !== void 0 ? _a : [];
    }
    /**
     * Bind {@link MarkdownEvent} to replace every occurences of the {@link regex} with the {@link callback} result.
     *
     * @param regex - The regex to match.
     * @param callback - The callback to execute with fullMatch, captures, & a source hint.
     * @param label - The replacer name.
     */
    bindReplace(regex, callback, label = `${this.plugin.name}: Unnamed markdown replace`) {
        (0, assert_1.default)(regex.flags.includes('g'));
        this._currentPageMemo.initialize();
        this.plugin.application.renderer.on(typedoc_1.MarkdownEvent.PARSE, this._processMarkdown.bind(this, regex, callback, label), undefined, 100);
    }
    /**
     * Bind {@link MarkdownEvent} to replace every occurences of the jsdoc tags whose body is matched by the {@link bodyRegex}. The tag is replaced with the {@link callback} result.
     * Note that tags must have the following syntax: `{@tagname some params here}`. The {@link bodyRegex} should __only__ match `tagname some params here`
     *
     * @param bodyRegex - The tag body regex.
     * @param callback - The callback to execute with fullMatch, captures, & a source hint.
     * @param label - The replacer name.
     */
    bindTag(bodyRegex, callback, label = `${this.plugin.name}: Unnamed markdown tag replace`) {
        (0, assert_1.default)(bodyRegex.flags.includes('g'));
        const tagRegex = new RegExp(`\\{\\\\?@${bodyRegex.source}\\s*\\}`, bodyRegex.flags);
        this.bindReplace(tagRegex, ({ fullMatch, captures }, sourceHint) => {
            // Support escaped tags
            if (fullMatch.startsWith('{\\@')) {
                this.plugin.logger.verbose(() => `Found an escaped tag "${fullMatch}" in "${sourceHint()}"`);
                return fullMatch.replace('{\\@', '{@');
            }
            // Remove `{@` & `}`
            const newFullMatch = fullMatch.slice(2).slice(0, -1);
            return callback({ fullMatch: newFullMatch, captures }, sourceHint);
        }, label);
    }
    /**
     * Match every strings for {@link regex} & replace them with the return value of the {@link callback}. This method mutates the {@link event}.
     *
     * @param regex - The regex to match.
     * @param callback - The callback to execute with fullMatch, captures, & a source hint.
     * @param label - The replacer name.
     * @param event - The event to modify.
     */
    _processMarkdown(regex, callback, label, event) {
        var _a, _b;
        const mapContainers = MarkdownReplacer._getEventMapContainers(event);
        const originalText = event.parsedText;
        const getMapSource = (_b = (_a = (0, lodash_1.last)(mapContainers)) === null || _a === void 0 ? void 0 : _a.getEditionContext) !== null && _b !== void 0 ? _b : (pos => (Object.assign(Object.assign({}, utils_1.textUtils.getCoordinates(originalText, pos)), { source: originalText, index: pos, expansions: [] })));
        const sourceFile = this._currentPageMemo.hasCurrent ? utils_1.reflectionSourceUtils.getReflectionSourceFileName(this._currentPageMemo.currentReflection) : undefined;
        const relativeSource = sourceFile ? this.plugin.relativeToRoot(sourceFile) : undefined;
        const thisContainer = this._generateSourceMapContainer(regex, label, getMapSource);
        event.parsedText = originalText.replace(regex, (...args) => {
            const { captures, fullMatch, index } = spitArgs(...args);
            const getSourceHint = () => {
                if (!relativeSource) {
                    return 'UNKNOWN SOURCE';
                }
                const { line, column, expansions } = getMapSource(index);
                const posStr = line && column ? `:${line}:${column}` : '';
                const expansionContext = ` (in expansion of ${expansions.concat([thisContainer]).map(e => e.label).join(' ⇒ ')})`;
                return relativeSource + posStr + expansionContext;
            };
            const replacement = (0, utils_1.catchWrap)(() => callback({ fullMatch, captures }, getSourceHint), e => (0, utils_1.wrapError)(`In ${getSourceHint()}`, e));
            if ((0, lodash_1.isNil)(replacement)) {
                return fullMatch;
            }
            const replacementStr = typeof replacement === 'string' ? replacement : typedoc_1.JSX.renderElement(replacement);
            thisContainer.editions.push({ from: index, to: index + fullMatch.length, replacement: replacementStr, source: fullMatch });
            return replacementStr;
        });
        MarkdownReplacer._mapContainers.set(event, [
            ...mapContainers,
            thisContainer,
        ]);
    }
    /**
     * Create a new source map container for the given {@link regex} & {@link label}, that will chain with {@link getMapSource} to get location in the actual original source.
     *
     * @param regex - The regex used for replacement.
     * @param label - The replacement label.
     * @param getMapSource - The method to get the position before previous replacement.
     * @returns a new map container.
     */
    _generateSourceMapContainer(regex, label, getMapSource) {
        const thisContainer = {
            regex,
            editions: [],
            label,
            plugin: this.plugin,
            getEditionContext: (pos) => {
                const { offsetedPos, didEdit } = thisContainer.editions.reduce((acc, edit) => {
                    const isAfterEdit = edit.from <= acc.offsetedPos;
                    if (!isAfterEdit) {
                        return acc;
                    }
                    const _didEdit = edit.from + edit.replacement.length > acc.offsetedPos;
                    return {
                        offsetedPos: acc.offsetedPos + (_didEdit ?
                            edit.from - acc.offsetedPos :
                            edit.source.length - edit.replacement.length),
                        didEdit: _didEdit || acc.didEdit,
                    };
                }, { offsetedPos: pos, didEdit: false });
                const source = getMapSource(offsetedPos);
                if (didEdit) {
                    source.expansions = [...source.expansions, thisContainer];
                }
                return source;
            },
        };
        return thisContainer;
    }
}
exports.MarkdownReplacer = MarkdownReplacer;
MarkdownReplacer._addSourceToProject = (0, lodash_1.once)(function (context) {
    var _a;
    const packagePlugin = context.converter.getComponent('package');
    const errMsg = 'It is used to complete README & package sources for better tracking of markdown issues.';
    if (!packagePlugin) {
        this._logger.warn(`Missing \`package\` plugin. ${errMsg}`);
        return;
    }
    if (!('readmeFile' in packagePlugin && (0, lodash_1.isString)(packagePlugin.readmeFile))) {
        this._logger.warn(`Missing \`readmeFile\` in \`package\` plugin. ${errMsg}`);
        return;
    }
    context.project.sources = [
        ...((_a = context.project.sources) !== null && _a !== void 0 ? _a : []),
        {
            fileName: packagePlugin.readmeFile,
            character: 1,
            line: 1,
            file: new typedoc_1.SourceFile(packagePlugin.readmeFile),
        },
    ];
    if ('packageFile' in packagePlugin && (0, lodash_1.isString)(packagePlugin.packageFile)) {
        context.project.sources = [
            ...context.project.sources,
            {
                fileName: packagePlugin.packageFile,
                character: 1,
                line: 1,
                file: new typedoc_1.SourceFile(packagePlugin.packageFile),
            },
        ];
    }
});
MarkdownReplacer._mapContainers = new WeakMap();
//# sourceMappingURL=markdown-replacer.js.map