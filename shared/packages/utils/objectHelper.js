import { isObject, isNil } from "lodash";

const typeError = 'Object type error.'

export function isEmpty(object) {
    if (!isObject(object)) {
        console.log(typeError);
    }
    return Object.values(object).length <= 0
}

export function isNullAllValue(object) {
    if (!isObject(object)) {
        console.log(typeError);
    }
    return Object.values(object).every(item => isNil(item) || item === "");
}

export function getByString(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    const a = s.split('.');
    for (let i = 0, n = a.length; i < n; ++i) {
        const k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}
export function isSameKeys(a, b) {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    return JSON.stringify(keysA) === JSON.stringify(keysB)
}


export function deepEquals(a, b, ca = [], cb = []) {
    // Partially extracted from node-deeper and adapted to exclude comparison
    // checks for functions.
    // https://github.com/othiym23/node-deeper
    if (a === b) {
        return true;
    } else if (typeof a === "function" || typeof b === "function") {
        // Assume all functions are equivalent
        // see https://github.com/mozilla-services/react-jsonschema-form/issues/255
        return true;
    } else if (typeof a !== "object" || typeof b !== "object") {
        return false;
    } else if (a === null || b === null) {
        return false;
    } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
    } else if (a instanceof RegExp && b instanceof RegExp) {
        return (
          a.source === b.source &&
          a.global === b.global &&
          a.multiline === b.multiline &&
          a.lastIndex === b.lastIndex &&
          a.ignoreCase === b.ignoreCase
        );
    } else if (isArguments(a) || isArguments(b)) {
        if (!(isArguments(a) && isArguments(b))) {
            return false;
        }
        let slice = Array.prototype.slice;
        return deepEquals(slice.call(a), slice.call(b), ca, cb);
    } else {
        if (a.constructor !== b.constructor) {
            return false;
        }

        let ka = Object.keys(a);
        let kb = Object.keys(b);
        // don't bother with stack acrobatics if there's nothing there
        if (ka.length === 0 && kb.length === 0) {
            return true;
        }
        if (ka.length !== kb.length) {
            return false;
        }

        let cal = ca.length;
        while (cal--) {
            if (ca[cal] === a) {
                return cb[cal] === b;
            }
        }
        ca.push(a);
        cb.push(b);

        ka.sort();
        kb.sort();
        for (let j = ka.length - 1; j >= 0; j--) {
            if (ka[j] !== kb[j]) {
                return false;
            }
        }

        let key;
        for (let k = ka.length - 1; k >= 0; k--) {
            key = ka[k];
            if (!deepEquals(a[key], b[key], ca, cb)) {
                return false;
            }
        }

        ca.pop();
        cb.pop();

        return true;
    }
}
export function getMethods(obj) {
   return Object.getOwnPropertyNames(obj).filter(item => typeof obj[item] === 'function')
}
function isArguments(object) {
    return Object.prototype.toString.call(object) === "[object Arguments]";
}
export function isNotNullAndUndefined(value) {
    return value !== null && value !== undefined
}

