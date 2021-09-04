"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyundaiService = void 0;
class HyundaiService {
    constructor(va) {
        this.va = va;
        this.accessory = this.va.accessory;
        this.vehicle = this.va.vehicle;
        this.platform = this.va.platform;
        this.Characteristic = this.platform
            .Characteristic;
        this.log = this.platform.log;
        this.config = (this.platform.config);
        this.va.on('update', this.setCurrentState.bind(this));
    }
    get service() {
        return (this.accessory.getService(this.name) ||
            this.accessory.addService(this.platform.Service[this.serviceType], this.name, this.name));
    }
}
exports.HyundaiService = HyundaiService;
//# sourceMappingURL=base.js.map