"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var textUtils;
(function (textUtils) {
    textUtils.getCoordinates = (content, position) => {
        const beforeContent = content.slice(0, position);
        const lines = beforeContent.split('\n');
        return { line: lines.length, column: lines[lines.length - 1].length + 1 };
    };
})(textUtils || (textUtils = {}));
exports.default = textUtils;
//# sourceMappingURL=text.js.map