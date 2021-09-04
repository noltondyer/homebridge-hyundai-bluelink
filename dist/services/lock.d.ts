import { HyundaiService } from './base';
import { VehicleStatus } from 'bluelinky/dist/interfaces/common.interfaces';
export declare class Lock extends HyundaiService {
    private _shouldLock?;
    private isLocked?;
    name: string;
    serviceType: string;
    initService(): void;
    setCurrentState(status: VehicleStatus): void;
    lock(cb: any): void;
    unlock(cb: any): void;
    get lockCurrentState(): number;
    get lockTargetState(): number;
    get shouldLock(): boolean;
    set shouldLock(value: boolean);
}
//# sourceMappingURL=lock.d.ts.map