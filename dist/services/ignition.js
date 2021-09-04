"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ignition = void 0;
const base_1 = require("./base");
class Ignition extends base_1.HyundaiService {
    constructor() {
        super(...arguments);
        this.name = 'Ignition';
        this.serviceType = 'Switch';
    }
    initService() {
        var _a;
        const { On } = this.Characteristic;
        (_a = this.service) === null || _a === void 0 ? void 0 : _a.getCharacteristic(On).on('get', (cb) => { var _a; return cb(null, (_a = this.isOn) !== null && _a !== void 0 ? _a : false); }).on('set', (_value, cb) => {
            if (this.shouldTurnOn === undefined) {
                this.shouldTurnOn = !this.isOn;
                this.shouldTurnOn ? this.start(cb) : this.stop(cb);
            }
            else {
                this.log.debug('isOn', this.isOn);
                this.log.debug('shouldTurnOn', this.shouldTurnOn);
            }
        });
    }
    start(cb) {
        this.log.info('Starting Vehicle');
        this.vehicle
            .start(this.config.remoteStart)
            .then((response) => this.log.info('Start Response', response))
            .catch((reason) => this.log.error('Start Fail', reason))
            .finally(() => cb(null));
    }
    stop(cb) {
        this.log.info('Stopping Vehicle');
        this.vehicle
            .stop()
            .then((response) => this.log.info('Stop Response', response))
            .catch((reason) => this.log.error('Stop Fail', reason))
            .finally(() => cb(null));
    }
    setCurrentState(status) {
        var _a;
        if (status.engine.ignition !== this.isOn) {
            this.isOn = status.engine.ignition;
            this.log.info(`Vehicle is ${this.isOn ? 'On' : 'Off'}`);
            (_a = this.service) === null || _a === void 0 ? void 0 : _a.updateCharacteristic(this.Characteristic.On, this.isOn);
        }
    }
    get shouldTurnOn() {
        return this._shouldTurnOn;
    }
    set shouldTurnOn(value) {
        this._shouldTurnOn = value;
        // Check on status & reset after 1 minute
        setTimeout(() => {
            this.va.fetchStatus();
            this._shouldTurnOn = undefined;
        }, 1000 * 60);
    }
}
exports.Ignition = Ignition;
//# sourceMappingURL=ignition.js.map