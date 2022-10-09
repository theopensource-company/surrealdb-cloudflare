"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Surreal = void 0;
var ConnectionError = /** @class */ (function (_super) {
    __extends(ConnectionError, _super);
    function ConnectionError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ConnectionError;
}(Error));
;
var createAuthorization = function (username, password) {
    try {
        return "Basic ".concat(btoa("".concat(username, ":").concat(password)));
    }
    catch (err) {
        return "Basic ".concat(Buffer.from("".concat(username, ":").concat(password)).toString('base64'));
    }
};
var Surreal = /** @class */ (function () {
    function Surreal(config, fetcher) {
        if (config)
            this.connect(config);
        if (fetcher)
            this.fetcher = fetcher;
    }
    // Define connection variables
    Surreal.prototype.connect = function (config) {
        this.host = config.host;
        this.username = config.username;
        this.password = config.password;
        this.namespace = config.namespace;
        this.database = config.database;
    };
    Surreal.prototype.connected = function () {
        return !!(this.host && this.username && this.password && this.namespace && this.database);
    };
    // General query function
    Surreal.prototype.query = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('sql', {
                            plainBody: true,
                            body: query
                        })];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    // Table functions affecting all records
    Surreal.prototype.getRecords = function (table) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("key/".concat(table), {
                            method: "GET"
                        })];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Surreal.prototype.createRecord = function (table, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("key/".concat(table), {
                            method: "POST",
                            body: data
                        })];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Surreal.prototype.deleteRecords = function (table) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("key/".concat(table), {
                            method: "DELETE"
                        })];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    // Table functions affecting specific records
    Surreal.prototype.getRecordWithId = function (table, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("key/".concat(table, "/").concat(id), {
                            method: "GET"
                        })];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Surreal.prototype.createRecordWithId = function (table, id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("key/".concat(table, "/").concat(id), {
                            method: "POST",
                            body: data
                        })];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Surreal.prototype.setRecordWithId = function (table, id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("key/".concat(table, "/").concat(id), {
                            method: "PUT",
                            body: data
                        })];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Surreal.prototype.updateRecordWithId = function (table, id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("key/".concat(table, "/").concat(id), {
                            method: "PATCH",
                            body: data
                        })];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    Surreal.prototype.deleteRecordWithId = function (table, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("key/".concat(table, "/").concat(id), {
                            method: "DELETE"
                        })];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    // Request function interfacing with surreal HTTP api
    Surreal.prototype.request = function (path, options) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!this.connected())
                            throw new ConnectionError("The Surreal instance has not yet been connected");
                        return [4 /*yield*/, (this.fetcher ? this.fetcher : fetch)("".concat((_a = options === null || options === void 0 ? void 0 : options.host) !== null && _a !== void 0 ? _a : this.host, "/").concat(path.startsWith('/') ? path.slice(1) : path), {
                                method: (_b = options === null || options === void 0 ? void 0 : options.method) !== null && _b !== void 0 ? _b : "POST",
                                headers: {
                                    'Authorization': createAuthorization((_c = options === null || options === void 0 ? void 0 : options.username) !== null && _c !== void 0 ? _c : this.username, (_d = options === null || options === void 0 ? void 0 : options.username) !== null && _d !== void 0 ? _d : this.password),
                                    'Content-Type': (options === null || options === void 0 ? void 0 : options.plainBody) ? 'text/plain' : 'application/json',
                                    'Accept': 'application/json',
                                    'NS': (_e = options === null || options === void 0 ? void 0 : options.namespace) !== null && _e !== void 0 ? _e : this.namespace,
                                    'DB': (_f = options === null || options === void 0 ? void 0 : options.database) !== null && _f !== void 0 ? _f : this.database
                                },
                                body: typeof (options === null || options === void 0 ? void 0 : options.body) == 'string' ? options === null || options === void 0 ? void 0 : options.body : JSON.stringify(options === null || options === void 0 ? void 0 : options.body)
                            })];
                    case 1: return [2 /*return*/, (_g.sent()).json()];
                }
            });
        });
    };
    return Surreal;
}());
exports.Surreal = Surreal;
exports["default"] = Surreal;
