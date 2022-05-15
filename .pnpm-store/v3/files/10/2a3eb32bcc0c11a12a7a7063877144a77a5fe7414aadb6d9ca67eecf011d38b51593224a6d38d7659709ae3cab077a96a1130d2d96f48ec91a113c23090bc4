"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDocumentation = void 0;
const path = require("path");
const ts = require("typescript");
const models_1 = require("../models");
const utils_1 = require("../utils");
function validateDocumentation(project, logger, requiredToBeDocumented) {
    const kinds = requiredToBeDocumented.reduce((prev, cur) => (prev |= models_1.ReflectionKind[cur]), 0);
    for (const ref of project.getReflectionsByKind(kinds)) {
        const symbol = project.getSymbolFromReflection(ref);
        if (!ref.comment && (symbol === null || symbol === void 0 ? void 0 : symbol.declarations)) {
            const decl = symbol.declarations[0];
            const sourceFile = decl.getSourceFile();
            const { line } = ts.getLineAndCharacterOfPosition(sourceFile, decl.getStart());
            const file = (0, utils_1.normalizePath)(path.relative(process.cwd(), sourceFile.fileName));
            if (file.includes("node_modules")) {
                continue;
            }
            const loc = `${file}:${line + 1}`;
            logger.warn(`${ref.name}, defined at ${loc}, does not have any documentation.`);
        }
    }
}
exports.validateDocumentation = validateDocumentation;
