/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2016. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
'use strict';

var ARGS_REGEX = /\{([0-9]+)\}/g,
    ARG_REGEX = /\{0\}/g;

module.exports = function(bundlePath) {
    return {
        'get': function(key, args) {
            var bundle = window.nls[bundlePath];
            if (bundle) {
                var msg = bundle[key];
                if (msg) {
                    if (args) {
                        msg = resolveArgs(msg, args);
                    }
                    return msg;
                }
            }
            return "!" + key + "!";
        }
    };
}

function resolveArgs(msg, args) {
    if (!Array.isArray(args)) {
        return msg.replace(ARG_REGEX, args);
    } else {
        var argsLen = args.length;
        return msg.replace(ARGS_REGEX, function (p1, p2) {
            var i = parseInt(p2, 10);
            if (i < argsLen) {
                var toReplace = args[i];
                if (toReplace === null || toReplace === undefined) {
                    toReplace = '';
                }
                return toReplace;
            } else {
                return p1;
            }
        });
    }
}