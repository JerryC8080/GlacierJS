"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchWrap = exports.wrapError = exports.rethrow = exports.addReflectionKind = void 0;
const lodash_1 = require("lodash");
const typedoc_1 = require("typedoc");
const addReflectionKind = (ns, name, value) => {
    const fullname = `${ns}:${name}`;
    value = value !== null && value !== void 0 ? value : (Math.max(...Object.values(Object.assign(Object.assign({}, typedoc_1.ReflectionKind), { All: -1 })).filter(lodash_1.isNumber)) * 2);
    const kindAny = typedoc_1.ReflectionKind;
    kindAny[fullname] = value;
    kindAny[value] = fullname;
    return value;
};
exports.addReflectionKind = addReflectionKind;
const rethrow = (block, newErrorFactory) => {
    try {
        return block();
    }
    catch (err) {
        const newErr = newErrorFactory(err);
        if ((0, lodash_1.isString)(newErr)) {
            throw new Error(newErr);
        }
        else {
            throw newErr;
        }
    }
};
exports.rethrow = rethrow;
const wrapError = (message, err, propagateStack = true) => {
    const newErr = new Error(`${message}:\n${(err === null || err === void 0 ? void 0 : err.message) || err}`);
    if (propagateStack) {
        if (err.stack) {
            newErr.stack = `${message}\n${err.stack}`;
        }
    }
    return newErr;
};
exports.wrapError = wrapError;
const catchWrap = (block, contextMessage) => (0, exports.rethrow)(block, err => (0, lodash_1.isFunction)(contextMessage) ? contextMessage(err) : (0, exports.wrapError)(contextMessage, err));
exports.catchWrap = catchWrap;
//# sourceMappingURL=misc.js.map