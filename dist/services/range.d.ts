import { HyundaiService } from './base';
import { VehicleStatus } from 'bluelinky/dist/interfaces/common.interfaces';
export declare class Range extends HyundaiService {
    private maxRange?;
    private currentRange?;
    name: string;
    serviceType: string;
    lowBatteryThreshold: number;
    initService(): void;
    setCurrentState(status: VehicleStatus): void;
    get rangePct(): number;
    get statusLowBattery(): number;
}
//# sourceMappingURL=range.d.ts.map