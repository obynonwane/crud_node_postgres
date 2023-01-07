"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var mythical_weapon_1 = __importDefault(require("./controllers/mythical_weapon"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
var corsOptions = {
    origin: "http://localhost:3000.com",
    optionSuccessStatus: 200
};
app.use((0, cors_1["default"])(corsOptions));
app.use(body_parser_1["default"].json());
(0, mythical_weapon_1["default"])(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
