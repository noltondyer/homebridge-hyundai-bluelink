"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lock = void 0;
const base_1 = require("./base");
class Lock extends base_1.HyundaiService {
    constructor() {
        super(...arguments);
        this.name = 'Doors';
        this.serviceType = 'LockMechanism';
    }
    initService() {
        var _a, _b;
        const { LockCurrentState, LockTargetState } = this.Characteristic;
        (_a = this.service) === null || _a === void 0 ? void 0 : _a.getCharacteristic(LockCurrentState).on('get', (cb) => cb(null, this.lockCurrentState));
        (_b = this.service) === null || _b === void 0 ? void 0 : _b.getCharacteristic(LockTargetState).on('get', (cb) => cb(null, this.lockTargetState)).on('set', (_value, cb) => {
            if ([undefined, this.isLocked].includes(this.shouldLock)) {
                this.shouldLock = !this.isLocked;
                this.shouldLock ? this.lock(cb) : this.unlock(cb);
            }
            else {
                this.log.debug('isLocked', this.isLocked);
                this.log.debug('shouldLock', this.shouldLock);
            }
        });
    }
    setCurrentState(status) {
        var _a;
        if (status.chassis.locked !== this.isLocked) {
            this.isLocked = status.chassis.locked;
            this.log.info(`Vehicle is ${this.isLocked ? 'Locked' : 'Unlocked'}`);
            (_a = this.service) === null || _a === void 0 ? void 0 : _a.updateCharacteristic(this.Characteristic.LockCurrentState, this.lockCurrentState);
        }
    }
    lock(cb) {
        this.log.info('Locking Vehicle');
        this.vehicle
            .lock()
            .then((response) => this.log.info('Lock Response', response))
            .catch((reason) => this.log.error('Lock Fail', reason))
            .finally(() => cb(null));
    }
    unlock(cb) {
        this.log.info('Unlocking Vehicle');
        this.vehicle
            .unlock()
            .then((response) => this.log.info('Unlock Response', response))
            .catch((reason) => this.log.error('Unlock Fail', reason))
            .finally(() => cb(null));
    }
    get lockCurrentState() {
        const { LockCurrentState } = this.Characteristic;
        if (this.isLocked) {
            return LockCurrentState.SECURED;
        }
        else if (this.isLocked === false) {
            return LockCurrentState.UNSECURED;
        }
        else {
            return LockCurrentState.UNKNOWN;
        }
    }
    get lockTargetState() {
        const { LockTargetState } = this.Characteristic;
        return this.shouldLock
            ? LockTargetState.SECURED
            : LockTargetState.UNSECURED;
    }
    get shouldLock() {
        return this._shouldLock === undefined
            ? !!this.isLocked
            : this._shouldLock;
    }
    set shouldLock(value) {
        this._shouldLock = value;
        // Check on status & reset after 1 minute
        setInterval(() => {
            this.va.fetchStatus();
            this._shouldLock = undefined;
        }, 1000 * 60);
    }
}
exports.Lock = Lock;
//# sourceMappingURL=lock.js.map