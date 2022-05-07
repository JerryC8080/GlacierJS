module.exports = {
    "root": true,
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "@typescript-eslint"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "strict": true
        },
        project: ["./tsconfig.json", "./packages/*/tsconfig.json"], 
        tsconfigRootDir: __dirname, 
    },
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
        "no-restricted-syntax": "off",
        "brace-style": "off",
        "no-empty-function": "off",
        "no-invalid-this": "off",
        "no-magic-numbers": "off",
        "react/sort-comp": "off",
        "func-call-spacing": "off",
        "comma-spacing": "off",
        "dot-notation": "off",
        indent: "off",
        "keyword-spacing": "off",
        camelcase: "off",
        "no-underscore-dangle": "off",
        "no-array-constructor": "off",
        "no-dupe-class-members": "off",
        "no-undef": "off",
        "no-unused-vars": "off",
        "no-useless-constructor": "off",
        quotes: "off",
        semi: "off",
        "space-before-function-paren": "off",
        "spaced-comment": ["error", "always", { markers: ["/"] }]
        ,
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/brace-style": "error",
        "@typescript-eslint/comma-spacing": [
            "error",
            {
                "before": false,
                "after": true
            }
        ],
        "@typescript-eslint/consistent-type-assertions": [
            "error",
            {
                "assertionStyle": "as",
                "objectLiteralTypeAssertions": "never"
            }
        ],
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/dot-notation": "warn",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/func-call-spacing": [
            "error",
            "never"
        ],
        "@typescript-eslint/indent": [
            "warn",
            2,
            {
                "SwitchCase": 1,
                "VariableDeclarator": 1,
                "outerIIFEBody": 1,
                "FunctionDeclaration": {
                    "parameters": 1,
                    "body": 1
                },
                "FunctionExpression": {
                    "parameters": 1,
                    "body": 1
                },
                "CallExpression": {
                    "arguments": 1
                },
                "ArrayExpression": 1,
                "ObjectExpression": 1,
                "ImportDeclaration": 1,
                "flatTernaryExpressions": false,
                "ignoredNodes": [
                    "JSXElement",
                    "JSXElement > *",
                    "JSXAttribute",
                    "JSXIdentifier",
                    "JSXNamespacedName",
                    "JSXMemberExpression",
                    "JSXSpreadAttribute",
                    "JSXExpressionContainer",
                    "JSXOpeningElement",
                    "JSXClosingElement",
                    "JSXFragment",
                    "JSXOpeningFragment",
                    "JSXClosingFragment",
                    "JSXText",
                    "JSXEmptyExpression",
                    "JSXSpreadChild"
                ],
                "ignoreComments": false
            }
        ],
        "@typescript-eslint/keyword-spacing": [
            "error",
            {
                "overrides": {
                    "if": {
                        "after": true
                    },
                    "for": {
                        "after": true
                    },
                    "while": {
                        "after": true
                    },
                    "else": {
                        "after": true
                    }
                },
                "before": true,
                "after": true
            }
        ],
        "@typescript-eslint/member-ordering": [
            "error",
            {
                "default": [
                    "public-static-field",
                    "protected-static-field",
                    "private-static-field",
                    "static-field",
                    "public-static-method",
                    "protected-static-method",
                    "private-static-method",
                    "static-method",
                    "public-instance-field",
                    "protected-instance-field",
                    "private-instance-field",
                    "public-field",
                    "protected-field",
                    "private-field",
                    "instance-field",
                    "field",
                    "constructor",
                    "public-instance-method",
                    "protected-instance-method",
                    "private-instance-method",
                    "public-method",
                    "protected-method",
                    "private-method",
                    "instance-method",
                    "method"
                ]
            }
        ],
        "@typescript-eslint/method-signature-style": "off",
        "@typescript-eslint/naming-convention": [
            "warn",
            {
                "selector": "function",
                "format": [
                    "camelCase",
                    "PascalCase"
                ]
            },
            {
                "selector": "variable",
                "format": [
                    "camelCase",
                    "UPPER_CASE"
                ]
            },
            {
                "selector": "variable",
                "modifiers": [
                    "global"
                ],
                "format": [
                    "camelCase",
                    "PascalCase",
                    "UPPER_CASE"
                ]
            },
            {
                "selector": "variable",
                "format": [
                    "camelCase",
                    "PascalCase"
                ],
                "types": [
                    "function"
                ]
            },
            {
                "selector": "variable",
                "modifiers": [
                    "exported"
                ],
                "format": [
                    "UPPER_CASE"
                ],
                "types": [
                    "boolean",
                    "string",
                    "number",
                    "array"
                ]
            },
            {
                "selector": "variable",
                "modifiers": [
                    "exported"
                ],
                "format": [
                    "camelCase",
                    "PascalCase"
                ],
                "types": [
                    "function"
                ]
            },
            {
                "selector": [
                    "class",
                    "typeLike"
                ],
                "format": [
                    "PascalCase"
                ]
            },
            {
                "selector": [
                    "classMethod",
                    "classProperty"
                ],
                "leadingUnderscore": "forbid",
                "trailingUnderscore": "forbid",
                "format": [
                    "camelCase"
                ]
            }
        ],
        "@typescript-eslint/no-array-constructor": "error",
        "@typescript-eslint/no-dupe-class-members": "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-inferrable-types": "warn",
        "@typescript-eslint/no-misused-promises": [
            "error",
            {
                "checksConditionals": true
            }
        ],
        "@typescript-eslint/no-namespace": [
            "error",
            {
                "allowDeclarations": true,
                "allowDefinitionFiles": true
            }
        ],
        "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-this-alias": [
            "error",
            {
                "allowDestructuring": true
            }
        ],
        "@typescript-eslint/no-unused-expressions": [
            "error",
            {
                "allowShortCircuit": true,
                "allowTernary": true,
                "allowTaggedTemplates": true
            }
        ],
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                "args": "after-used",
                "ignoreRestSiblings": true,
                "argsIgnorePattern": "^_.+",
                "varsIgnorePattern": "^_.+"
            }
        ],
        "@typescript-eslint/no-useless-constructor": "warn",
        "@typescript-eslint/prefer-for-of": "warn",
        "@typescript-eslint/prefer-function-type": "warn",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/prefer-optional-chain": "error",
        "@typescript-eslint/quotes": [
            "warn",
            "single",
            {
                "allowTemplateLiterals": false
            }
        ],
        "@typescript-eslint/semi": [
            "error",
            "always"
        ],
        "@typescript-eslint/space-before-function-paren": [
            "error",
            {
                "anonymous": "always",
                "named": "never",
                "asyncArrow": "always"
            }
        ],
        "@typescript-eslint/triple-slash-reference": [
            "error",
            {
                "path": "never",
                "types": "always",
                "lib": "always"
            }
        ],
        "@typescript-eslint/type-annotation-spacing": "error",
        "@typescript-eslint/typedef": [
            "error",
            {
                "arrayDestructuring": false,
                "arrowParameter": false,
                "memberVariableDeclaration": false,
                "objectDestructuring": false,
                "parameter": false,
                "propertyDeclaration": true,
                "variableDeclaration": false
            }
        ],
        "@typescript-eslint/unified-signatures": "error",
    }
}
