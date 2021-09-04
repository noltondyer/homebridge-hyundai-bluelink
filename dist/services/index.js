"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lock_1 = require("./lock");
const range_1 = require("./range");
const ignition_1 = require("./ignition");
function default_1(va) {
    const services = [new lock_1.Lock(va), new range_1.Range(va), new ignition_1.Ignition(va)];
    services.forEach((s) => s.initService());
}
exports.default = default_1;
//# sourceMappingURL=index.js.map