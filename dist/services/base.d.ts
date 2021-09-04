import { VehicleStatus } from 'bluelinky/dist/interfaces/common.interfaces';
import { Vehicle } from 'bluelinky/dist/vehicles/vehicle';
import { Characteristic, Logger, PlatformAccessory, Service } from 'homebridge';
import { HyundaiConfig } from '../config';
import { HyundaiPlatform } from '../platform';
import { VehicleAccessory } from '../platformAccessory';
export declare abstract class HyundaiService {
    protected readonly va: VehicleAccessory;
    protected readonly accessory: PlatformAccessory;
    protected readonly vehicle: Vehicle;
    protected readonly platform: HyundaiPlatform;
    protected readonly Characteristic: typeof Characteristic;
    protected readonly log: Logger;
    protected readonly config: HyundaiConfig;
    constructor(va: VehicleAccessory);
    protected get service(): Service;
    abstract name: string;
    abstract serviceType: string;
    abstract initService(): void;
    abstract setCurrentState(status: VehicleStatus): void;
}
//# sourceMappingURL=base.d.ts.map