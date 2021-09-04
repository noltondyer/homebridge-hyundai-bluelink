"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Range = void 0;
const base_1 = require("./base");
class Range extends base_1.HyundaiService {
    constructor() {
        super(...arguments);
        this.name = 'Range';
        this.serviceType = 'BatteryService';
        this.lowBatteryThreshold = 25;
    }
    initService() {
        var _a, _b, _c;
        this.maxRange = this.accessory.context.device.maxRange;
        const { BatteryLevel, ChargingState, StatusLowBattery, } = this.Characteristic;
        (_a = this.service) === null || _a === void 0 ? void 0 : _a.getCharacteristic(BatteryLevel).on('get', (cb) => cb(null, this.rangePct));
        (_b = this.service) === null || _b === void 0 ? void 0 : _b.getCharacteristic(ChargingState).on('get', (cb) => cb(null, ChargingState.NOT_CHARGEABLE));
        (_c = this.service) === null || _c === void 0 ? void 0 : _c.getCharacteristic(StatusLowBattery).on('get', (cb) => cb(null, this.statusLowBattery));
    }
    setCurrentState(status) {
        var _a;
        if (status.engine.range !== this.currentRange) {
            this.currentRange = status.engine.range;
            this.log.info(`new range ${this.currentRange}`);
        }
        if (!this.maxRange || this.currentRange > this.maxRange) {
            this.maxRange = this.currentRange;
            this.log.info(`maxRange is ${this.maxRange}`);
        }
        (_a = this.service) === null || _a === void 0 ? void 0 : _a.updateCharacteristic(this.Characteristic.StatusLowBattery, this.statusLowBattery);
    }
    get rangePct() {
        if (!this.maxRange) {
            return 100;
        }
        else if (!this.currentRange) {
            return 0;
        }
        else {
            return (this.currentRange / this.maxRange) * 100;
        }
    }
    get statusLowBattery() {
        const { StatusLowBattery } = this.Characteristic;
        if (this.rangePct < this.lowBatteryThreshold) {
            return StatusLowBattery.BATTERY_LEVEL_LOW;
        }
        else {
            return StatusLowBattery.BATTERY_LEVEL_NORMAL;
        }
    }
}
exports.Range = Range;
//# sourceMappingURL=range.js.map