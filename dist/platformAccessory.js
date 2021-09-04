"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleAccessory = void 0;
const events_1 = require("events");
const services_1 = __importDefault(require("./services"));
const REFRESH_INTERVAL = 1000 * 60 * 60; // once per hour, per https://github.com/Hacksore/bluelinky/wiki/API-Rate-Limits
class VehicleAccessory extends events_1.EventEmitter {
    constructor(platform, accessory, vehicle) {
        super();
        this.platform = platform;
        this.accessory = accessory;
        this.vehicle = vehicle;
        this.isFetching = false;
        this.setInformation();
        services_1.default(this);
        this.fetchStatus();
        setInterval(this.fetchStatus.bind(this), REFRESH_INTERVAL);
    }
    fetchStatus() {
        if (!this.isFetching) {
            this.isFetching = true;
            this.vehicle
                .status({ refresh: false, parsed: true })
                .then((response) => {
                this.platform.log.debug('Received status update', response);
                this.emit('update', response);
                this.isFetching = false;
            })
                .catch((error) => {
                this.platform.log.error('Status fetch error', error);
            });
        }
    }
    setInformation() {
        var _a, _b;
        (_b = (_a = this.accessory) === null || _a === void 0 ? void 0 : _a.getService(this.platform.Service.AccessoryInformation)) === null || _b === void 0 ? void 0 : _b.setCharacteristic(this.platform.Characteristic.Manufacturer, 'Hyundai').setCharacteristic(this.platform.Characteristic.Model, this.accessory.context.device.name).setCharacteristic(this.platform.Characteristic.SerialNumber, this.accessory.context.device.vin);
    }
}
exports.VehicleAccessory = VehicleAccessory;
//# sourceMappingURL=platformAccessory.js.map