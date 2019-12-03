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
var fetching = require('node-fetch');
var Weather = /** @class */ (function () {
    function Weather(options) {
        // Weather Data Properties
        this.cloudiness = undefined;
        this.sun = undefined;
        this.location = undefined;
        this.temp = undefined;
        this.air = undefined;
        this.type = undefined;
        this.wind = undefined;
        this.err = undefined;
        // If options were passed in,
        if (!options) {
            return;
        }
        // Then assign values from options arguments to `this`
        var zip = options.zip, apiKey = options.apiKey, _a = options.units, units = _a === void 0 ? 'imperial' : _a;
        this.zip = zip;
        this.apiKey = apiKey;
        this.units = units;
        // Call `this.getData()` to populate Weather Data Properties
        this.getData();
    }
    Object.defineProperty(Weather.prototype, "path", {
        get: function () {
            // Return property `this.path` including options arguments added after object instantiation
            var _a = this, zip = _a.zip, apiKey = _a.apiKey, units = _a.units;
            if (zip && apiKey && units) {
                return "https://api.openweathermap.org/data/2.5/weather?zip=" + this.zip + "&appid=" + this.apiKey + "&units=" + this.units;
            }
        },
        enumerable: true,
        configurable: true
    });
    Weather.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetching(this.path)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        this.handleData(data);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.err = err_1;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Weather.prototype.handleData = function (data) {
        var cloudData = data.clouds, main = data.main, city = data.name, sys = data.sys, timezone = data.timezone, weather = data.weather, wind = data.wind;
        var humidity = main.humidity, pressure = main.pressure, current = main.temp, max = main.temp_max, min = main.temp_min;
        var country = sys.country, sunrise = sys.sunrise, sunset = sys.sunset;
        var _a = weather[0], detailedDescription = _a.description, description = _a.main;
        var deg = wind.deg, speed = wind.speed;
        this.air = {
            humidity: humidity,
            pressure: pressure,
        };
        this.type = {
            description: description,
            detailedDescription: detailedDescription,
        };
        this.wind = {
            direction: this.degToDirection(deg),
            speed: Number(speed.toFixed(0)),
        };
        this.cloudiness = cloudData.all;
        this.location = {
            city: city,
            country: country,
            timezone: timezone,
        };
        this.temp = {
            current: current,
            min: min,
            max: max,
        };
        this.sun = {
            rise: this.timestampToString(sunrise),
            set: this.timestampToString(sunset),
        };
    };
    // eslint-disable-next-line class-methods-use-this
    Weather.prototype.degToDirection = function (deg) {
        if (deg > 337.5)
            return 'N';
        if (deg > 292.5)
            return 'NW';
        if (deg > 247.5)
            return 'W';
        if (deg > 202.5)
            return 'SW';
        if (deg > 157.5)
            return 'S';
        if (deg > 122.5)
            return 'SE';
        if (deg > 67.5)
            return 'E';
        if (deg > 22.5)
            return 'NE';
        return 'N';
    };
    // eslint-disable-next-line class-methods-use-this
    Weather.prototype.timestampToString = function (unixTimestamp) {
        var date = new Date(unixTimestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0 " + date.getSeconds();
        var formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
        return formattedTime;
    };
    return Weather;
}());
module.exports = Weather;
