"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var throttle = function (t) {
    return new Promise(function (resolve) {
        setTimeout(resolve, t);
    });
};
exports.throttle = throttle;
// inspired by uuid v4 (shortened) https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
/* tslint:disable:no-bitwise */
var uuid = function () {
    return "xxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
exports.uuid = uuid;
/* tslint:enable:no-bitwise */
var formatDate = function (date, withTime) {
    if (withTime === void 0) { withTime = false; }
    // TODO: Language based formatting of dates
    var lang = "en";
    switch (lang) {
        case "de":
            return dateNull(date.getDate())
                + "." + dateNull((date.getMonth() + 1))
                + "." + dateNull(date.getFullYear())
                + ((withTime) ? " " + dateNull(date.getHours()) + ":" + dateNull(date.getMinutes()) : "");
            break;
        default:
            return dateNull(date.getFullYear())
                + "/" + dateNull((date.getMonth() + 1))
                + "/" + dateNull(date.getDate())
                + ((withTime) ? " " + dateNull(date.getHours()) + ":" + dateNull(date.getMinutes()) : "");
            break;
    }
};
exports.formatDate = formatDate;
var dateNull = function (num) {
    return (num < 10) ? "0" + num : "" + num;
};
var cleanNumber = function (duration) {
    if (duration === Math.floor(duration)) {
        return duration;
    }
    else if (parseFloat(duration.toFixed(1)) === parseFloat(duration.toFixed(2))) {
        return duration.toFixed(1);
    }
    else {
        return duration.toFixed(2);
    }
};
var formatDuration = function (duration) {
    duration = duration / 1000;
    if (duration < 60) {
        return Math.floor(duration) +
            " " + browser.i18n.getMessage("secondsShort");
    }
    else {
        duration = duration / 60;
        if (duration < 60) {
            return cleanNumber(duration) +
                " " + browser.i18n.getMessage("minutesShort");
        }
        else {
            duration = duration / 60;
            if (duration < 24) {
                return cleanNumber(duration) +
                    " " + browser.i18n.getMessage("hoursShort");
            }
            else {
                duration = duration / 24;
                return cleanNumber(duration) +
                    " " + browser.i18n.getMessage("daysShort");
            }
        }
    }
};
exports.formatDuration = formatDuration;
var objEmpty = function (obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
};
exports.objEmpty = objEmpty;
var downloadFile = function (fileData, fileType, fileName) {
    var file = new Blob([fileData], {
        type: fileType,
    });
    return browser.downloads.download({
        // window.URL ??
        filename: fileName,
        saveAs: true,
        url: URL.createObjectURL(file),
    }).then(function (downloadId) {
        return Promise.resolve();
    }).catch(function (error) {
        throw new Error("Download failed. " + JSON.stringify(error));
    });
};
exports.downloadFile = downloadFile;
var debounce = function (func, wait, immediate) {
    if (wait === void 0) { wait = 200; }
    if (immediate === void 0) { immediate = false; }
    var timeout = null;
    var again = false;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var callNow = immediate && timeout === null;
        var next = function () { return func.apply(null, args); };
        if (timeout === null) {
            timeout = setTimeout(function () {
                timeout = null;
                if (again) {
                    next();
                    again = false;
                }
            }, wait);
        }
        else {
            again = true;
        }
        if (callNow) {
            next();
        }
    };
};
exports.debounce = debounce;
//# sourceMappingURL=index.js.map