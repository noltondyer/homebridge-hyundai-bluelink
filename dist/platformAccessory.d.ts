/// <reference types="node" />
import { Vehicle } from 'bluelinky/dist/vehicles/vehicle';
import { EventEmitter } from 'events';
import { PlatformAccessory } from 'homebridge';
import { HyundaiPlatform } from './platform';
export declare class VehicleAccessory extends EventEmitter {
    readonly platform: HyundaiPlatform;
    readonly accessory: PlatformAccessory;
    readonly vehicle: Vehicle;
    private isFetching;
    constructor(platform: HyundaiPlatform, accessory: PlatformAccessory, vehicle: Vehicle);
    fetchStatus(): void;
    setInformation(): void;
}
//# sourceMappingURL=platformAccessory.d.ts.map