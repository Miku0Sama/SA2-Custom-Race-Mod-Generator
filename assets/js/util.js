// I really love reinventing the wheel... this function performs the exact same thing as the built-in method Object.create(obj); just with extra steps...
function mergeWithDefaults(defaultObj, inputObj) {
    const result = {};
    for (const key in defaultObj) {

        const defaultVal = defaultObj[key];
        const inputVal = inputObj[key];
        if (typeof defaultVal === "number" && isNaN(inputVal)) {
            result[key] = defaultVal;
            continue;
        }
        if (inputVal !== undefined && inputVal !== null && inputVal !== "") {
            // Both are objects? Recurse
            if (typeof defaultVal !== "object") {
                result[key] = inputVal;
                continue;
            }
            if (Object.keys(defaultVal).length === 0) {
                result[key] = inputVal;
                continue;
            }
            if (Array.isArray(defaultVal)) {
                result[key] = inputVal;
                continue;
            }
            result[key] = mergeWithDefaults(defaultVal, inputVal);
        } else {
            result[key] = defaultVal;
        }
    }
    return result;
};

// No longer used but kept incase a use case arises
function newDefaultObj(defaultObj, overrides = {}) {
    const outputObj = Object.create(defaultObj);
    if (Object.keys(defaultObj).length === 0) return overrides; // If the default is an empty object, return the overrides
    for (const key in defaultObj) {
        if (typeof defaultObj[key] === "object" && !Array.isArray(defaultObj[key])) {
            outputObj[key] = newDefaultObj(defaultObj[key], overrides[key]);
            continue;
        }
        outputObj[key] = defaultObj[key];
        if (overrides[key]) outputObj[key] = overrides[key];
        if (typeof defaultObj[key] === "boolean") outputObj[key] = Boolean(overrides[key]);
    }
    return outputObj;
};

function strID(string = "") {
    return string.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/gi, '');
};