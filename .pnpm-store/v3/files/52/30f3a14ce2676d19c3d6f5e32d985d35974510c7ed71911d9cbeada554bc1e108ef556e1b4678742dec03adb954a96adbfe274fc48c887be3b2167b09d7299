"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStreamParser = void 0;
const bole = require("bole");
const ndjson = require("ndjson");
exports.default = createStreamParser();
function createStreamParser() {
    const sp = ndjson.parse();
    bole.output([
        {
            level: 'debug', stream: sp,
        },
    ]);
    return sp;
}
exports.createStreamParser = createStreamParser;
//# sourceMappingURL=streamParser.js.map