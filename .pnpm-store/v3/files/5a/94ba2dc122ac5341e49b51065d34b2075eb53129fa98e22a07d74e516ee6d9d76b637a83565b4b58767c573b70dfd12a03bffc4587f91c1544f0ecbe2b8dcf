import { deepmerge } from 'deepmerge-ts';
import escapeRegExp from 'escape-string-regexp';
import { AST_NODE_TYPES, ASTUtils, ESLintUtils } from '@typescript-eslint/experimental-utils';

const config$b = {
    rules: {
        "functional/functional-parameters": "error",
        "functional/immutable-data": "error",
        "functional/no-class": "error",
        "functional/no-conditional-statement": "error",
        "functional/no-expression-statement": "error",
        "functional/no-let": "error",
        "functional/no-loop-statement": "error",
        "functional/no-promise-reject": "error",
        "functional/no-this-expression": "error",
        "functional/no-throw-statement": "error",
        "functional/no-try-statement": "error",
        "functional/prefer-tacit": ["warn", { assumeTypes: { allowFixer: false } }],
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            rules: {
                "functional/no-method-signature": "error",
                "functional/no-mixed-type": "error",
                "functional/prefer-readonly-type": "error",
                "functional/prefer-tacit": ["error", { assumeTypes: false }],
                "functional/no-return-void": "error",
            },
        },
    ],
};
var all = config$b;

const config$a = {
    rules: {
        "functional/functional-parameters": "error",
    },
};
var currying = config$a;

const config$9 = {
    rules: {
        "prefer-const": "error",
        "no-param-reassign": "error",
        "no-var": "error",
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            rules: {
                "@typescript-eslint/prefer-readonly": "error",
                "@typescript-eslint/prefer-readonly-parameter-types": "warn",
                "@typescript-eslint/switch-exhaustiveness-check": "error",
            },
        },
    ],
};
var externalRecommended = config$9;

const config$8 = {
    rules: {
        "functional/no-throw-statement": "error",
        "functional/no-try-statement": "error",
    },
};
var noExceptions = config$8;

const config$7 = {
    rules: {
        "functional/no-let": "error",
        "functional/immutable-data": "error",
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            rules: {
                "functional/no-method-signature": "warn",
                "functional/prefer-readonly-type": "error",
            },
        },
    ],
};
var noMutations = config$7;

const config$6 = {
    rules: {
        "functional/no-this-expression": "error",
        "functional/no-class": "error",
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            rules: {
                "functional/no-mixed-type": "error",
            },
        },
    ],
};
var noObjectOrientation = config$6;

const config$5 = {
    rules: {
        "functional/no-expression-statement": "error",
        "functional/no-conditional-statement": "error",
        "functional/no-loop-statement": "error",
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            rules: {
                "functional/no-return-void": "error",
            },
        },
    ],
};
var noStatements = config$5;

const config$4 = {
    rules: {
        "functional/prefer-tacit": ["warn", { assumeTypes: { allowFixer: false } }],
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            rules: {
                "functional/prefer-tacit": ["error", { assumeTypes: false }],
            },
        },
    ],
};
var stylistic = config$4;

const overrides$1 = {
    rules: {
        "functional/prefer-tacit": "off",
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            rules: {
                "functional/prefer-tacit": "off",
            },
        },
    ],
};
const config$3 = deepmerge(currying, noMutations, noExceptions, noObjectOrientation, noStatements, stylistic, overrides$1);
var functional = config$3;

const overrides = {
    rules: {
        "functional/immutable-data": ["error", { ignoreClass: "fieldsOnly" }],
        "functional/no-conditional-statement": "off",
        "functional/no-expression-statement": "off",
        "functional/no-try-statement": "off",
        "functional/functional-parameters": [
            "error",
            {
                enforceParameterCount: false,
            },
        ],
    },
};
const config$2 = deepmerge(functional, overrides);
var functionalLite = config$2;

var _a, _b, _c;
function turnRulesOff(rules) {
    return rules === undefined
        ? undefined
        : Object.fromEntries(rules.map((name) => [name, "off"]));
}
const allRulesNames = new Set([
    ...Object.keys((_a = all.rules) !== null && _a !== void 0 ? _a : {}),
    ...((_c = (_b = all.overrides) === null || _b === void 0 ? void 0 : _b.flatMap((override) => { var _a; return Object.keys((_a = override.rules) !== null && _a !== void 0 ? _a : {}); })) !== null && _c !== void 0 ? _c : []),
]);
const config$1 = {
    rules: turnRulesOff([...allRulesNames]),
};
var off = config$1;

var ts = (() => {
    try {
        return require("typescript");
    }
    catch (_a) {
        return undefined;
    }
})();

function isReadonlyArray(value) {
    return Array.isArray(value);
}
function isArrayExpression(node) {
    return node.type === AST_NODE_TYPES.ArrayExpression;
}
function isAssignmentExpression(node) {
    return node.type === AST_NODE_TYPES.AssignmentExpression;
}
function isAssignmentPattern(node) {
    return node.type === AST_NODE_TYPES.AssignmentPattern;
}
function isBlockStatement(node) {
    return node.type === AST_NODE_TYPES.BlockStatement;
}
function isBreakStatement(node) {
    return node.type === AST_NODE_TYPES.BreakStatement;
}
function isCallExpression(node) {
    return node.type === AST_NODE_TYPES.CallExpression;
}
function isPropertyDefinition(node) {
    return node.type === AST_NODE_TYPES.PropertyDefinition;
}
function isClassLike(node) {
    return (node.type === AST_NODE_TYPES.ClassDeclaration ||
        node.type === AST_NODE_TYPES.ClassExpression);
}
function isContinueStatement(node) {
    return node.type === AST_NODE_TYPES.ContinueStatement;
}
function isExpressionStatement(node) {
    return node.type === AST_NODE_TYPES.ExpressionStatement;
}
function isForStatement(node) {
    return node.type === AST_NODE_TYPES.ForStatement;
}
function isFunctionDeclaration(node) {
    return node.type === AST_NODE_TYPES.FunctionDeclaration;
}
function isFunctionExpressionLike(node) {
    return (node.type === AST_NODE_TYPES.FunctionExpression ||
        node.type === AST_NODE_TYPES.ArrowFunctionExpression);
}
function isFunctionLike(node) {
    return isFunctionDeclaration(node) || isFunctionExpressionLike(node);
}
function isIdentifier(node) {
    return node.type === AST_NODE_TYPES.Identifier;
}
function isIfStatement(node) {
    return node.type === AST_NODE_TYPES.IfStatement;
}
function isMemberExpression(node) {
    return node.type === AST_NODE_TYPES.MemberExpression;
}
function isMethodDefinition(node) {
    return node.type === AST_NODE_TYPES.MethodDefinition;
}
function isNewExpression(node) {
    return node.type === AST_NODE_TYPES.NewExpression;
}
function isObjectExpression(node) {
    return node.type === AST_NODE_TYPES.ObjectExpression;
}
function isProperty(node) {
    return node.type === AST_NODE_TYPES.Property;
}
function isRestElement(node) {
    return node.type === AST_NODE_TYPES.RestElement;
}
function isReturnStatement(node) {
    return node.type === AST_NODE_TYPES.ReturnStatement;
}
function isSwitchStatement(node) {
    return node.type === AST_NODE_TYPES.SwitchStatement;
}
function isThisExpression(node) {
    return node.type === AST_NODE_TYPES.ThisExpression;
}
function isThrowStatement(node) {
    return node.type === AST_NODE_TYPES.ThrowStatement;
}
function isTSArrayType(node) {
    return node.type === AST_NODE_TYPES.TSArrayType;
}
function isTSFunctionType(node) {
    return node.type === AST_NODE_TYPES.TSFunctionType;
}
function isTSIndexSignature(node) {
    return node.type === AST_NODE_TYPES.TSIndexSignature;
}
function isTSInterfaceBody(node) {
    return node.type === AST_NODE_TYPES.TSInterfaceBody;
}
function isTSInterfaceHeritage(node) {
    return node.type === AST_NODE_TYPES.TSInterfaceHeritage;
}
function isTSNullKeyword(node) {
    return node.type === AST_NODE_TYPES.TSNullKeyword;
}
function isTSParameterProperty(node) {
    return node.type === AST_NODE_TYPES.TSParameterProperty;
}
function isTSPropertySignature(node) {
    return node.type === AST_NODE_TYPES.TSPropertySignature;
}
function isTSTupleType(node) {
    return node.type === AST_NODE_TYPES.TSTupleType;
}
function isTSTypeAnnotation(node) {
    return node.type === AST_NODE_TYPES.TSTypeAnnotation;
}
function isTSTypeLiteral(node) {
    return node.type === AST_NODE_TYPES.TSTypeLiteral;
}
function isTSTypeOperator(node) {
    return node.type === AST_NODE_TYPES.TSTypeOperator;
}
function isTSTypeReference(node) {
    return node.type === AST_NODE_TYPES.TSTypeReference;
}
function isTSUndefinedKeyword(node) {
    return node.type === AST_NODE_TYPES.TSUndefinedKeyword;
}
function isTSVoidKeyword(node) {
    return node.type === AST_NODE_TYPES.TSVoidKeyword;
}
function isUnaryExpression(node) {
    return node.type === AST_NODE_TYPES.UnaryExpression;
}
function isVariableDeclaration(node) {
    return node.type === AST_NODE_TYPES.VariableDeclaration;
}
function hasID(node) {
    return Object.prototype.hasOwnProperty.call(node, "id");
}
function hasKey(node) {
    return Object.prototype.hasOwnProperty.call(node, "key");
}
function isDefined(value) {
    return value !== null && value !== undefined;
}
function isUnionType(type) {
    return ts !== undefined && type.flags === ts.TypeFlags.Union;
}
function isArrayType(type, assumeType = false, node = null) {
    return assumeType === true && type === null
        ? node !== null
        : type !== null &&
            ((type.symbol !== undefined && type.symbol.name === "Array") ||
                (isUnionType(type) &&
                    type.types.some((t) => isArrayType(t, false, null))));
}
function isArrayConstructorType(type, assumeType = false, node = null) {
    return assumeType === true && type === null
        ? node !== null && isIdentifier(node) && node.name === "Array"
        : type !== null &&
            ((type.symbol !== undefined &&
                type.symbol.name === "ArrayConstructor") ||
                (isUnionType(type) &&
                    type.types.some((t) => isArrayConstructorType(t, false, null))));
}
function isObjectConstructorType(type, assumeType = false, node = null) {
    return assumeType === true && type === null
        ? node !== null && isIdentifier(node) && node.name === "Object"
        : type !== null &&
            ((type.symbol !== undefined &&
                type.symbol.name === "ObjectConstructor") ||
                (isUnionType(type) &&
                    type.types.some((t) => isObjectConstructorType(t, false, null))));
}
function isNeverType(type) {
    return ts !== undefined && type.flags === ts.TypeFlags.Never;
}
function isVoidType(type) {
    return ts !== undefined && type.flags === ts.TypeFlags.Void;
}
function isNullType(type) {
    return ts !== undefined && type.flags === ts.TypeFlags.Null;
}
function isUndefinedType(type) {
    return ts !== undefined && type.flags === ts.TypeFlags.Undefined;
}

function getAncestorOfType(checker, node, child = null) {
    return checker(node, child)
        ? node
        : isDefined(node.parent)
            ? getAncestorOfType(checker, node.parent, node)
            : null;
}
function inFunctionBody(node, async) {
    const functionNode = getAncestorOfType((n, c) => isFunctionLike(n) && n.body === c, node);
    return (functionNode !== null &&
        (async === undefined || functionNode.async === async));
}
function inClass(node) {
    return getAncestorOfType(isClassLike, node) !== null;
}
function inForLoopInitializer(node) {
    return (getAncestorOfType((n, c) => isForStatement(n) && n.init === c, node) !== null);
}
function inReadonly(node) {
    var _a, _b, _c;
    if (isDefined(node.parent) &&
        isTSTypeLiteral(node.parent) &&
        isDefined(node.parent.parent) &&
        isTSTypeAnnotation(node.parent.parent)) {
        return false;
    }
    const expressionOrTypeName = (_b = (_a = getAncestorOfType(isTSTypeReference, node)) === null || _a === void 0 ? void 0 : _a.typeName) !== null && _b !== void 0 ? _b : (_c = getAncestorOfType(isTSInterfaceHeritage, node)) === null || _c === void 0 ? void 0 : _c.expression;
    return (ASTUtils.isIdentifier(expressionOrTypeName) &&
        expressionOrTypeName.name === "Readonly");
}
function inInterface(node) {
    return getAncestorOfType(isTSInterfaceBody, node) !== null;
}
function inConstructor(node) {
    const methodDefinition = getAncestorOfType(isMethodDefinition, node);
    return (methodDefinition !== null &&
        isIdentifier(methodDefinition.key) &&
        methodDefinition.key.name === "constructor");
}
function isInReturnType(node) {
    return (getAncestorOfType((n) => isDefined(n.parent) &&
        isFunctionLike(n.parent) &&
        n.parent.returnType === n, node) !== null);
}
function isPropertyAccess(node) {
    return (node.parent !== undefined &&
        isMemberExpression(node.parent) &&
        node.parent.property === node);
}
function isPropertyName(node) {
    return (node.parent !== undefined &&
        isProperty(node.parent) &&
        node.parent.key === node);
}
function isIIFE(node) {
    return (isFunctionExpressionLike(node) &&
        node.parent !== undefined &&
        isCallExpression(node.parent) &&
        node.parent.callee === node);
}
function getKeyOfValueInObjectExpression(node) {
    if (!isDefined(node.parent)) {
        return null;
    }
    const objectExpression = getAncestorOfType(isObjectExpression, node);
    if (objectExpression === null) {
        return null;
    }
    const objectExpressionProps = objectExpression.properties.filter((prop) => isProperty(prop) && prop.value === node);
    if (objectExpressionProps.length !== 1) {
        return null;
    }
    const objectExpressionProp = objectExpressionProps[0];
    if (!isProperty(objectExpressionProp) ||
        !isIdentifier(objectExpressionProp.key)) {
        return null;
    }
    return objectExpressionProp.key.name;
}

const allowLocalMutationOptionSchema = {
    type: "object",
    properties: {
        allowLocalMutation: {
            type: "boolean",
        },
    },
    additionalProperties: false,
};
const ignorePatternOptionSchema = {
    type: "object",
    properties: {
        ignorePattern: {
            type: ["string", "array"],
            items: {
                type: "string",
            },
        },
    },
    additionalProperties: false,
};
const ignoreAccessorPatternOptionSchema = {
    type: "object",
    properties: {
        ignoreAccessorPattern: {
            type: ["string", "array"],
            items: {
                type: "string",
            },
        },
    },
    additionalProperties: false,
};
const ignoreClassOptionSchema = {
    type: "object",
    properties: {
        ignoreClass: {
            oneOf: [
                {
                    type: "boolean",
                },
                {
                    type: "string",
                    enum: ["fieldsOnly"],
                },
            ],
        },
    },
    additionalProperties: false,
};
const ignoreInterfaceOptionSchema = {
    type: "object",
    properties: {
        ignoreInterface: {
            type: "boolean",
        },
    },
    additionalProperties: false,
};
function getNodeIdentifierText(node, context) {
    if (!isDefined(node)) {
        return undefined;
    }
    const identifierText = isIdentifier(node)
        ? node.name
        : hasID(node) && isDefined(node.id)
            ? getNodeIdentifierText(node.id, context)
            : hasKey(node) && isDefined(node.key)
                ? getNodeIdentifierText(node.key, context)
                : isAssignmentExpression(node)
                    ? getNodeIdentifierText(node.left, context)
                    : isMemberExpression(node)
                        ? `${getNodeIdentifierText(node.object, context)}.${getNodeIdentifierText(node.property, context)}`
                        : isThisExpression(node)
                            ? "this"
                            : isUnaryExpression(node)
                                ? getNodeIdentifierText(node.argument, context)
                                : isExpressionStatement(node)
                                    ? context.getSourceCode().getText(node)
                                    : isTSArrayType(node) ||
                                        isTSIndexSignature(node) ||
                                        isTSTupleType(node) ||
                                        isTSTypeAnnotation(node) ||
                                        isTSTypeLiteral(node) ||
                                        isTSTypeReference(node)
                                        ? getNodeIdentifierText(node.parent, context)
                                        : null;
    if (identifierText !== null) {
        return identifierText;
    }
    const keyInObjectExpression = getKeyOfValueInObjectExpression(node);
    if (keyInObjectExpression !== null) {
        return keyInObjectExpression;
    }
    return undefined;
}
function getNodeIdentifierTexts(node, context) {
    return (isVariableDeclaration(node)
        ? node.declarations.flatMap((declarator) => getNodeIdentifierText(declarator, context))
        : [getNodeIdentifierText(node, context)]).filter((text) => text !== undefined);
}
function shouldIgnoreViaPattern(text, ignorePattern) {
    const patterns = isReadonlyArray(ignorePattern)
        ? ignorePattern
        : [ignorePattern];
    return patterns.some((pattern) => new RegExp(pattern, "u").test(text));
}
function accessorPatternMatch([pattern, ...remainingPatternParts], textParts, allowExtra = false) {
    return pattern === undefined
        ? allowExtra || textParts.length === 0
        :
            pattern === "**"
                ? textParts.length === 0
                    ? accessorPatternMatch(remainingPatternParts, [], allowExtra)
                    : Array.from({ length: textParts.length })
                        .map((_element, index) => index)
                        .some((offset) => accessorPatternMatch(remainingPatternParts, textParts.slice(offset), true))
                :
                    pattern === "*"
                        ? textParts.length > 0 &&
                            accessorPatternMatch(remainingPatternParts, textParts.slice(1), allowExtra)
                        :
                            new RegExp(`^${escapeRegExp(pattern).replace(/\\\*/gu, ".*")}$`, "u").test(textParts[0]) &&
                                accessorPatternMatch(remainingPatternParts, textParts.slice(1), allowExtra);
}
function shouldIgnoreViaAccessorPattern(text, ignorePattern) {
    const patterns = isReadonlyArray(ignorePattern)
        ? ignorePattern
        : [ignorePattern];
    return patterns.some((pattern) => accessorPatternMatch(pattern.split("."), text.split(".")));
}
function shouldIgnoreLocalMutation(node, context, options) {
    return options.allowLocalMutation === true && inFunctionBody(node);
}
function shouldIgnoreClass(node, context, options) {
    return ((options.ignoreClass === true && inClass(node)) ||
        (options.ignoreClass === "fieldsOnly" &&
            (isPropertyDefinition(node) ||
                (isAssignmentExpression(node) &&
                    inClass(node) &&
                    isMemberExpression(node.left) &&
                    isThisExpression(node.left.object)))));
}
function shouldIgnoreInterface(node, context, options) {
    return options.ignoreInterface === true && inInterface(node);
}
function shouldIgnorePattern(node, context, options) {
    const texts = getNodeIdentifierTexts(node, context);
    if (texts.length === 0) {
        return false;
    }
    return ((options.ignorePattern !== undefined &&
        texts.every((text) => shouldIgnoreViaPattern(text, options.ignorePattern))) ||
        (options.ignoreAccessorPattern !== undefined &&
            texts.every((text) => shouldIgnoreViaAccessorPattern(text, options.ignoreAccessorPattern))));
}

const __VERSION__ = "0.0.0-development";
function checkNode(check, context, options) {
    return (node) => {
        const result = check(node, context, options);
        for (const descriptor of result.descriptors) {
            result.context.report(descriptor);
        }
    };
}
function createRule(name, meta, defaultOptions, ruleFunctionsMap) {
    return ESLintUtils.RuleCreator((name) => `https://github.com/jonaskello/eslint-plugin-functional/blob/v4.2.0/docs/rules/${name}.md`)({
        name,
        meta,
        defaultOptions: [defaultOptions],
        create: (context, [options]) => Object.fromEntries(Object.entries(ruleFunctionsMap).map(([nodeSelector, ruleFunction]) => [
            nodeSelector,
            checkNode(ruleFunction, context, options),
        ])),
    });
}
function getTypeOfNode(node, context) {
    const { parserServices } = context;
    if (parserServices === undefined ||
        parserServices.program === undefined ||
        parserServices.esTreeNodeToTSNodeMap === undefined) {
        return null;
    }
    const checker = parserServices.program.getTypeChecker();
    const nodeType = checker.getTypeAtLocation(parserServices.esTreeNodeToTSNodeMap.get(node));
    const constrained = checker.getBaseConstraintOfType(nodeType);
    return constrained !== null && constrained !== void 0 ? constrained : nodeType;
}
function getESTreeNode(node, context) {
    const { parserServices } = context;
    return parserServices === undefined ||
        parserServices.program === undefined ||
        parserServices.tsNodeToESTreeNodeMap === undefined
        ? null
        : parserServices.tsNodeToESTreeNodeMap.get(node);
}

const name$f = "functional-parameters";
const schema$f = [
    deepmerge(ignorePatternOptionSchema, {
        type: "object",
        properties: {
            allowRestParameter: {
                type: "boolean",
            },
            allowArgumentsKeyword: {
                type: "boolean",
            },
            enforceParameterCount: {
                oneOf: [
                    {
                        type: "boolean",
                        enum: [false],
                    },
                    {
                        type: "string",
                        enum: ["atLeastOne", "exactlyOne"],
                    },
                    {
                        type: "object",
                        properties: {
                            count: {
                                type: "string",
                                enum: ["atLeastOne", "exactlyOne"],
                            },
                            ignoreIIFE: {
                                type: "boolean",
                            },
                        },
                        additionalProperties: false,
                    },
                ],
            },
        },
        additionalProperties: false,
    }),
];
const defaultOptions$f = {
    allowRestParameter: false,
    allowArgumentsKeyword: false,
    enforceParameterCount: {
        count: "atLeastOne",
        ignoreIIFE: true,
    },
};
const errorMessages$f = {
    restParam: "Unexpected rest parameter. Use a regular parameter of type array instead.",
    arguments: "Unexpected use of `arguments`. Use regular function arguments instead.",
    paramCountAtLeastOne: "Functions must have at least one parameter.",
    paramCountExactlyOne: "Functions must have exactly one parameter.",
};
const meta$f = {
    type: "suggestion",
    docs: {
        description: "Enforce functional parameters.",
        recommended: "error",
    },
    messages: errorMessages$f,
    schema: schema$f,
};
function getRestParamViolations(allowRestParameter, node) {
    return !allowRestParameter &&
        node.params.length > 0 &&
        isRestElement(node.params[node.params.length - 1])
        ? [
            {
                node: node.params[node.params.length - 1],
                messageId: "restParam",
            },
        ]
        : [];
}
function getParamCountViolations(enforceParameterCount, node) {
    if (enforceParameterCount === false ||
        (node.params.length === 0 &&
            typeof enforceParameterCount === "object" &&
            enforceParameterCount.ignoreIIFE &&
            isIIFE(node))) {
        return [];
    }
    if (node.params.length === 0 &&
        (enforceParameterCount === "atLeastOne" ||
            (typeof enforceParameterCount === "object" &&
                enforceParameterCount.count === "atLeastOne"))) {
        return [
            {
                node,
                messageId: "paramCountAtLeastOne",
            },
        ];
    }
    if (node.params.length !== 1 &&
        (enforceParameterCount === "exactlyOne" ||
            (typeof enforceParameterCount === "object" &&
                enforceParameterCount.count === "exactlyOne"))) {
        return [
            {
                node,
                messageId: "paramCountExactlyOne",
            },
        ];
    }
    return [];
}
function checkFunction$2(node, context, options) {
    if (shouldIgnorePattern(node, context, options)) {
        return {
            context,
            descriptors: [],
        };
    }
    return {
        context,
        descriptors: [
            ...getRestParamViolations(options.allowRestParameter, node),
            ...getParamCountViolations(options.enforceParameterCount, node),
        ],
    };
}
function checkIdentifier(node, context, options) {
    if (shouldIgnorePattern(node, context, options)) {
        return {
            context,
            descriptors: [],
        };
    }
    return {
        context,
        descriptors: !options.allowArgumentsKeyword &&
            node.name === "arguments" &&
            !isPropertyName(node) &&
            !isPropertyAccess(node)
            ? [
                {
                    node,
                    messageId: "arguments",
                },
            ]
            : [],
    };
}
const rule$f = createRule(name$f, meta$f, defaultOptions$f, {
    FunctionDeclaration: checkFunction$2,
    FunctionExpression: checkFunction$2,
    ArrowFunctionExpression: checkFunction$2,
    Identifier: checkIdentifier,
});

function isExpected(expected) {
    return (actual) => actual === expected;
}
function isDirectivePrologue(node) {
    return (node.expression.type === AST_NODE_TYPES.Literal &&
        typeof node.expression.value === "string" &&
        node.expression.value.startsWith("use "));
}

const name$e = "immutable-data";
const schema$e = [
    deepmerge(ignorePatternOptionSchema, ignoreAccessorPatternOptionSchema, ignoreClassOptionSchema, {
        type: "object",
        properties: {
            ignoreImmediateMutation: {
                type: "boolean",
            },
            assumeTypes: {
                oneOf: [
                    {
                        type: "boolean",
                    },
                    {
                        type: "object",
                        properties: {
                            forArrays: {
                                type: "boolean",
                            },
                            forObjects: {
                                type: "boolean",
                            },
                        },
                        additionalProperties: false,
                    },
                ],
            },
        },
        additionalProperties: false,
    }),
];
const defaultOptions$e = {
    ignoreClass: false,
    ignoreImmediateMutation: true,
    assumeTypes: {
        forArrays: true,
        forObjects: true,
    },
};
const errorMessages$e = {
    generic: "Modifying an existing object/array is not allowed.",
    object: "Modifying properties of existing object not allowed.",
    array: "Modifying an array is not allowed.",
};
const meta$e = {
    type: "suggestion",
    docs: {
        description: "Enforce treating data as immutable.",
        recommended: "error",
    },
    messages: errorMessages$e,
    schema: schema$e,
};
const arrayMutatorMethods = new Set([
    "copyWithin",
    "fill",
    "pop",
    "push",
    "reverse",
    "shift",
    "sort",
    "splice",
    "unshift",
]);
const arrayNewObjectReturningMethods = [
    "concat",
    "slice",
    "filter",
    "map",
    "reduce",
    "reduceRight",
];
const arrayConstructorFunctions = ["from", "of"];
const objectConstructorMutatorFunctions = new Set([
    "assign",
    "defineProperties",
    "defineProperty",
    "setPrototypeOf",
]);
function checkAssignmentExpression(node, context, options) {
    if (!isMemberExpression(node.left) ||
        shouldIgnoreClass(node, context, options) ||
        shouldIgnorePattern(node, context, options)) {
        return {
            context,
            descriptors: [],
        };
    }
    return {
        context,
        descriptors: !inConstructor(node) ? [{ node, messageId: "generic" }] : [],
    };
}
function checkUnaryExpression(node, context, options) {
    if (!isMemberExpression(node.argument) ||
        shouldIgnoreClass(node, context, options) ||
        shouldIgnorePattern(node, context, options)) {
        return {
            context,
            descriptors: [],
        };
    }
    return {
        context,
        descriptors: node.operator === "delete" ? [{ node, messageId: "generic" }] : [],
    };
}
function checkUpdateExpression(node, context, options) {
    if (!isMemberExpression(node.argument) ||
        shouldIgnoreClass(node.argument, context, options) ||
        shouldIgnorePattern(node.argument, context, options)) {
        return {
            context,
            descriptors: [],
        };
    }
    return {
        context,
        descriptors: [{ node, messageId: "generic" }],
    };
}
function isInChainCallAndFollowsNew(node, context, assumeArrayTypes) {
    return (isArrayExpression(node.object) ||
        (isNewExpression(node.object) &&
            isArrayConstructorType(getTypeOfNode(node.object.callee, context), assumeArrayTypes, node.object.callee)) ||
        (isCallExpression(node.object) &&
            isMemberExpression(node.object.callee) &&
            isIdentifier(node.object.callee.property) &&
            ((arrayConstructorFunctions.some(isExpected(node.object.callee.property.name)) &&
                isArrayConstructorType(getTypeOfNode(node.object.callee.object, context), assumeArrayTypes, node.object.callee.object)) ||
                arrayNewObjectReturningMethods.some(isExpected(node.object.callee.property.name)))));
}
function checkCallExpression$1(node, context, options) {
    if (!isMemberExpression(node.callee) ||
        !isIdentifier(node.callee.property) ||
        shouldIgnoreClass(node.callee.object, context, options) ||
        shouldIgnorePattern(node.callee.object, context, options)) {
        return {
            context,
            descriptors: [],
        };
    }
    const assumeTypesForArrays = options.assumeTypes === true ||
        (options.assumeTypes !== false && options.assumeTypes.forArrays === true);
    if (arrayMutatorMethods.has(node.callee.property.name) &&
        (!options.ignoreImmediateMutation ||
            !isInChainCallAndFollowsNew(node.callee, context, assumeTypesForArrays)) &&
        isArrayType(getTypeOfNode(node.callee.object, context), assumeTypesForArrays, node.callee.object)) {
        return {
            context,
            descriptors: [{ node, messageId: "array" }],
        };
    }
    const assumeTypesForObjects = options.assumeTypes === true ||
        (options.assumeTypes !== false && options.assumeTypes.forObjects === true);
    if (objectConstructorMutatorFunctions.has(node.callee.property.name) &&
        node.arguments.length >= 2 &&
        (isIdentifier(node.arguments[0]) ||
            isMemberExpression(node.arguments[0])) &&
        !shouldIgnoreClass(node.arguments[0], context, options) &&
        !shouldIgnorePattern(node.arguments[0], context, options) &&
        isObjectConstructorType(getTypeOfNode(node.callee.object, context), assumeTypesForObjects, node.callee.object)) {
        return {
            context,
            descriptors: [{ node, messageId: "object" }],
        };
    }
    return {
        context,
        descriptors: [],
    };
}
const rule$e = createRule(name$e, meta$e, defaultOptions$e, {
    AssignmentExpression: checkAssignmentExpression,
    UnaryExpression: checkUnaryExpression,
    UpdateExpression: checkUpdateExpression,
    CallExpression: checkCallExpression$1,
});

const name$d = "no-class";
const schema$d = [];
const defaultOptions$d = {};
const errorMessages$d = {
    generic: "Unexpected class, use functions not classes.",
};
const meta$d = {
    type: "suggestion",
    docs: {
        description: "Disallow classes.",
        recommended: "error",
    },
    messages: errorMessages$d,
    schema: schema$d,
};
function checkClass(node, context) {
    return { context, descriptors: [{ node, messageId: "generic" }] };
}
const rule$d = createRule(name$d, meta$d, defaultOptions$d, { ClassDeclaration: checkClass, ClassExpression: checkClass });

var tsutils = (() => {
    try {
        return require("tsutils");
    }
    catch (_a) {
        return undefined;
    }
})();

const name$c = "no-conditional-statement";
const schema$c = [
    {
        type: "object",
        properties: {
            allowReturningBranches: {
                oneOf: [
                    {
                        type: "boolean",
                    },
                    {
                        type: "string",
                        enum: ["ifExhaustive"],
                    },
                ],
            },
        },
        additionalProperties: false,
    },
];
const defaultOptions$c = { allowReturningBranches: false };
const errorMessages$c = {
    incompleteBranch: "Incomplete branch, every branch in a conditional statement must contain a return statement.",
    incompleteIf: "Incomplete if, it must have an else statement and every branch must contain a return statement.",
    incompleteSwitch: "Incomplete switch, it must be exhaustive or have an default case and every case must contain a return statement.",
    unexpectedIf: "Unexpected if, use a conditional expression (ternary operator) instead.",
    unexpectedSwitch: "Unexpected switch, use a conditional expression (ternary operator) instead.",
};
const meta$c = {
    type: "suggestion",
    docs: {
        description: "Disallow conditional statements.",
        recommended: "error",
    },
    messages: errorMessages$c,
    schema: schema$c,
};
function incompleteBranchViolation(node) {
    return [{ node, messageId: "incompleteBranch" }];
}
function getIsNeverExpressions(context) {
    return (statement) => {
        if (isExpressionStatement(statement)) {
            const expressionStatementType = getTypeOfNode(statement.expression, context);
            return (expressionStatementType !== null && isNeverType(expressionStatementType));
        }
        return false;
    };
}
function isIfReturningBranch(statement) {
    return (isIfStatement(statement) ||
        isReturnStatement(statement) ||
        isThrowStatement(statement) ||
        isBreakStatement(statement) ||
        isContinueStatement(statement));
}
function getIfBranchViolations(node, context) {
    const branches = [node.consequent, node.alternate];
    const violations = branches.filter((branch) => {
        if (branch === null || isIfReturningBranch(branch)) {
            return false;
        }
        if (isExpressionStatement(branch)) {
            const expressionStatementType = getTypeOfNode(branch.expression, context);
            if (expressionStatementType !== null &&
                isNeverType(expressionStatementType)) {
                return false;
            }
        }
        if (isBlockStatement(branch)) {
            if (branch.body.some(isIfReturningBranch)) {
                return false;
            }
            const isNeverExpressions = getIsNeverExpressions(context);
            if (branch.body.some(isNeverExpressions)) {
                return false;
            }
        }
        return true;
    });
    return violations.flatMap(incompleteBranchViolation);
}
function isSwitchReturningBranch(statement) {
    return (isSwitchStatement(statement) ||
        isReturnStatement(statement) ||
        isThrowStatement(statement));
}
function getSwitchViolations(node, context) {
    const isNeverExpressions = getIsNeverExpressions(context);
    const violations = node.cases.filter((branch) => {
        if (branch.consequent.length === 0) {
            return false;
        }
        if (branch.consequent.some(isSwitchReturningBranch)) {
            return false;
        }
        if (branch.consequent.every(isBlockStatement)) {
            const lastBlock = branch.consequent[branch.consequent.length - 1];
            if (lastBlock.body.some(isSwitchReturningBranch)) {
                return false;
            }
            if (lastBlock.body.some(isNeverExpressions)) {
                return false;
            }
        }
        if (branch.consequent.some(isNeverExpressions)) {
            return false;
        }
        return true;
    });
    return violations.flatMap(incompleteBranchViolation);
}
function isExhaustiveIfViolation(node) {
    return node.alternate === null;
}
function isExhaustiveTypeSwitchViolation(node, context) {
    if (tsutils === undefined) {
        return true;
    }
    const discriminantType = getTypeOfNode(node.discriminant, context);
    if (discriminantType === null || !discriminantType.isUnion()) {
        return true;
    }
    const unionTypes = tsutils.unionTypeParts(discriminantType);
    const caseTypes = node.cases.reduce((types, c) => new Set([...types, getTypeOfNode(c.test, context)]), new Set());
    return unionTypes.some((unionType) => !caseTypes.has(unionType));
}
function isExhaustiveSwitchViolation(node, context) {
    return (node.cases.every((c) => c.test !== null)
        ? isExhaustiveTypeSwitchViolation(node, context)
        : false);
}
function checkIfStatement(node, context, options) {
    return {
        context,
        descriptors: options.allowReturningBranches === false
            ? [{ node, messageId: "unexpectedIf" }]
            : options.allowReturningBranches === "ifExhaustive"
                ? isExhaustiveIfViolation(node)
                    ? [{ node, messageId: "incompleteIf" }]
                    : getIfBranchViolations(node, context)
                : getIfBranchViolations(node, context),
    };
}
function checkSwitchStatement(node, context, options) {
    return {
        context,
        descriptors: options.allowReturningBranches === false
            ? [{ node, messageId: "unexpectedSwitch" }]
            : options.allowReturningBranches === "ifExhaustive"
                ? isExhaustiveSwitchViolation(node, context)
                    ? [{ node, messageId: "incompleteSwitch" }]
                    : getSwitchViolations(node, context)
                : getSwitchViolations(node, context),
    };
}
const rule$c = createRule(name$c, meta$c, defaultOptions$c, {
    IfStatement: checkIfStatement,
    SwitchStatement: checkSwitchStatement,
});

const name$b = "no-expression-statement";
const schema$b = [
    deepmerge(ignorePatternOptionSchema, {
        type: "object",
        properties: {
            ignoreVoid: {
                type: "boolean",
            },
        },
        additionalProperties: false,
    }),
];
const defaultOptions$b = {
    ignoreVoid: false,
};
const errorMessages$b = {
    generic: "Using expressions to cause side-effects not allowed.",
};
const meta$b = {
    type: "suggestion",
    docs: {
        description: "Disallow expression statements.",
        recommended: "error",
    },
    messages: errorMessages$b,
    schema: schema$b,
};
function checkExpressionStatement(node, context, options) {
    if (shouldIgnorePattern(node, context, options)) {
        return {
            context,
            descriptors: [],
        };
    }
    if (isDirectivePrologue(node)) {
        return {
            context,
            descriptors: [],
        };
    }
    if (options.ignoreVoid === true) {
        const type = getTypeOfNode(node.expression, context);
        return {
            context,
            descriptors: type !== null && isVoidType(type)
                ? []
                : [{ node, messageId: "generic" }],
        };
    }
    return {
        context,
        descriptors: [{ node, messageId: "generic" }],
    };
}
const rule$b = createRule(name$b, meta$b, defaultOptions$b, {
    ExpressionStatement: checkExpressionStatement,
});

const name$a = "no-let";
const schema$a = [
    deepmerge(allowLocalMutationOptionSchema, ignorePatternOptionSchema, {
        type: "object",
        properties: {
            allowInForLoopInit: {
                type: "boolean",
            },
        },
        additionalProperties: false,
    }),
];
const defaultOptions$a = {
    allowInForLoopInit: false,
    allowLocalMutation: false,
};
const errorMessages$a = {
    generic: "Unexpected let, use const instead.",
};
const meta$a = {
    type: "suggestion",
    docs: {
        description: "Disallow mutable variables.",
        recommended: "error",
    },
    messages: errorMessages$a,
    fixable: "code",
    schema: schema$a,
};
function checkVariableDeclaration(node, context, options) {
    if (node.kind !== "let" ||
        shouldIgnoreLocalMutation(node, context, options) ||
        shouldIgnorePattern(node, context, options) ||
        (options.allowInForLoopInit && inForLoopInitializer(node))) {
        return {
            context,
            descriptors: [],
        };
    }
    return {
        context,
        descriptors: [{ node, messageId: "generic" }],
    };
}
const rule$a = createRule(name$a, meta$a, defaultOptions$a, {
    VariableDeclaration: checkVariableDeclaration,
});

const name$9 = "no-loop-statement";
const schema$9 = [];
const defaultOptions$9 = {};
const errorMessages$9 = {
    generic: "Unexpected loop, use map or reduce instead.",
};
const meta$9 = {
    type: "suggestion",
    docs: {
        description: "Disallow imperative loops.",
        recommended: "error",
    },
    messages: errorMessages$9,
    schema: schema$9,
};
function checkLoop(node, context) {
    return { context, descriptors: [{ node, messageId: "generic" }] };
}
const rule$9 = createRule(name$9, meta$9, defaultOptions$9, {
    ForStatement: checkLoop,
    ForInStatement: checkLoop,
    ForOfStatement: checkLoop,
    WhileStatement: checkLoop,
    DoWhileStatement: checkLoop,
});

const name$8 = "no-method-signature";
const schema$8 = [
    {
        type: "object",
        properties: {
            ignoreIfReadonly: {
                type: "boolean",
                default: true,
            },
        },
        additionalProperties: false,
    },
];
const defaultOptions$8 = {
    ignoreIfReadonly: true,
};
const errorMessages$8 = {
    generic: "Method signature is mutable, use property signature with readonly modifier instead.",
};
const meta$8 = {
    type: "suggestion",
    docs: {
        description: "Prefer property signatures with readonly modifiers over method signatures.",
        recommended: "warn",
    },
    messages: errorMessages$8,
    schema: schema$8,
};
function checkTSMethodSignature(node, context, { ignoreIfReadonly }) {
    if (ignoreIfReadonly && inReadonly(node)) {
        return { context, descriptors: [] };
    }
    return { context, descriptors: [{ node, messageId: "generic" }] };
}
const rule$8 = createRule(name$8, meta$8, defaultOptions$8, {
    TSMethodSignature: checkTSMethodSignature,
});

const name$7 = "no-mixed-type";
const schema$7 = [
    {
        type: "object",
        properties: {
            checkInterfaces: {
                type: "boolean",
            },
            checkTypeLiterals: {
                type: "boolean",
            },
        },
        additionalProperties: false,
    },
];
const defaultOptions$7 = {
    checkInterfaces: true,
    checkTypeLiterals: true,
};
const errorMessages$7 = {
    generic: "Only the same kind of members allowed in types.",
};
const meta$7 = {
    type: "suggestion",
    docs: {
        description: "Restrict types so that only members of the same kind of are allowed in them.",
        recommended: "error",
    },
    messages: errorMessages$7,
    schema: schema$7,
};
function hasTypeElementViolations(typeElements) {
    const typeElementsTypeInfo = typeElements.map((member) => ({
        type: member.type,
        typeAnnotation: isTSPropertySignature(member) && member.typeAnnotation !== undefined
            ? member.typeAnnotation.typeAnnotation.type
            : undefined,
    }));
    return typeElementsTypeInfo.reduce((carry, member) => ({
        prevMemberType: member.type,
        prevMemberTypeAnnotation: member.typeAnnotation,
        violations: carry.prevMemberType !== undefined &&
            (carry.prevMemberType !== member.type ||
                (carry.prevMemberTypeAnnotation !== member.typeAnnotation &&
                    (carry.prevMemberTypeAnnotation === AST_NODE_TYPES.TSFunctionType ||
                        member.typeAnnotation === AST_NODE_TYPES.TSFunctionType))),
    }), {
        prevMemberType: undefined,
        prevMemberTypeAnnotation: undefined,
        violations: false,
    }).violations;
}
function checkTSInterfaceDeclaration(node, context, options) {
    return {
        context,
        descriptors: options.checkInterfaces && hasTypeElementViolations(node.body.body)
            ? [{ node, messageId: "generic" }]
            : [],
    };
}
function checkTSTypeAliasDeclaration(node, context, options) {
    return {
        context,
        descriptors: options.checkTypeLiterals &&
            isTSTypeLiteral(node.typeAnnotation) &&
            hasTypeElementViolations(node.typeAnnotation.members)
            ? [{ node, messageId: "generic" }]
            : [],
    };
}
const rule$7 = createRule(name$7, meta$7, defaultOptions$7, {
    TSInterfaceDeclaration: checkTSInterfaceDeclaration,
    TSTypeAliasDeclaration: checkTSTypeAliasDeclaration,
});

const name$6 = "no-promise-reject";
const schema$6 = [];
const defaultOptions$6 = {};
const errorMessages$6 = {
    generic: "Unexpected reject, return an error instead.",
};
const meta$6 = {
    type: "suggestion",
    docs: {
        description: "Disallow try-catch[-finally] and try-finally patterns.",
        recommended: false,
    },
    messages: errorMessages$6,
    schema: schema$6,
};
function checkCallExpression(node, context) {
    return {
        context,
        descriptors: isMemberExpression(node.callee) &&
            isIdentifier(node.callee.object) &&
            isIdentifier(node.callee.property) &&
            node.callee.object.name === "Promise" &&
            node.callee.property.name === "reject"
            ? [{ node, messageId: "generic" }]
            : [],
    };
}
const rule$6 = createRule(name$6, meta$6, defaultOptions$6, {
    CallExpression: checkCallExpression,
});

const name$5 = "no-return-void";
const schema$5 = [
    {
        type: "object",
        properties: {
            allowNull: {
                type: "boolean",
            },
            allowUndefined: {
                type: "boolean",
            },
            ignoreImplicit: {
                type: "boolean",
            },
        },
        additionalProperties: false,
    },
];
const defaultOptions$5 = {
    allowNull: true,
    allowUndefined: true,
    ignoreImplicit: false,
};
const errorMessages$5 = {
    generic: "Function must return a value.",
};
const meta$5 = {
    type: "suggestion",
    docs: {
        description: "Disallow functions that don't return anything.",
        recommended: "error",
    },
    messages: errorMessages$5,
    schema: schema$5,
};
function checkFunction$1(node, context, options) {
    var _a, _b;
    if (node.returnType === undefined) {
        if (!options.ignoreImplicit && isFunctionLike(node)) {
            const functionType = getTypeOfNode(node, context);
            const returnType = (_b = (_a = functionType === null || functionType === void 0 ? void 0 : functionType.getCallSignatures()) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.getReturnType();
            if (returnType !== undefined &&
                (isVoidType(returnType) ||
                    (!options.allowNull && isNullType(returnType)) ||
                    (!options.allowUndefined && isUndefinedType(returnType)))) {
                return {
                    context,
                    descriptors: [{ node, messageId: "generic" }],
                };
            }
        }
    }
    else if (isTSVoidKeyword(node.returnType.typeAnnotation) ||
        (!options.allowNull && isTSNullKeyword(node.returnType.typeAnnotation)) ||
        (!options.allowUndefined &&
            isTSUndefinedKeyword(node.returnType.typeAnnotation))) {
        return {
            context,
            descriptors: [{ node: node.returnType, messageId: "generic" }],
        };
    }
    return {
        context,
        descriptors: [],
    };
}
const rule$5 = createRule(name$5, meta$5, defaultOptions$5, {
    FunctionDeclaration: checkFunction$1,
    FunctionExpression: checkFunction$1,
    ArrowFunctionExpression: checkFunction$1,
    TSFunctionType: checkFunction$1,
});

const name$4 = "no-this-expression";
const schema$4 = [];
const defaultOptions$4 = {};
const errorMessages$4 = {
    generic: "Unexpected this, use functions not classes.",
};
const meta$4 = {
    type: "suggestion",
    docs: {
        description: "Disallow this access.",
        recommended: "error",
    },
    messages: errorMessages$4,
    schema: schema$4,
};
function checkThisExpression(node, context) {
    return { context, descriptors: [{ node, messageId: "generic" }] };
}
const rule$4 = createRule(name$4, meta$4, defaultOptions$4, {
    ThisExpression: checkThisExpression,
});

const name$3 = "no-throw-statement";
const schema$3 = [
    {
        type: "object",
        properties: {
            allowInAsyncFunctions: {
                type: "boolean",
            },
        },
        additionalProperties: false,
    },
];
const defaultOptions$3 = {
    allowInAsyncFunctions: false,
};
const errorMessages$3 = {
    generic: "Unexpected throw, throwing exceptions is not functional.",
};
const meta$3 = {
    type: "suggestion",
    docs: {
        description: "Disallow throwing exceptions.",
        recommended: "error",
    },
    messages: errorMessages$3,
    schema: schema$3,
};
function checkThrowStatement(node, context, options) {
    if (!options.allowInAsyncFunctions || !inFunctionBody(node, true)) {
        return { context, descriptors: [{ node, messageId: "generic" }] };
    }
    return {
        context,
        descriptors: [],
    };
}
const rule$3 = createRule(name$3, meta$3, defaultOptions$3, {
    ThrowStatement: checkThrowStatement,
});

const name$2 = "no-try-statement";
const schema$2 = [
    {
        type: "object",
        properties: {
            allowCatch: {
                type: "boolean",
            },
            allowFinally: {
                type: "boolean",
            },
        },
        additionalProperties: false,
    },
];
const defaultOptions$2 = {
    allowCatch: false,
    allowFinally: false,
};
const errorMessages$2 = {
    catch: "Unexpected try-catch, this pattern is not functional.",
    finally: "Unexpected try-finally, this pattern is not functional.",
};
const meta$2 = {
    type: "suggestion",
    docs: {
        description: "Disallow try-catch[-finally] and try-finally patterns.",
        recommended: "error",
    },
    messages: errorMessages$2,
    schema: schema$2,
};
function checkTryStatement(node, context, options) {
    return {
        context,
        descriptors: !options.allowCatch && node.handler !== null
            ? [{ node, messageId: "catch" }]
            : !options.allowFinally && node.finalizer !== null
                ? [{ node, messageId: "finally" }]
                : [],
    };
}
const rule$2 = createRule(name$2, meta$2, defaultOptions$2, {
    TryStatement: checkTryStatement,
});

const name$1 = "prefer-readonly-type";
const schema$1 = [
    deepmerge(allowLocalMutationOptionSchema, ignorePatternOptionSchema, ignoreClassOptionSchema, ignoreInterfaceOptionSchema, {
        type: "object",
        properties: {
            allowMutableReturnType: {
                type: "boolean",
            },
            checkImplicit: {
                type: "boolean",
            },
            ignoreCollections: {
                type: "boolean",
            },
        },
        additionalProperties: false,
    }),
];
const defaultOptions$1 = {
    checkImplicit: false,
    ignoreClass: false,
    ignoreInterface: false,
    ignoreCollections: false,
    allowLocalMutation: false,
    allowMutableReturnType: false,
};
const errorMessages$1 = {
    array: "Only readonly arrays allowed.",
    implicit: "Implicitly a mutable array. Only readonly arrays allowed.",
    property: "A readonly modifier is required.",
    tuple: "Only readonly tuples allowed.",
    type: "Only readonly types allowed.",
};
const meta$1 = {
    type: "suggestion",
    docs: {
        description: "Prefer readonly array over mutable arrays.",
        recommended: "error",
    },
    messages: errorMessages$1,
    fixable: "code",
    schema: schema$1,
};
const mutableToImmutableTypes = new Map([
    ["Array", "ReadonlyArray"],
    ["Map", "ReadonlyMap"],
    ["Set", "ReadonlySet"],
]);
const mutableTypeRegex = new RegExp(`^${[...mutableToImmutableTypes.keys()].join("|")}$`, "u");
function checkArrayOrTupleType(node, context, options) {
    if (shouldIgnoreClass(node, context, options) ||
        shouldIgnoreInterface(node, context, options) ||
        shouldIgnoreLocalMutation(node, context, options) ||
        shouldIgnorePattern(node, context, options) ||
        options.ignoreCollections) {
        return {
            context,
            descriptors: [],
        };
    }
    return {
        context,
        descriptors: (node.parent === undefined ||
            !isTSTypeOperator(node.parent) ||
            node.parent.operator !== "readonly") &&
            (!options.allowMutableReturnType || !isInReturnType(node))
            ? [
                {
                    node,
                    messageId: isTSTupleType(node) ? "tuple" : "array",
                    fix: node.parent !== undefined && isTSArrayType(node.parent)
                        ? (fixer) => [
                            fixer.insertTextBefore(node, "(readonly "),
                            fixer.insertTextAfter(node, ")"),
                        ]
                        : (fixer) => fixer.insertTextBefore(node, "readonly "),
                },
            ]
            : [],
    };
}
function checkMappedType(node, context, options) {
    if (shouldIgnoreClass(node, context, options) ||
        shouldIgnoreInterface(node, context, options) ||
        shouldIgnoreLocalMutation(node, context, options) ||
        shouldIgnorePattern(node, context, options)) {
        return {
            context,
            descriptors: [],
        };
    }
    return {
        context,
        descriptors: node.readonly === true || node.readonly === "+"
            ? []
            : [
                {
                    node,
                    messageId: "property",
                    fix: (fixer) => fixer.insertTextBeforeRange([node.range[0] + 1, node.range[1]], " readonly"),
                },
            ],
    };
}
function checkTypeReference(node, context, options) {
    if (shouldIgnoreClass(node, context, options) ||
        shouldIgnoreInterface(node, context, options) ||
        shouldIgnoreLocalMutation(node, context, options) ||
        shouldIgnorePattern(node, context, options)) {
        return {
            context,
            descriptors: [],
        };
    }
    if (isIdentifier(node.typeName)) {
        if (options.ignoreCollections &&
            mutableTypeRegex.test(node.typeName.name)) {
            return {
                context,
                descriptors: [],
            };
        }
        const immutableType = mutableToImmutableTypes.get(node.typeName.name);
        return {
            context,
            descriptors: immutableType !== undefined &&
                immutableType.length > 0 &&
                (!options.allowMutableReturnType || !isInReturnType(node))
                ? [
                    {
                        node,
                        messageId: "type",
                        fix: (fixer) => fixer.replaceText(node.typeName, immutableType),
                    },
                ]
                : [],
        };
    }
    return {
        context,
        descriptors: [],
    };
}
function checkProperty(node, context, options) {
    if (shouldIgnoreClass(node, context, options) ||
        shouldIgnoreInterface(node, context, options) ||
        shouldIgnoreLocalMutation(node, context, options) ||
        shouldIgnorePattern(node, context, options)) {
        return {
            context,
            descriptors: [],
        };
    }
    return {
        context,
        descriptors: node.readonly !== true &&
            (!options.allowMutableReturnType || !isInReturnType(node))
            ? [
                {
                    node,
                    messageId: "property",
                    fix: isTSIndexSignature(node) || isTSPropertySignature(node)
                        ? (fixer) => fixer.insertTextBefore(node, "readonly ")
                        : isTSParameterProperty(node)
                            ? (fixer) => fixer.insertTextBefore(node.parameter, "readonly ")
                            : (fixer) => fixer.insertTextBefore(node.key, "readonly "),
                },
            ]
            : [],
    };
}
function checkImplicitType(node, context, options) {
    if (!options.checkImplicit ||
        shouldIgnoreClass(node, context, options) ||
        shouldIgnoreInterface(node, context, options) ||
        shouldIgnoreLocalMutation(node, context, options) ||
        shouldIgnorePattern(node, context, options)) {
        return {
            context,
            descriptors: [],
        };
    }
    const declarators = isFunctionLike(node)
        ? node.params
            .map((param) => isAssignmentPattern(param)
            ? {
                id: param.left,
                init: param.right,
                node: param,
            }
            : undefined)
            .filter((param) => param !== undefined)
        : node.declarations.map((declaration) => ({
            id: declaration.id,
            init: declaration.init,
            node: declaration,
        }));
    return {
        context,
        descriptors: declarators.flatMap((declarator) => isIdentifier(declarator.id) &&
            declarator.id.typeAnnotation === undefined &&
            declarator.init !== null &&
            isArrayType(getTypeOfNode(declarator.init, context)) &&
            !options.ignoreCollections
            ? [
                {
                    node: declarator.node,
                    messageId: "implicit",
                    fix: (fixer) => fixer.insertTextAfter(declarator.id, ": readonly unknown[]"),
                },
            ]
            : []),
    };
}
const rule$1 = createRule(name$1, meta$1, defaultOptions$1, {
    ArrowFunctionExpression: checkImplicitType,
    PropertyDefinition: checkProperty,
    FunctionDeclaration: checkImplicitType,
    FunctionExpression: checkImplicitType,
    TSArrayType: checkArrayOrTupleType,
    TSIndexSignature: checkProperty,
    TSParameterProperty: checkProperty,
    TSPropertySignature: checkProperty,
    TSTupleType: checkArrayOrTupleType,
    TSMappedType: checkMappedType,
    TSTypeReference: checkTypeReference,
    VariableDeclaration: checkImplicitType,
});

const name = "prefer-tacit";
const schema = [
    deepmerge(ignorePatternOptionSchema, {
        type: "object",
        properties: {
            ignoreImmediateMutation: {
                type: "boolean",
            },
            assumeTypes: {
                oneOf: [
                    {
                        type: "boolean",
                        enum: [false],
                    },
                    {
                        type: "object",
                        properties: {
                            allowFixer: {
                                type: "boolean",
                            },
                        },
                        additionalProperties: false,
                    },
                ],
            },
        },
        additionalProperties: false,
    }),
];
const defaultOptions = {
    assumeTypes: false,
};
const errorMessages = {
    generic: "Potentially unnecessary function wrapper.",
};
const meta = {
    type: "suggestion",
    docs: {
        description: "Replaces `x => f(x)` with just `f`.",
        recommended: false,
    },
    messages: errorMessages,
    fixable: "code",
    schema,
};
function isCallerViolation(caller, calleeType, context) {
    var _a, _b;
    if (calleeType.symbol === undefined) {
        return false;
    }
    const tsDeclaration = (_a = calleeType.symbol.valueDeclaration) !== null && _a !== void 0 ? _a : (_b = calleeType.symbol.declarations) === null || _b === void 0 ? void 0 : _b[0];
    if (tsDeclaration === undefined) {
        return false;
    }
    const declaration = getESTreeNode(tsDeclaration, context);
    return ((isDefined(declaration) &&
        (isFunctionLike(declaration) || isTSFunctionType(declaration)) &&
        declaration.params.length === caller.arguments.length) ||
        (tsDeclaration.parameters !== undefined &&
            tsDeclaration.parameters
                .slice(caller.arguments.length)
                .every((param) => param.initializer !== undefined || param.questionToken !== undefined)));
}
function getCallDescriptors(node, context, options, caller) {
    if (isIdentifier(caller.callee) &&
        node.params.length === caller.arguments.length &&
        node.params.every((param, index) => {
            const callArg = caller.arguments[index];
            return (isIdentifier(callArg) &&
                isIdentifier(param) &&
                callArg.name === param.name);
        })) {
        const calleeType = getTypeOfNode(caller.callee, context);
        const assumingTypes = (calleeType === null || calleeType.symbol === undefined) &&
            options.assumeTypes !== false;
        if (assumingTypes ||
            (calleeType !== null && isCallerViolation(caller, calleeType, context))) {
            const calleeName = caller.callee.name;
            return [
                {
                    node,
                    messageId: "generic",
                    fix: (typeof options.assumeTypes !== "object" && assumingTypes) ||
                        (typeof options.assumeTypes === "object" &&
                            !options.assumeTypes.allowFixer)
                        ? null
                        : (fixer) => fixer.replaceText(node, calleeName),
                },
            ];
        }
        return [];
    }
    return [];
}
function getDirectCallDescriptors(node, context, options) {
    if (isCallExpression(node.body)) {
        return getCallDescriptors(node, context, options, node.body);
    }
    return [];
}
function getNestedCallDescriptors(node, context, options) {
    if (isBlockStatement(node.body) &&
        node.body.body.length === 1 &&
        isReturnStatement(node.body.body[0]) &&
        node.body.body[0].argument !== null &&
        isCallExpression(node.body.body[0].argument)) {
        return getCallDescriptors(node, context, options, node.body.body[0].argument);
    }
    return [];
}
function checkFunction(node, context, options) {
    return {
        context,
        descriptors: [
            ...getDirectCallDescriptors(node, context, options),
            ...getNestedCallDescriptors(node, context, options),
        ],
    };
}
const rule = createRule(name, meta, defaultOptions, {
    FunctionDeclaration: checkFunction,
    FunctionExpression: checkFunction,
    ArrowFunctionExpression: checkFunction,
});

const rules = {
    [name$f]: rule$f,
    [name$e]: rule$e,
    [name$d]: rule$d,
    [name$c]: rule$c,
    [name$b]: rule$b,
    [name$a]: rule$a,
    [name$9]: rule$9,
    [name$8]: rule$8,
    [name$7]: rule$7,
    [name$6]: rule$6,
    [name$5]: rule$5,
    [name$4]: rule$4,
    [name$3]: rule$3,
    [name$2]: rule$2,
    [name$1]: rule$1,
    [name]: rule,
};

const config = {
    rules,
    configs: {
        all,
        recommended: functional,
        "external-recommended": externalRecommended,
        lite: functionalLite,
        off,
        "no-mutations": noMutations,
        "no-exceptions": noExceptions,
        "no-object-orientation": noObjectOrientation,
        "no-statements": noStatements,
        currying,
        stylistic,
    },
};

export { config as default };
