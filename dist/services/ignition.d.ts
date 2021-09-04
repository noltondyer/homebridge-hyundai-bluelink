import { HyundaiService } from './base';
import { VehicleStatus } from 'bluelinky/dist/interfaces/common.interfaces';
export declare class Ignition extends HyundaiService {
    private isOn?;
    private _shouldTurnOn?;
    name: string;
    serviceType: string;
    initService(): void;
    start(cb: any): void;
    stop(cb: any): void;
    setCurrentState(status: VehicleStatus): void;
    get shouldTurnOn(): boolean | undefined;
    set shouldTurnOn(value: boolean | undefined);
}
//# sourceMappingURL=ignition.d.ts.map